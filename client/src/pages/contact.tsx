import DynamicSEO from "@/components/dynamic-seo";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";
import { insertContactSchema } from "@shared/schema";

const contactFormSchema = insertContactSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your message!",
        description: "We'll respond within 24 hours to schedule your consultation.",
      });
      form.reset();
      trackEvent('form_submit', { section: 'contact_page' });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
      trackEvent('form_error', { section: 'contact_page' });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const handleScheduleConsultation = () => {
    trackEvent('schedule_consultation_click', { section: 'contact_page' });
    window.open('https://calendly.com/yber2001/30min', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <DynamicSEO page="contact" />
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Contact Selam CPA
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              We offer remote accounting solutions – Wherever you are, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleScheduleConsultation}
                size="lg"
                className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Free Consultation
              </Button>
              <a
                href="tel:301-640-8549"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block text-center"
              >
                Call (301) 640-8549
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600">
                Ready to work together? We're here to help with all your accounting needs.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Phone */}
              <Card className="bg-white p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600 mb-4">Call us for immediate assistance</p>
                <a 
                  href="tel:301-640-8549"
                  className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors"
                >
                  (301) 640-8549
                </a>
              </Card>

              {/* Email */}
              <Card className="bg-white p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 mb-4">Send us a detailed message</p>
                <a 
                  href="mailto:selamcpa25@gmail.com"
                  className="text-green-600 hover:text-green-800 font-semibold transition-colors"
                >
                  selamcpa25@gmail.com
                </a>
              </Card>

              {/* Location */}
              <Card className="bg-white p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Area</h3>
                <p className="text-gray-600 mb-4">Remote services nationwide</p>
                <p className="text-purple-600 font-semibold">
                  Remote Services Based in Maryland
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Start a Conversation</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Whether you need bookkeeping, tax preparation, audit services, or business advisory, 
                  we're here to provide professional guidance tailored to your needs.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Quick Response</h4>
                      <p className="text-gray-600">We respond to all inquiries within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Free Consultation</h4>
                      <p className="text-gray-600">Get expert advice with no obligation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Remote Services</h4>
                      <p className="text-gray-600">Professional accounting services delivered virtually nationwide</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <Card className="bg-gray-50 border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Send a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@business.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How can we help you?</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={5}
                              placeholder="Tell us about your accounting needs..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors"
                    >
                      {mutation.isPending ? "Sending..." : "Send Message"}
                    </Button>

                    <p className="text-sm text-gray-600 text-center">
                      We'll respond within 24 hours to schedule your consultation.
                    </p>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}