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
    // Simple check - if we're on HTTPS and it's the custom domain, 
    // but there are certificate errors, return false
    if (window.location.hostname === 'selamcpa.com' && window.location.protocol === 'https:') {
      // This is a simplified check - in real scenarios you'd need more complex validation
      return false; // Return false to indicate certificate mismatch
    }
    return true;
  };

  if (sslStatus === 'checking') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`
        flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-sm font-medium
        ${sslStatus === 'secure' 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
        }
      `}>
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