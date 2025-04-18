
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BookText, 
  FileText, 
  Mic, 
  PenTool, 
  Brain, 
  Settings,
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

export const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <PenTool className="h-8 w-8 text-smns-purple" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-smns-purple to-smns-blue-dark bg-clip-text text-transparent">
            SMNS
          </h1>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-smns-purple-light/10 text-smns-purple-dark font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};
