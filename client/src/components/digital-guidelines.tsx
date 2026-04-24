import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Shield, Users, Globe } from "lucide-react";

const guidelines = [
  {
    icon: BookOpen,
    title: "Digital Recordkeeping",
    description: "Maintain organized digital records of all financial transactions, receipts, and tax documents. Use cloud storage for secure backup.",
    tips: ["Scan and store all receipts digitally", "Use accounting software for transaction logs", "Keep records for at least 7 years"],
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Protect sensitive financial data with strong security practices to prevent unauthorized access and data breaches.",
    tips: ["Use two-factor authentication", "Encrypt sensitive financial files", "Use secure, reputable accounting platforms"],
  },
  {
    icon: Users,
    title: "Client Communication",
    description: "Establish clear digital communication channels with your accountant to share documents securely and efficiently.",
    tips: ["Use secure portals for document sharing", "Avoid sending sensitive info via email", "Schedule regular digital check-ins"],
  },
  {
    icon: Globe,
    title: "Online Compliance",
    description: "Stay compliant with digital tax filing requirements and e-signature regulations for your jurisdiction.",
    tips: ["File taxes electronically when possible", "Use IRS-approved e-signature tools", "Monitor state-specific digital requirements"],
  },
];

export default function DigitalGuidelines() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Digital Best Practices</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Digital Accounting Guidelines</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Best practices for managing your finances and working with your CPA in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {guidelines.map((guideline) => {
            const Icon = guideline.icon;
            return (
              <Card key={guideline.title} className="shadow-md">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{guideline.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{guideline.description}</p>
                  <ul className="space-y-2">
                    {guideline.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-500 mt-0.5">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
