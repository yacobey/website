import https from 'https';
import dns from 'dns';
import net from 'net';

function isPrivateOrRestrictedIP(ip: string): boolean {
  // Unwrap IPv4-mapped IPv6 addresses (e.g. ::ffff:127.0.0.1 -> 127.0.0.1)
  const ipv4MappedMatch = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (ipv4MappedMatch) {
    return isPrivateOrRestrictedIP(ipv4MappedMatch[1]);
  }

  if (net.isIPv4(ip)) {
    const parts = ip.split('.').map(Number);
    const [a, b] = parts;
    // Loopback: 127.0.0.0/8
    if (a === 127) return true;
    // RFC1918 private: 10.0.0.0/8
    if (a === 10) return true;
    // RFC1918 private: 172.16.0.0/12
    if (a === 172 && b >= 16 && b <= 31) return true;
    // RFC1918 private: 192.168.0.0/16
    if (a === 192 && b === 168) return true;
    // Link-local: 169.254.0.0/16
    if (a === 169 && b === 254) return true;
    // CGNAT: 100.64.0.0/10
    if (a === 100 && b >= 64 && b <= 127) return true;
    // Unspecified / broadcast
    if (ip === '0.0.0.0' || ip === '255.255.255.255') return true;
  } else if (net.isIPv6(ip)) {
    const normalized = ip.toLowerCase();
    // Loopback: ::1
    if (normalized === '::1') return true;
    // Link-local: fe80::/10
    if (normalized.startsWith('fe80')) return true;
    // Unique local: fc00::/7
    if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true;
    // Unspecified: ::
    if (normalized === '::') return true;
  }
  return false;
}

interface SSLCertificateInfo {
  valid: boolean;
  commonName: string;
  subjectAltNames: string[];
  issuer: string;
  validFrom: Date;
  validTo: Date;
  daysUntilExpiry: number;
  errors: string[];
}

export class SSLValidator {
  static async validateCertificate(hostname: string): Promise<SSLCertificateInfo> {
    // Reject bare IP addresses supplied directly
    if (net.isIP(hostname)) {
      if (isPrivateOrRestrictedIP(hostname)) {
        throw new Error('Destination address is not permitted');
      }
    }

    return new Promise((resolve, reject) => {
      const options: https.RequestOptions = {
        hostname,
        port: 443,
        method: 'HEAD',
        timeout: 10000,
        rejectUnauthorized: true,
        // Custom lookup runs for every DNS resolution on this connection,
        // eliminating the DNS-rebinding TOCTOU window.
        lookup: (host: string, lookupOptions: dns.LookupOptions, callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void) => {
          dns.lookup(host, lookupOptions, (err, address, family) => {
            if (err) return callback(err, address, family);
            if (isPrivateOrRestrictedIP(address)) {
              const blockErr = Object.assign(new Error('Destination resolves to a private or restricted address'), { code: 'EBLOCKED' }) as NodeJS.ErrnoException;
              return callback(blockErr, address, family);
            }
            callback(null, address, family);
          });
        }
      };

      const req = https.request(options, (res) => {
        const cert = (res.socket as any).getPeerCertificate();
        const errors: string[] = [];

        if (!cert || Object.keys(cert).length === 0) {
          errors.push('No certificate found');
          return resolve({
            valid: false,
            commonName: '',
            subjectAltNames: [],
            issuer: '',
            validFrom: new Date(),
            validTo: new Date(),
            daysUntilExpiry: 0,
            errors
          });
        }

        const subjectAltNames = cert.subjectaltname
          ? cert.subjectaltname.split(', ').map((san: string) => san.replace('DNS:', ''))
          : [];

        const commonName = cert.subject?.CN || '';
        const validForHostname = subjectAltNames.includes(hostname) || commonName === hostname;

        if (!validForHostname) {
          errors.push(`Certificate not valid for ${hostname}. Valid for: ${subjectAltNames.join(', ')}`);
        }

        const validTo = new Date(cert.valid_to);
        const now = new Date();
        const daysUntilExpiry = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntilExpiry < 0) {
          errors.push('Certificate has expired');
        } else if (daysUntilExpiry < 30) {
          errors.push(`Certificate expires in ${daysUntilExpiry} days`);
        }

        resolve({
          valid: errors.length === 0,
          commonName,
          subjectAltNames,
          issuer: cert.issuer?.CN || '',
          validFrom: new Date(cert.valid_from),
          validTo,
          daysUntilExpiry,
          errors
        });
      });

      req.on('error', (error: any) => {
        if (error.code === 'EBLOCKED') {
          return reject(new Error('Destination address is not permitted'));
        }
        resolve({
          valid: false,
          commonName: '',
          subjectAltNames: [],
          issuer: '',
          validFrom: new Date(),
          validTo: new Date(),
          daysUntilExpiry: 0,
          errors: ['Connection error']
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          valid: false,
          commonName: '',
          subjectAltNames: [],
          issuer: '',
          validFrom: new Date(),
          validTo: new Date(),
          daysUntilExpiry: 0,
          errors: ['Connection timeout']
        });
      });

      req.end();
    });
  }

  static async checkDomainSSL(domain: string): Promise<{ status: string; details: SSLCertificateInfo }> {
    const certInfo = await this.validateCertificate(domain);

    let status = 'error';
    if (certInfo.valid) {
      status = 'valid';
    } else if (certInfo.errors.some(err => err.includes('not valid for'))) {
      status = 'mismatch';
    } else if (certInfo.errors.some(err => err.includes('expired'))) {
      status = 'expired';
    }

    return { status, details: certInfo };
  }
}
