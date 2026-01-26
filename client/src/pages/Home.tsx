import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, BookOpen, HandHeart, ArrowRight, Sparkles } from "lucide-react";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SEO } from "@/components/SEO";
import siteContent from "@/content/site-content.json";

const { hero, mission, about, services, seo, cta } = siteContent;

const iconMap: Record<string, typeof Heart> = {
  "Crisis Support": HandHeart,
  "Resource Navigation": Users,
  "Educational Programs": BookOpen,
  "Family Support": Heart,
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <SEO title={seo.home.title} description={seo.home.description} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span data-testid="text-hero-badge">{hero.badge}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight" data-testid="text-hero-title">
              {hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/donate">
                <Button size="lg" className="text-base px-8" data-testid="button-hero-donate">
                  <Heart className="mr-2 h-5 w-5" />
                  {hero.ctaPrimary}
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="text-base px-8" data-testid="button-hero-learn">
                  {hero.ctaSecondary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {about.impact.stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-primary" data-testid={`text-stat-number-${index}`}>
                  {stat.number}
                </p>
                <p className="text-muted-foreground text-sm" data-testid={`text-stat-label-${index}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold" data-testid="text-mission-title">
              {mission.title}
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="text-mission-desc">
              {mission.description}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mission.values.map((value, index) => (
              <Card key={index} className="text-center hover-elevate transition-all duration-300">
                <CardContent className="pt-8 pb-6 space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg" data-testid={`text-value-title-${index}`}>{value.title}</h3>
                  <p className="text-muted-foreground text-sm" data-testid={`text-value-desc-${index}`}>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold" data-testid="text-services-title">
              {services.title}
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="text-services-desc">
              {services.description}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.items.map((service, index) => {
              const Icon = iconMap[service.title] || Heart;
              return (
                <Card key={index} className="hover-elevate transition-all duration-300">
                  <CardContent className="p-6 flex gap-4">
                    <div className="shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold" data-testid={`text-service-title-${index}`}>{service.title}</h3>
                      <p className="text-muted-foreground text-sm" data-testid={`text-service-desc-${index}`}>{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/services">
              <Button variant="outline" data-testid="button-view-services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold" data-testid="text-cta-title">
              {cta.supportTitle}
            </h2>
            <p className="text-primary-foreground/90 text-lg" data-testid="text-cta-desc">
              {cta.supportDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/donate">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="text-base px-8"
                  data-testid="button-cta-donate"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Today
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  data-testid="button-cta-help"
                >
                  Get Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
