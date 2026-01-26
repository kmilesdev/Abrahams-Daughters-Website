import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send } from "lucide-react";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - this would connect to a live chat service
    setMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" data-testid="chat-widget">
      {isOpen ? (
        <Card className="w-80 shadow-lg animate-in slide-in-from-bottom-4 duration-300">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-md py-3 px-4 flex flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <CardTitle className="text-base font-medium">Chat With Us</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-48 mb-4 bg-muted rounded-md p-3 overflow-y-auto">
              <div className="bg-primary/10 rounded-lg p-3 text-sm mb-2">
                <p className="font-medium text-primary mb-1">Abrahams Daughters</p>
                <p className="text-muted-foreground">
                  Hello! How can we help you today? Leave us a message and we'll get back to you as soon as possible.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                className="text-sm"
                data-testid="input-chat-email"
              />
              <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="resize-none text-sm min-h-[60px]"
                data-testid="input-chat-message"
              />
              <Button type="submit" className="w-full" data-testid="button-send-chat">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-3">
              We typically respond within 24 hours
            </p>
          </CardContent>
        </Card>
      ) : (
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
          data-testid="button-open-chat"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}
    </div>
  );
}
