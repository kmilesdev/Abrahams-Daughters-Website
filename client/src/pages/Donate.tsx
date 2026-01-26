import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Shield, Gift, Users, Loader2, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import siteContent from "@/content/site-content.json";

const { donate, about, seo } = siteContent;

const donationFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  anonymous: z.boolean().default(false),
});

type DonationFormData = z.infer<typeof donationFormSchema>;

export default function Donate() {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(100);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");

  const finalAmount = selectedAmount === "custom" ? Number(customAmount) || 0 : selectedAmount;

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      anonymous: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: { amount: number; frequency: string; donor: DonationFormData }) => {
      return apiRequest("POST", "/api/donations", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your donation!",
        description: "Your generosity helps us continue our mission.",
      });
      form.reset();
      setSelectedAmount(100);
      setCustomAmount("");
    },
    onError: () => {
      toast({
        title: "Payment processing",
        description: "Stripe integration coming soon. Thank you for your interest in donating!",
      });
    },
  });

  const onSubmit = (data: DonationFormData) => {
    if (finalAmount < 1) {
      toast({
        title: "Invalid amount",
        description: "Please enter a donation amount of at least $1.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate({
      amount: finalAmount,
      frequency,
      donor: data,
    });
  };

  return (
    <div className="flex flex-col">
      <SEO title={seo.donate.title} description={seo.donate.description} />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold" data-testid="text-donate-title">
              {donate.title}
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-donate-subtitle">
              {donate.description}
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    Make Your Gift
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Frequency */}
                      <div className="space-y-3">
                        <FormLabel>Donation Frequency</FormLabel>
                        <RadioGroup
                          value={frequency}
                          onValueChange={(v) => setFrequency(v as "one-time" | "monthly")}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="one-time" id="one-time" data-testid="radio-one-time" />
                            <label htmlFor="one-time" className="font-normal cursor-pointer text-sm">One-Time</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="monthly" id="monthly" data-testid="radio-monthly" />
                            <label htmlFor="monthly" className="font-normal cursor-pointer text-sm">Monthly</label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Amount Selection */}
                      <div className="space-y-3">
                        <FormLabel>Select Amount</FormLabel>
                        <div className="grid grid-cols-3 gap-3">
                          {donate.amounts.map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant={selectedAmount === amount ? "default" : "outline"}
                              onClick={() => setSelectedAmount(amount)}
                              className="text-lg"
                              data-testid={`button-amount-${amount}`}
                            >
                              ${amount}
                            </Button>
                          ))}
                          <Button
                            type="button"
                            variant={selectedAmount === "custom" ? "default" : "outline"}
                            onClick={() => setSelectedAmount("custom")}
                            data-testid="button-amount-custom"
                          >
                            Custom
                          </Button>
                        </div>
                        {selectedAmount === "custom" && (
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                              type="number"
                              min="1"
                              placeholder="Enter amount"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              className="pl-7"
                              data-testid="input-custom-amount"
                            />
                          </div>
                        )}
                      </div>

                      {/* Donor Info */}
                      <div className="space-y-4">
                        <FormLabel>Your Information</FormLabel>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    placeholder="First Name" 
                                    {...field} 
                                    data-testid="input-donor-first-name"
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
                                    placeholder="Last Name" 
                                    {...field} 
                                    data-testid="input-donor-last-name"
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
                                  type="email" 
                                  placeholder="Email Address" 
                                  {...field} 
                                  data-testid="input-donor-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="anonymous"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-anonymous"
                                />
                              </FormControl>
                              <label className="text-sm font-normal cursor-pointer">
                                Make my donation anonymous
                              </label>
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full text-lg"
                        size="lg"
                        disabled={finalAmount < 1 || mutation.isPending}
                        data-testid="button-donate-submit"
                      >
                        {mutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Heart className="mr-2 h-5 w-5" />
                            Donate ${finalAmount} {frequency === "monthly" ? "Monthly" : ""}
                          </>
                        )}
                      </Button>

                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>Secure, encrypted payment</span>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Impact Info */}
            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Your Impact
                  </h3>
                  <ul className="space-y-3">
                    {donate.impactItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <span className="font-semibold text-primary w-12">${item.amount}</span>
                        <span className="text-muted-foreground" data-testid={`text-impact-item-${index}`}>
                          {item.impact}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Where Your Money Goes
                  </h3>
                  <p className="text-muted-foreground text-sm" data-testid="text-money-use">
                    {donate.impactStatement}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Programs & Services</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Administration</span>
                      <span className="font-semibold">10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary/60 h-2 rounded-full" style={{ width: "10%" }} />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Fundraising</span>
                      <span className="font-semibold">5%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary/40 h-2 rounded-full" style={{ width: "5%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {about.impact.stats.slice(0, 2).map((stat, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="py-6">
                      <p className="font-serif text-3xl font-bold text-primary" data-testid={`text-donate-stat-${index}`}>
                        {stat.number}
                      </p>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-2xl font-semibold" data-testid="text-other-ways-title">
            {donate.otherWaysTitle}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {donate.otherWaysDescription}
          </p>
          <p className="text-sm text-muted-foreground">
            {donate.taxNote}
          </p>
        </div>
      </section>
    </div>
  );
}
