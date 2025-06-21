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
    { name: "Tax Return Preparation", price: 299, description: "Individual tax return preparation and filing" },
    { name: "Business Tax Return", price: 499, description: "Business tax return preparation and filing" },
    { name: "Financial Statement Review", price: 799, description: "Compilation or review of financial statements" },
    { name: "Tax Planning Consultation", price: 199, description: "Strategic tax planning session (1 hour)" },
    { name: "Bookkeeping Setup", price: 399, description: "QuickBooks setup and training" },
    { name: "IRS Representation", price: 299, description: "IRS correspondence and representation" }
  ];

  const handleCustomService = () => {
    if (customAmount && customDescription) {
      onServiceSelect({
        name: customDescription,
        price: parseFloat(customAmount),
        description: customDescription
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select a Service</h3>
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
        <h3 className="text-lg font-semibold mb-4">Custom Service</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="customDescription">Service Description</Label>
            <Input
              id="customDescription"
              placeholder="Describe the service you need"
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
              min="0.50"
              placeholder="0.00"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleCustomService}
            disabled={!customAmount || !customDescription || parseFloat(customAmount) < 0.5}
            className="w-full"
          >
            Continue with Custom Service
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
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", { 
        amount: service.price,
        description: service.description
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setSelectedService(service);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Secure Online Payments</h1>
              <p className="text-lg text-gray-600 mb-6">
                Pay for your CPA services securely with our encrypted payment system
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
                <CardTitle>Payment Options</CardTitle>
                <CardDescription>
                  Choose from our standard services or enter a custom amount
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