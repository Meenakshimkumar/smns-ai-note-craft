
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  BookText, 
  FileText, 
  Mic, 
  PenTool, 
  Brain, 
  Settings,
  Menu,
  Home
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Notes", path: "/notes", icon: BookText },
  { name: "PDFs", path: "/pdfs", icon: FileText },
  { name: "Voice Memos", path: "/voice", icon: Mic },
  { name: "Handwriting", path: "/handwriting", icon: PenTool },
  { name: "AI Study", path: "/ai-study", icon: Brain },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <PenTool className="h-6 w-6 text-smns-purple" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-smns-purple to-smns-blue-dark bg-clip-text text-transparent">
          SMNS
        </h1>
      </div>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[320px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-2 py-6">
              <PenTool className="h-6 w-6 text-smns-purple" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-smns-purple to-smns-blue-dark bg-clip-text text-transparent">
                SMNS
              </h1>
            </div>
            
            <nav className="space-y-1 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-smns-purple-light/10 text-smns-purple-dark font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
