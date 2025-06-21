import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { DollarSign, Clock, Shield, CheckCircle } from "lucide-react";

const services = [
  {
    name: "Free CPA Consultation - 30 Minutes",
    price: 0,
    description: "Complimentary professional accounting consultation session",
    features: [
      "Expert CPA guidance and advice",
      "Tax planning strategies discussion",
      "Financial questions answered",
      "Personalized recommendations",
      "Follow-up summary provided"
    ]
  },
  {
    name: "CPA Consultation - 1 Hour",
    price: 250,
    description: "Comprehensive accounting consultation session",
    features: [
      "In-depth financial analysis",
      "Detailed tax planning strategies", 
      "Business structure recommendations",
      "Financial statement review",
      "Written consultation summary",
      "Priority email support for 30 days"
    ]
  }
];

export default function ServicesPayment() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            CPA Consultation Services
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Professional accounting advice with transparent pricing. Start with a free consultation or book extended time.
          </p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              Secure Payment Processing
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-blue-600" />
              Same-Day Response
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              CPA Certified
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {services.map((service, index) => (
            <Card key={index} className="relative border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {service.price === 0 ? "FREE" : `$${service.price}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {service.price === 0 ? "complimentary" : "one-time fee"}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href="/payment" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    {service.price === 0 ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Book Free Consultation
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 mr-2" />
                        Pay Now - ${service.price}
                      </>
                    )}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Extended Consultation?
            </h3>
            <p className="text-gray-600 mb-4">
              For consultations longer than 1 hour or specialized project needs, we offer custom pricing.
            </p>
            <Link href="/payment">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Get Custom Quote
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}