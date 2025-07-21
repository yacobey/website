import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export function SSLStatusChecker() {
  const [sslStatus, setSSLStatus] = useState<'checking' | 'secure' | 'insecure'>('checking');
  const [certificateInfo, setCertificateInfo] = useState<string>('');

  useEffect(() => {
    const checkSSL = () => {
      const isHTTPS = window.location.protocol === 'https:';
      const isCustomDomain = window.location.hostname === 'selamcpa.com';
      
      if (isHTTPS && isCustomDomain) {
        setSSLStatus('secure');
        setCertificateInfo('SSL certificate active for selamcpa.com');
      } else if (isHTTPS) {
        setSSLStatus('secure');
        setCertificateInfo('SSL active on temporary domain');
      } else {
        setSSLStatus('insecure');
        setCertificateInfo('SSL not active - HTTP connection');
      }
    };

    checkSSL();
    
    // Check SSL status every 30 seconds
    const interval = setInterval(checkSSL, 30000);
    return () => clearInterval(interval);
  }, []);

  if (sslStatus === 'checking') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`
        flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-sm font-medium
        ${sslStatus === 'secure' 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
        }
      `}>
        {sslStatus === 'secure' ? (
          <>
            <Shield className="w-4 h-4" />
            <span>SSL Secure</span>
          </>
        ) : (
          <>
            <AlertTriangle className="w-4 h-4" />
            <span>SSL Pending</span>
          </>
        )}
      </div>
    </div>
  );
}