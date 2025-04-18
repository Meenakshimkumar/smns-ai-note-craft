
import React from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AiChatWidget } from "@/components/chat/AiChatWidget";
import {
  BookText,
  FileText,
  Mic,
  PenTool,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  color: string;
}

const FeatureCard = ({ icon: Icon, title, description, link, color }: FeatureCardProps) => (
  <div className="feature-card animate-fade-up">
    <div className={`rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link to={link}>
      <Button variant="ghost" className="p-0 text-smns-purple-dark hover:text-smns-purple font-medium">
        Get Started <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </Link>
  </div>
);

const features: FeatureCardProps[] = [
  {
    icon: PenTool,
    title: "Handwriting to Text",
    description: "Convert your handwriting to custom digital text in real-time.",
    link: "/handwriting",
    color: "bg-smns-purple",
  },
  {
    icon: FileText,
    title: "PDF Analysis",
    description: "Upload PDFs and extract questions, summaries and key points.",
    link: "/pdfs",
    color: "bg-smns-blue",
  },
  {
    icon: Brain,
    title: "AI Study Helper",
    description: "Generate Q&A sessions based on your notes for effective studying.",
    link: "/ai-study",
    color: "bg-smns-purple-dark",
  },
  {
    icon: Mic,
    title: "Voice Processing",
    description: "Record or upload audio to extract text, summaries, and related images.",
    link: "/voice",
    color: "bg-smns-blue-dark",
  },
  {
    icon: BookText,
    title: "Smart Notes",
    description: "Create, organize, and enhance your notes with AI assistance.",
    link: "/notes",
    color: "bg-gradient-to-r from-smns-purple to-smns-blue",
  },
];

const Index = () => {
  return (
    <AppLayout>
      <section className="py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-smns-purple to-smns-blue-dark bg-clip-text text-transparent">
            SMNS
          </h1>
          <p className="handwriting-text text-xl mb-6">Smart Multi-Note System</p>
          <p className="text-lg text-gray-600 mb-8">
            Transform how you take and interact with notes using AI-powered
            tools for students and professionals.
          </p>
          <Link to="/notes">
            <Button className="bg-smns-purple hover:bg-smns-purple-dark text-white px-6 py-2 rounded-full">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
      <AiChatWidget />
    </AppLayout>
  );
};

export default Index;
