import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SEO } from "@/components/SEO";
import siteContent from "@/content/site-content.json";

const { blog, seo } = siteContent;

const categoryColors: Record<string, string> = {
  Community: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Wellness: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Volunteers: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Events: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  Resources: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
  Stories: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
};

export default function Blog() {
  return (
    <div className="flex flex-col">
      <SEO title={seo.blog.title} description={seo.blog.description} />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold" data-testid="text-blog-title">
              {blog.title}
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-blog-subtitle">
              {blog.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {blog.posts.map((post, index) => (
              <Card key={post.id} className="hover-elevate transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  {/* Placeholder Image */}
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 md:w-64 shrink-0 flex items-center justify-center aspect-video md:aspect-auto md:rounded-l-md rounded-t-md md:rounded-tr-none">
                    <BookOpen className="h-12 w-12 text-primary/60" />
                  </div>
                  
                  <div className="flex-1">
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge 
                          variant="secondary" 
                          className={categoryColors[post.category] || ""}
                          data-testid={`badge-blog-category-${index}`}
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <h2 className="font-serif text-xl font-semibold" data-testid={`text-blog-post-title-${index}`}>
                        {post.title}
                      </h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm" data-testid={`text-blog-excerpt-${index}`}>
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span data-testid={`text-blog-date-${index}`}>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span data-testid={`text-blog-author-${index}`}>{post.author}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" data-testid={`button-read-more-${index}`}>
                          Read More
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-10">
            <Button variant="outline" data-testid="button-load-more-posts">
              Load More Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-2xl font-semibold" data-testid="text-categories-title">
              {blog.categoriesTitle}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {blog.categories.map((category) => (
                <Button 
                  key={category} 
                  variant="outline" 
                  size="sm"
                  data-testid={`button-category-${category.toLowerCase()}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
