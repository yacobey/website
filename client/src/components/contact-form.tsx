import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <div className="absolute top-10 right-20 w-72 h-72 bg-gradient-electric rounded-full opacity-10 blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-20 w-64 h-64 bg-gradient-vibrant rounded-full opacity-10 blur-3xl animate-bounce-gentle"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="animate-slide-up">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Let's <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                discuss
              </span> <br />
              your <br />
              business
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-md">
              I am ready to help you solve problems and raise your business to a new level.
            </p>
          </div>

          {/* Right Side - Contact Form */}
          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 rounded-3xl p-8 shadow-2xl">
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
                              className="bg-transparent border-2 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/5 h-14 rounded-xl"
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
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
                              className="bg-transparent border-2 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/5 h-14 rounded-xl"
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
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
                            type="email" 
                            placeholder="Email*" 
                            {...field} 
                            className="bg-transparent border-2 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/5 h-14 rounded-xl"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
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
                            rows={4}
                            placeholder="Message*"
                            {...field}
                            className="bg-transparent border-2 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/5 rounded-xl resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  {/* reCAPTCHA Placeholder */}
                  <div className="bg-white/10 border-2 border-white/20 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/40 rounded bg-white/5"></div>
                    <span className="text-white/70 text-sm">I'm not a robot</span>
                    <div className="ml-auto">
                      <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 h-14 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
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