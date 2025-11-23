import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertCareerApplicationSchema } from "@shared/schema";
import { Users, Briefcase, GraduationCap, CheckCircle } from "lucide-react";

const careerFormSchema = insertCareerApplicationSchema.extend({
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
});

type CareerFormData = z.infer<typeof careerFormSchema>;

const positions = [
  { value: "senior-accountant", label: "Senior Accountant" },
  { value: "tax-specialist", label: "Tax Specialist" },
  { value: "audit-manager", label: "Audit Manager" },
  { value: "bookkeeping-specialist", label: "Bookkeeping Specialist" },
  { value: "financial-analyst", label: "Financial Analyst" },
  { value: "payroll-specialist", label: "Payroll Specialist" },
  { value: "compliance-officer", label: "Compliance Officer" },
  { value: "business-advisor", label: "Business Advisory Consultant" },
];

const experienceLevels = [
  { value: "0-2", label: "0-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "6-10", label: "6-10 years" },
  { value: "10+", label: "10+ years" },
];

export default function Careers() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<CareerFormData>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      coverLetter: "",
      linkedinUrl: "",
      portfolioUrl: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: CareerFormData) => {
      return await apiRequest("POST", "/api/career-applications", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CareerFormData) => {
    submitMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Application Submitted!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Thank you for your interest in joining Selam CPA. We've received your application 
                and will review it carefully. Our team will get back to you within 5-7 business days.
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Our HR team will review your application and resume</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">If you're a good fit, we'll schedule an initial phone screening</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">3</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Successful candidates will be invited for a final interview</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Expert Team
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Selam CPA is looking for talented accounting professionals who share our commitment 
            to excellence and innovation. Join our team and help shape the future of accounting services.
          </p>
        </div>

        {/* Why Join Us Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Collaborative Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Work with a team of experienced professionals in a supportive environment that values innovation and continuous learning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Briefcase className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Advance your career with clear paths for promotion, professional development, and specialized training in emerging technologies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Cutting-Edge Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Work with the latest accounting technologies, AI-powered tools, and innovative solutions that set industry standards.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Submit Your Application</CardTitle>
              <CardDescription>
                Fill out the form below to apply for a position at Selam CPA. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
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
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position of Interest *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a position" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {positions.map((position) => (
                                <SelectItem key={position.value} value={position.value}>
                                  {position.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {experienceLevels.map((level) => (
                                <SelectItem key={level.value} value={level.value}>
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us why you're interested in this position and what makes you a great fit for our team..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please include your relevant experience, career goals, and why you want to join Selam CPA.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="linkedinUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                          </FormControl>
                          <FormDescription>Optional: Include your LinkedIn profile URL</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="portfolioUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Portfolio/Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourportfolio.com" {...field} />
                          </FormControl>
                          <FormDescription>Optional: Include a link to your professional portfolio</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Resume Submission</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Please email your resume to <strong>careers@selamcpa.com</strong> with the subject line 
                      "Application - [Position Name] - [Your Name]". Make sure to submit this form first to ensure 
                      we can match your resume with your application.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300">
            Questions about career opportunities? 
            <br />
            Email us at <strong>careers@selamcpa.com</strong> or call <strong>(240) 473-2623</strong>
          </p>
        </div>
      </div>
    </div>
  );
}