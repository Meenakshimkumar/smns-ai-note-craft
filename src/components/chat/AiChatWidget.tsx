
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AiChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your SMNS AI assistant. How can I help you with your notes today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input.trim() },
    ];
    setMessages(newMessages);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `I'm simulating a response to: "${input.trim()}". In the full version, I'll provide actual AI-powered answers to help with your notes and study materials.`,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="h-12 w-12 rounded-full shadow-lg bg-smns-purple hover:bg-smns-purple-dark"
            size="icon"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <MessageCircle className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle chat</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 sm:w-96 h-96 p-0 mr-4 mb-4"
          align="end"
          sideOffset={4}
        >
          <div className="flex flex-col h-full rounded-lg overflow-hidden border border-gray-200 shadow-xl">
            <div className="bg-smns-purple p-3 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">SMNS Assistant</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-smns-purple-dark h-8 w-8"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={message.role === "assistant" ? "ai-message" : "user-message"}
                >
                  {message.content}
                </div>
              ))}
            </div>
            
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gray-200 bg-white"
            >
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="bg-smns-purple hover:bg-smns-purple-dark"
                  disabled={!input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
