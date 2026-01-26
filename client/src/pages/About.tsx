import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Eye, Users, ArrowRight } from "lucide-react";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SEO } from "@/components/SEO";
import siteContent from "@/content/site-content.json";

const { about, mission, seo } = siteContent;

export default function About() {
  return (
    <div className="flex flex-col">
      <SEO title={seo.about.title} description={seo.about.description} />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold" data-testid="text-about-title">
              {about.title}
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-about-subtitle">
              {about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-semibold" data-testid="text-story-title">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-story-content">
                {about.story}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {about.storyExtended}
              </p>
              <Link href="/services">
                <Button data-testid="button-explore-services">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <Heart className="h-12 w-12 text-primary" />
                  </div>
                  <p className="font-serif text-2xl font-semibold text-primary" data-testid="text-years-serving">
                    12 Years of Service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold" data-testid="text-mission-heading">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-mission-content">
                  {mission.description}
                </p>
              </CardContent>
            </Card>
            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold" data-testid="text-vision-heading">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-vision-content">
                  {about.vision}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold" data-testid="text-impact-title">
              {about.impact.title}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {about.impact.stats.map((stat, index) => (
              <Card key={index} className="text-center hover-elevate transition-all duration-300">
                <CardContent className="py-8 space-y-2">
                  <p className="font-serif text-4xl font-bold text-primary" data-testid={`text-impact-number-${index}`}>
                    {stat.number}
                  </p>
                  <p className="text-muted-foreground text-sm" data-testid={`text-impact-label-${index}`}>
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold" data-testid="text-values-title">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {mission.values.map((value, index) => (
              <Card key={index} className="text-center hover-elevate transition-all duration-300">
                <CardContent className="py-8 space-y-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg" data-testid={`text-about-value-title-${index}`}>{value.title}</h3>
                  <p className="text-muted-foreground text-sm" data-testid={`text-about-value-desc-${index}`}>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="py-12 px-8 text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-serif text-2xl font-semibold" data-testid="text-join-title">
                {about.joinTitle}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto" data-testid="text-join-desc">
                {about.joinDescription}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/donate">
                  <Button data-testid="button-about-donate">
                    <Heart className="mr-2 h-4 w-4" />
                    Make a Donation
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" data-testid="button-about-volunteer">
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
