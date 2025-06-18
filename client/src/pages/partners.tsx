import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Shield, 
  TrendingUp, 
  Zap, 
  CreditCard, 
  FileText,
  Building2,
  Users,
  Bot
} from "lucide-react";

export default function Partners() {
  const partnerCategories = [
    {
      title: "Financial & Accounting Software",
      icon: TrendingUp,
      partners: [
        {
          name: "QuickBooks",
          description: "Complete accounting software for small businesses",
          category: "Accounting",
          benefits: "Automated bookkeeping, invoicing, payroll integration"
        },
        {
          name: "Xero",
          description: "Cloud-based accounting platform",
          category: "Accounting", 
          benefits: "Real-time collaboration, bank reconciliation, reporting"
        },
        {
          name: "Sage Intacct",
          description: "Enterprise financial management",
          category: "Enterprise",
          benefits: "Advanced reporting, multi-entity management, compliance"
        }
      ]
    },
    {
      title: "AI & Automation Tools",
      icon: Bot,
      partners: [
        {
          name: "DataSnipper",
          description: "AI-powered audit and financial review automation",
          category: "AI/Audit",
          benefits: "Automated testing, document analysis, compliance checks"
        },
        {
          name: "AppZen",
          description: "AI expense management and AP automation",
          category: "AI/Finance",
          benefits: "Expense auditing, duplicate detection, policy compliance"
        },
        {
          name: "MindBridge AI",
          description: "AI-driven financial risk discovery",
          category: "AI/Risk",
          benefits: "Anomaly detection, risk assessment, fraud prevention"
        }
      ]
    },
    {
      title: "Security & Document Management",
      icon: Shield,
      partners: [
        {
          name: "ShareFile",
          description: "Secure file sharing and client portal",
          category: "Security",
          benefits: "Bank-level encryption, client portals, e-signatures"
        },
        {
          name: "DocuSign",
          description: "Digital signature and agreement platform",
          category: "Document",
          benefits: "Electronic signatures, contract management, compliance"
        },
        {
          name: "SmartVault",
          description: "Cloud-based document management for accountants",
          category: "Document",
          benefits: "Secure storage, client collaboration, workflow automation"
        }
      ]
    },
    {
      title: "Business Financing & Payment Solutions",
      icon: CreditCard,
      partners: [
        {
          name: "Kabbage",
          description: "Small business lending platform",
          category: "Financing",
          benefits: "Quick funding, flexible terms, business growth capital"
        },
        {
          name: "Stripe",
          description: "Payment processing and financial infrastructure",
          category: "Payments",
          benefits: "Online payments, invoicing, subscription management"
        },
        {
          name: "Fundbox",
          description: "Business credit and cash flow solutions",
          category: "Credit",
          benefits: "Invoice factoring, business credit lines, cash flow management"
        }
      ]
    },
    {
      title: "Process Management & CRM",
      icon: Users,
      partners: [
        {
          name: "Practice Ignition",
          description: "Client engagement and proposal automation",
          category: "CRM",
          benefits: "Proposal automation, client onboarding, engagement letters"
        },
        {
          name: "Karbon",
          description: "Practice management for accounting firms",
          category: "Management",
          benefits: "Workflow management, team collaboration, client communication"
        },
        {
          name: "Monday.com",
          description: "Work operating system and project management",
          category: "Project Mgmt",
          benefits: "Project tracking, team collaboration, automated workflows"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Technology Partners & Solutions
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Curated partnerships with leading financial, AI, and SaaS solutions to help you streamline operations, 
              enhance security, and grow your business with the best tools available.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {partnerCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="text-primary w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold">{category.title}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.partners.map((partner, partnerIndex) => (
                    <Card key={partnerIndex} className="bg-white hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl">{partner.name}</CardTitle>
                          <Badge variant="secondary">{partner.category}</Badge>
                        </div>
                        <p className="text-gray-600">{partner.description}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-4">
                          <strong>Key Benefits:</strong> {partner.benefits}
                        </p>
                        <Button className="w-full">
                          Learn More <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Secure File Sharing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Secure File Sharing & Client Portal</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bank-level security for all your sensitive financial documents and client communications
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Shield className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">256-bit Encryption</h3>
                    <p className="text-gray-600">All files encrypted in transit and at rest with bank-level security protocols</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FileText className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Document Management</h3>
                    <p className="text-gray-600">Organized folders, version control, and automated document workflows</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Client Portal Access</h3>
                    <p className="text-gray-600">Secure client login, real-time notifications, and progress tracking</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Mobile Access</h3>
                    <p className="text-gray-600">Upload and access documents securely from any device, anywhere</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Set up your secure client portal and start sharing documents safely today. 
                We'll guide you through the entire process.
              </p>
              <Button size="lg" className="w-full">
                Request Portal Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right Tools?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let us help you select and implement the best technology solutions for your specific needs and industry.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-50">
            Schedule Technology Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}