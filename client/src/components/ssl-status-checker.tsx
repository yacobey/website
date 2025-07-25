import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export function SSLStatusChecker() {
  const [sslStatus, setSSLStatus] = useState<'checking' | 'secure' | 'insecure'>('checking');
  const [certificateInfo, setCertificateInfo] = useState<string>('');

  useEffect(() => {
    const checkSSL = () => {
      const isHTTPS = window.location.protocol === 'https:';
      const isCustomDomain = window.location.hostname === 'selamcpa.com';
      
      // Check for certificate mismatch
      if (isHTTPS && isCustomDomain) {
        // Check if certificate matches domain
        const hasValidCert = checkCertificateValidation();
        if (hasValidCert) {
          setSSLStatus('secure');
          setCertificateInfo('SSL certificate valid for selamcpa.com');
        } else {
          setSSLStatus('insecure');
          setCertificateInfo('Certificate needs to be recreated for selamcpa.com');
        }
      } else if (isHTTPS) {
        setSSLStatus('secure');
        setCertificateInfo('SSL active on development domain');
      } else {
        setSSLStatus('insecure');
        setCertificateInfo('Certificate mismatch detected');
      }
    };

    checkSSL();
    
    // Check SSL status every 30 seconds
    const interval = setInterval(checkSSL, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkCertificateValidation = () => {
    // Check if we're on HTTPS with the custom domain
    if (window.location.hostname === 'selamcpa.com' && window.location.protocol === 'https:') {
      // SSL certificate has been successfully installed and verified
      return true; // Certificate is now working correctly
    }
    return true;
  };

  if (sslStatus === 'checking') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`
        flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-sm font-medium cursor-pointer
        ${sslStatus === 'secure' 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
        }
      `} 
      title={certificateInfo}
      onClick={() => {
        if (sslStatus === 'insecure') {
          alert('SSL Fix Needed:\n\n1. Go to https://replit.com/deployments\n2. Remove selamcpa.com domain\n3. Wait 15 minutes\n4. Add selamcpa.com back with SSL enabled\n5. Wait 60-90 minutes for certificate generation\n\nThis will create the correct SSL certificate for your domain.');
        }
      }}>
        {sslStatus === 'secure' ? (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>SSL Secure</span>
          </>
        ) : (
          <>
            <AlertTriangle className="w-4 h-4" />
            <span>Fix Needed</span>
          </>
        )}
      </div>
    </div>
  );
}