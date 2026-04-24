import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CreditCard, Shield, Clock } from "lucide-react";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount, description }: { amount: number; description: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your payment!",
      });
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>{description}</span>
          <span>${amount.toFixed(2)}</span>
        </div>
        <Separator />
      </div>
      
      <PaymentElement />
      
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Pay ${amount.toFixed(2)}
          </div>
        )}
      </Button>
    </form>
  );
};

const ServiceSelector = ({ onServiceSelect }: { onServiceSelect: (service: any) => void }) => {
  const [customAmount, setCustomAmount] = useState("");
  const [customDescription, setCustomDescription] = useState("");

  const predefinedServices = [
    { key: "free_consultation", name: "Free CPA Consultation - 30 Minutes", price: 0, description: "Complimentary professional accounting consultation session (30 minutes)" },
    { key: "consultation_1hr", name: "CPA Consultation - 1 Hour", price: 250, description: "Comprehensive accounting consultation session (1 hour)" },
    { key: "digital_guidelines", name: "Digital Accounting Guidelines Package", price: 9.99, description: "Practical digital solutions for everyday business accounting challenges" }
  ];

  const handleCustomService = () => {
    if (customAmount && customDescription) {
      onServiceSelect({
        key: "extended",
        name: customDescription,
        price: parseFloat(customAmount),
        description: customDescription
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Standard Consultations</h3>
        <div className="grid gap-3">
          {predefinedServices.map((service, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onServiceSelect(service)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="text-lg font-semibold">${service.price}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Extended Consultation</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="customDescription">Consultation Details</Label>
            <Input
              id="customDescription"
              placeholder="Describe your consultation needs and estimated time"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="customAmount">Amount ($)</Label>
            <Input
              id="customAmount"
              type="number"
              step="0.01"
              min="99"
              placeholder="99.00"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleCustomService}
            disabled={!customAmount || !customDescription || parseFloat(customAmount) < 99}
            className="w-full"
          >
            Continue with Extended Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleServiceSelect = async (service: any) => {
    setSelectedService(service);

    // If it's a free consultation, skip payment processing
    if (service.price === 0) {
      setClientSecret("free_consultation");
      return;
    }

    setIsLoading(true);
    try {
      const body: Record<string, unknown> = { service_key: service.key };
      // For extended consultations the server needs the caller-supplied amount
      // (still enforces a server-side minimum of $99)
      if (service.key === "extended") {
        body.amount = service.price;
      }
      const response = await apiRequest("POST", "/api/create-payment-intent", body);
      const data = await response.json();
      if (data.clientSecret) {
        // Use the server-returned amount so the UI reflects the authoritative price
        setSelectedService({ ...service, price: data.amount ?? service.price });
        setClientSecret(data.clientSecret);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if coming from digital guidelines page
  useEffect(() => {
    const guidelinesClientSecret = localStorage.getItem('guidelines_client_secret');
    const guidelinesEmail = localStorage.getItem('guidelines_email');
    
    if (guidelinesClientSecret && guidelinesEmail) {
      setSelectedService({
        name: "Digital Accounting Guidelines Package",
        price: 9.99,
        description: "Practical digital solutions for everyday business accounting challenges"
      });
      setClientSecret(guidelinesClientSecret);
      
      // Clear localStorage
      localStorage.removeItem('guidelines_client_secret');
      localStorage.removeItem('guidelines_email');
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                  <span className="ml-2">Setting up payment...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your CPA Consultation</h1>
              <p className="text-lg text-gray-600 mb-6">
                Schedule and pay for your professional consultation securely online
              </p>
              
              <div className="flex justify-center gap-8 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  Bank-Level Security
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Instant Processing
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  PCI Compliant
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Select Consultation Duration</CardTitle>
                <CardDescription>
                  Choose your consultation length or book extended time for complex needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ServiceSelector onServiceSelect={handleServiceSelect} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Handle free consultation booking
  if (selectedService && selectedService.price === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Free Consultation Booked!</h1>
              <p className="text-lg text-gray-600">
                Your complimentary CPA consultation has been reserved
              </p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Consultation Details</CardTitle>
                <CardDescription>
                  Your free consultation session is confirmed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">30 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Scheduling Confirmation</h3>
                    <p className="text-sm text-gray-600">
                      We'll contact you within 24 hours to schedule your free consultation at your convenience.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Preparation Materials</h3>
                    <p className="text-sm text-gray-600">
                      You'll receive an email with suggested documents to prepare for maximum consultation value.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => {
                  setSelectedService(null);
                  setClientSecret("");
                }}
                variant="outline"
              >
                Book Another Service
              </Button>
              <Button>
                Contact Us
              </Button>
            </div>

            <div className="mt-8 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Questions?</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Phone:</strong> (301) 640-8549</p>
                <p><strong>Email:</strong> selamcpa25@gmail.com</p>
                <p><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                  <p>Preparing secure checkout...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Payment</h1>
            <p className="text-gray-600">
              Secure checkout powered by Stripe
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </CardTitle>
              <CardDescription>
                Your payment is processed securely through Stripe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm 
                  amount={selectedService.price} 
                  description={selectedService.name}
                />
              </Elements>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your payment information is encrypted and secure.</p>
            <p>We never store your credit card details.</p>
          </div>
        </div>
      </div>
    </div>
  );
}