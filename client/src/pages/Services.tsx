import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users, BookOpen, HandHeart, Phone, Mail, Loader2, CheckCircle } from "lucide-react";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SEO } from "@/components/SEO";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { helpRequestSchema, type HelpRequest } from "@shared/schema";
import siteContent from "@/content/site-content.json";

const { services, organization, seo } = siteContent;

const iconMap: Record<string, typeof Heart> = {
  "Crisis Support": HandHeart,
  "Resource Navigation": Users,
  "Educational Programs": BookOpen,
  "Family Support": Heart,
};

export default function Services() {
  const { toast } = useToast();

  const form = useForm<HelpRequest>({
    resolver: zodResolver(helpRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      preferredDate: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: HelpRequest) => {
      return apiRequest("POST", "/api/help-request", data);
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Request submitted successfully!",
        description: "We'll contact you within 1-2 business days.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: HelpRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col">
      <SEO title={seo.services.title} description={seo.services.description} />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold" data-testid="text-services-page-title">
              {services.title}
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-services-page-desc">
              {services.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.items.map((service, index) => {
              const Icon = iconMap[service.title] || Heart;
              return (
                <Card key={index} className="hover-elevate transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl" data-testid={`text-service-detail-title-${index}`}>
                          {service.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm" data-testid={`text-service-detail-desc-${index}`}>
                      {service.details}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          <span data-testid={`text-service-feature-${index}-${fIndex}`}>{feature}</span>
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

      {/* Request Help Form */}
      <section className="py-16 bg-muted/50" id="request-help">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-semibold mb-4" data-testid="text-request-help-title">
                {services.helpFormTitle}
              </h2>
              <p className="text-muted-foreground" data-testid="text-request-help-desc">
                {services.helpFormDescription}
              </p>
            </div>

            <Card>
              <CardContent className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your full name" 
                                {...field} 
                                data-testid="input-help-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your@email.com" 
                                {...field} 
                                data-testid="input-help-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="(123) 456-7890" 
                                {...field} 
                                data-testid="input-help-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Type *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-help-service">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="crisis">Crisis Support</SelectItem>
                                <SelectItem value="resources">Resource Navigation</SelectItem>
                                <SelectItem value="education">Educational Programs</SelectItem>
                                <SelectItem value="family">Family Support</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date/Time</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Monday afternoon, Any weekday morning" 
                              {...field} 
                              data-testid="input-help-date"
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
                          <FormLabel>How can we help? *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe your situation and how we can assist you..."
                              className="min-h-[120px] resize-none"
                              {...field} 
                              data-testid="input-help-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={mutation.isPending}
                      data-testid="button-submit-help"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    Or contact us directly:
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                    <a 
                      href={`tel:${organization.phone}`} 
                      className="flex items-center gap-2 text-primary hover:underline"
                      data-testid="link-services-phone"
                    >
                      <Phone className="h-4 w-4" />
                      {organization.phone}
                    </a>
                    <a 
                      href={`mailto:${organization.email}`} 
                      className="flex items-center gap-2 text-primary hover:underline"
                      data-testid="link-services-email"
                    >
                      <Mail className="h-4 w-4" />
                      {organization.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
