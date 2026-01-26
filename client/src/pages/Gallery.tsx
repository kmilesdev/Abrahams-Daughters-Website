import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar, Handshake, ChevronLeft, ChevronRight } from "lucide-react";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SEO } from "@/components/SEO";
import siteContent from "@/content/site-content.json";

const { gallery, seo } = siteContent;

const iconComponents: Record<string, typeof Heart> = {
  Heart,
  Users,
  Calendar,
  Handshake,
};

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  
  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % gallery.items.length);
    }
  };
  
  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + gallery.items.length) % gallery.items.length);
    }
  };

  return (
    <div className="flex flex-col">
      <SEO title={seo.gallery.title} description={seo.gallery.description} />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold" data-testid="text-gallery-title">
              {gallery.title}
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-gallery-subtitle">
              {gallery.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {gallery.items.map((item, index) => {
              const Icon = iconComponents[item.icon] || Heart;
              return (
                <Card 
                  key={item.id} 
                  className="group cursor-pointer hover-elevate transition-all duration-300"
                  onClick={() => openModal(index)}
                  data-testid={`card-gallery-item-${index}`}
                >
                  <div className={`aspect-[4/3] bg-gradient-to-br ${item.color} rounded-t-md flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <Icon className="h-16 w-16 text-white/90" />
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="font-medium" data-testid={`text-gallery-title-${index}`}>{item.title}</p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-gallery-category-${index}`}>{item.category}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => closeModal()}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedIndex !== null && (
            <div className="relative">
              <div className={`aspect-video bg-gradient-to-br ${gallery.items[selectedIndex].color} flex items-center justify-center`}>
                {(() => {
                  const Icon = iconComponents[gallery.items[selectedIndex].icon] || Heart;
                  return <Icon className="h-24 w-24 text-white/90" />;
                })()}
              </div>
              <div className="p-6">
                <DialogTitle className="font-serif text-xl font-semibold" data-testid="text-modal-title">
                  {gallery.items[selectedIndex].title}
                </DialogTitle>
                <DialogDescription data-testid="text-modal-category">
                  {gallery.items[selectedIndex].category}
                </DialogDescription>
              </div>
              
              {/* Navigation */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                data-testid="button-gallery-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                data-testid="button-gallery-next"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-2xl font-semibold" data-testid="text-gallery-cta">
            {gallery.ctaTitle}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {gallery.ctaDescription}
          </p>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
