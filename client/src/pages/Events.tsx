import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ArrowRight, Heart } from "lucide-react";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SEO } from "@/components/SEO";
import siteContent from "@/content/site-content.json";

const { events, seo } = siteContent;

export default function Events() {
  return (
    <div className="flex flex-col">
      <SEO title={seo.events.title} description={seo.events.description} />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold" data-testid="text-events-title">
              {events.title}
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-events-subtitle">
              {events.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {events.items.map((event, index) => (
              <Card key={event.id} className="hover-elevate transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Date Block */}
                    <div className="bg-primary/10 p-6 flex flex-col items-center justify-center md:w-40 shrink-0">
                      <Calendar className="h-8 w-8 text-primary mb-2" />
                      <p className="font-semibold text-center text-sm" data-testid={`text-event-date-${index}`}>
                        {event.date}
                      </p>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex-1 space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl mb-2" data-testid={`text-event-title-${index}`}>
                            {event.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span data-testid={`text-event-time-${index}`}>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span data-testid={`text-event-location-${index}`}>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" data-testid={`badge-event-upcoming-${index}`}>Upcoming</Badge>
                      </div>
                      <p className="text-muted-foreground" data-testid={`text-event-desc-${index}`}>
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" data-testid={`button-event-details-${index}`}>
                          Learn More
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                        <Button size="sm" data-testid={`button-event-register-${index}`}>
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Host Event CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-card">
            <CardContent className="p-8 text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-serif text-2xl font-semibold" data-testid="text-host-event-title">
                {events.hostEventTitle}
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto" data-testid="text-host-event-desc">
                {events.hostEventDescription}
              </p>
              <Link href="/contact">
                <Button data-testid="button-contact-events">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
