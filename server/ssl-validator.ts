import https from 'https';

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
    return new Promise((resolve) => {
      const options = {
        hostname,
        port: 443,
        method: 'GET',
        timeout: 10000,
        rejectUnauthorized: false // Allow checking invalid certs
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

        // Check if certificate is valid for the requested hostname
        const subjectAltNames = cert.subjectaltname ? 
          cert.subjectaltname.split(', ').map((san: string) => san.replace('DNS:', '')) : [];
        
        const commonName = cert.subject?.CN || '';
        const validForHostname = subjectAltNames.includes(hostname) || commonName === hostname;
        
        if (!validForHostname) {
          errors.push(`Certificate not valid for ${hostname}. Valid for: ${subjectAltNames.join(', ')}`);
        }

        // Check expiry
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

      req.on('error', (error) => {
        resolve({
          valid: false,
          commonName: '',
          subjectAltNames: [],
          issuer: '',
          validFrom: new Date(),
          validTo: new Date(),
          daysUntilExpiry: 0,
          errors: [`Connection error: ${error.message}`]
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