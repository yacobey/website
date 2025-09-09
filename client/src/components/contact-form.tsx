import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";
import { insertContactSchema } from "@shared/schema";

const contactFormSchema = insertContactSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
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
      trackEvent('form_submit', { section: 'contact_form' });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
      trackEvent('form_error', { section: 'contact_form' });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-32 w-80 h-80 bg-gradient-electric rounded-full opacity-10 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-32 w-72 h-72 bg-gradient-vibrant rounded-full opacity-10 blur-3xl animate-bounce-gentle"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Side - Text Content */}
          <div className="animate-fade-in">
            <h2 className="text-6xl lg:text-7xl font-bold text-neutral-900 mb-10 leading-tight">
              Let's <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                discuss
              </span> <br />
              your <br />
              <span className="bg-gradient-to-r from-green-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                business
              </span>
            </h2>
            <p className="text-2xl text-neutral-600 leading-relaxed max-w-lg mb-8">
              We are ready to help you solve problems and raise your business to a new level.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700">24hr Response</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700">Free Consultation</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700">Expert CPA Team</span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="animate-slide-up">
            <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="First Name*" 
                              {...field} 
                              className="border-neutral-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-14 text-lg rounded-xl"
                            />
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
                          <FormControl>
                            <Input 
                              placeholder="Last Name*" 
                              {...field} 
                              className="border-neutral-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-14 text-lg rounded-xl"
                            />
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
                        <FormControl>
                          <Input 
                            placeholder="Email*" 
                            type="email" 
                            {...field} 
                            className="border-neutral-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-14 text-lg rounded-xl"
                          />
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
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your business needs*" 
                            {...field} 
                            rows={6}
                            className="border-neutral-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none text-lg rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full bg-purple-gradient hover:bg-purple-dark text-white h-14 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {mutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Send Message
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}