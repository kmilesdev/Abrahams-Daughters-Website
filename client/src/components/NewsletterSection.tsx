import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Check, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { newsletterSchema, type NewsletterSubscription } from "@shared/schema";
import siteContent from "@/content/site-content.json";

const { newsletter } = siteContent;

export function NewsletterSection() {
  const { toast } = useToast();

  const form = useForm<NewsletterSubscription>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: NewsletterSubscription) => {
      return apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterSubscription) => {
    mutation.mutate(data);
  };

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto border-0 bg-transparent shadow-none">
          <CardContent className="text-center space-y-6 pt-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-semibold" data-testid="text-newsletter-title">
                {newsletter.title}
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto" data-testid="text-newsletter-desc">
                {newsletter.description}
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          data-testid="input-newsletter-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  data-testid="button-newsletter-subscribe"
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : mutation.isSuccess ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Subscribed
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            </Form>
            <p className="text-xs text-muted-foreground">
              {newsletter.privacyNote}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
