import { useEffect, useState } from 'react';
import { useSearch } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function PaymentSuccess() {
  const search = useSearch();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const paymentIntentId = urlParams.get('payment_intent');
    
    if (paymentIntentId) {
      // In a real app, you'd fetch payment details from your API
      setPaymentDetails({
        id: paymentIntentId,
        amount: 299, // This would come from your API
        service: "Tax Return Preparation",
        status: "succeeded"
      });
    }
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-lg text-gray-600">
              Thank you for choosing Selam CPA
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Confirmation</CardTitle>
              <CardDescription>
                Your payment has been processed successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentDetails && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{paymentDetails.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">${paymentDetails.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono text-sm">{paymentDetails.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600 capitalize">{paymentDetails.status}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email Confirmation</h3>
                  <p className="text-sm text-gray-600">
                    You'll receive a receipt and service details via email within 5 minutes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Service Scheduling</h3>
                  <p className="text-sm text-gray-600">
                    Our team will contact you within 24 hours to schedule your service.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Document Upload</h3>
                  <p className="text-sm text-gray-600">
                    Access our secure client portal to upload required documents.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">
                Return to Home
              </Button>
            </Link>
            <Button>
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>

          <div className="mt-8 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Questions about your service or payment? We're here to help.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Phone:</strong> (301) 640-8549</p>
              <p><strong>Email:</strong> info@selamcpa.com</p>
              <p><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}