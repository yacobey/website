import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { 
  Globe, 
  CheckCircle, 
  Clock,
  ExternalLink,
  Shield,
  Zap
} from 'lucide-react';

export default function DomainSetup() {
  const currentDomain = window.location.origin;
  const isCustomDomain = !currentDomain.includes('.replit.app');

  const setupSteps = [
    {
      step: 1,
      title: "Get Replit Permissions",
      description: "Upgrade to Replit Core ($25/month) or Teams plan for custom domain access",
      status: "required",
      action: "Upgrade your Replit plan for domain permissions"
    },
    {
      step: 2,
      title: "Purchase Domain",
      description: "Buy selamcpa.com from a registrar like GoDaddy or Namecheap",
      status: "pending",
      action: "Purchase selamcpa.com domain"
    },
    {
      step: 3,
      title: "Configure DNS",
      description: "Add A and CNAME records pointing to your Replit project",
      status: "pending",
      action: "Set up DNS records in domain registrar"
    },
    {
      step: 4,
      title: "Connect in Replit",
      description: "Add custom domain in your Replit project settings",
      status: "pending",
      action: "Connect domain in Replit dashboard"
    },
    {
      step: 5,
      title: "Set Environment Variable",
      description: "Add CUSTOM_DOMAIN=selamcpa.com to Replit secrets",
      status: "pending",
      action: "Add environment variable"
    }
  ];

  const benefits = [
    {
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      title: "Professional Appearance",
      description: "selamcpa.com looks much more professional than a Replit subdomain"
    },
    {
      icon: <Zap className="w-5 h-5 text-green-500" />,
      title: "Better SEO",
      description: "Custom domains rank higher in search results and build trust"
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-500" />,
      title: "SSL Certificate",
      description: "Automatic HTTPS with secure certificate provided by Replit"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-16">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Custom Domain Setup
                </h1>
                <p className="text-xl text-gray-600">
                  Connect selamcpa.com to your website
                </p>
              </div>

              {/* Current Status */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Current Domain Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-lg">{currentDomain}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {isCustomDomain ? "Custom domain connected!" : "Replit development domain"}
                        </p>
                      </div>
                      <Badge variant={isCustomDomain ? 'default' : 'secondary'}>
                        {isCustomDomain ? 'Custom Domain' : 'Development'}
                      </Badge>
                    </div>
                    
                    {isCustomDomain ? (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Great! Your custom domain is already connected. Your SEO files automatically use selamcpa.com.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert>
                        <Clock className="h-4 w-4" />
                        <AlertDescription>
                          You're currently using a Replit domain. Follow the steps below to connect selamcpa.com for better SEO and professional appearance.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Setup Steps */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Domain Connection Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {setupSteps.map((step) => (
                    <div key={step.step} className="flex gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                        <p className="text-blue-600 text-sm mt-2 font-medium">
                          📝 {step.action}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {step.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* DNS Configuration */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>DNS Records to Add</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert className="mb-4">
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Need Permissions?</strong> Custom domains require a paid Replit plan (Core $25/month or Teams $40/user/month). 
                        <a href="https://replit.com/pricing" target="_blank" className="text-blue-600 hover:underline ml-1">
                          Upgrade here <ExternalLink className="w-3 h-3 inline" />
                        </a>
                      </AlertDescription>
                    </Alert>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">A Record (Root Domain)</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Name:</span> @
                        </div>
                        <div>
                          <span className="font-medium">Value:</span> [Get IP from Replit dashboard]
                        </div>
                        <div>
                          <span className="font-medium">TTL:</span> 300
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">CNAME Record (WWW)</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Name:</span> www
                        </div>
                        <div>
                          <span className="font-medium">Value:</span> {window.location.hostname}
                        </div>
                        <div>
                          <span className="font-medium">TTL:</span> 300
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Why Connect a Custom Domain?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="text-center">
                        <div className="flex justify-center mb-3">
                          {benefit.icon}
                        </div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Code Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Code Ready for Domain
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Sitemap.xml configured for selamcpa.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Robots.txt configured for selamcpa.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Automatic domain detection ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">SEO tags prepared for custom domain</span>
                    </div>
                  </div>
                  
                  <Alert className="mt-4">
                    <AlertDescription>
                      Your website code is fully prepared for the domain connection. Once you complete the steps above, everything will automatically use selamcpa.com!
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}