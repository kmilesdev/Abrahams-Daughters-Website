import { Link } from "wouter";
import { Heart, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import siteContent from "@/content/site-content.json";

const { organization, footer } = siteContent;

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold" data-testid="text-footer-org-name">
                {organization.name}
              </span>
            </div>
            <p className="text-muted-foreground text-sm" data-testid="text-footer-tagline">
              {footer.tagline}
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href={footer.social.facebook} aria-label="Facebook" data-testid="link-social-facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={footer.social.twitter} aria-label="Twitter" data-testid="link-social-twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={footer.social.instagram} aria-label="Instagram" data-testid="link-social-instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={footer.social.linkedin} aria-label="LinkedIn" data-testid="link-social-linkedin">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold" data-testid="text-footer-quick-links">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {footer.quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold" data-testid="text-footer-resources">Resources</h3>
            <nav className="flex flex-col gap-2">
              {footer.resources.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer"
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold" data-testid="text-footer-contact">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <a href={`tel:${organization.phone}`} className="hover:text-foreground transition-colors" data-testid="link-footer-phone">
                  {organization.phone}
                </a>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <a href={`mailto:${organization.email}`} className="hover:text-foreground transition-colors" data-testid="link-footer-email">
                  {organization.email}
                </a>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span data-testid="text-footer-hours">{organization.hours}</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span data-testid="text-footer-address">{organization.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm" data-testid="text-copyright">
            © {new Date().getFullYear()} {organization.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm" data-testid="text-nonprofit">
            A 501(c)(3) Nonprofit Organization
          </p>
        </div>
      </div>
    </footer>
  );
}
