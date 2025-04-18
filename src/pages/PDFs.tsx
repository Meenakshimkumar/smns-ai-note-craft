
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiChatWidget } from "@/components/chat/AiChatWidget";
import { FileText, Upload, Search, List, AlertCircle } from "lucide-react";

// Sample data for extracted questions
const sampleQuestions = [
  {
    id: 1,
    question: "What are the key principles of React's component architecture?",
    frequency: 3,
    sources: ["React Basics.pdf", "Advanced Frontend.pdf", "Interview Prep.pdf"],
  },
  {
    id: 2,
    question: "Explain the concept of state management in modern web applications.",
    frequency: 2,
    sources: ["React Basics.pdf", "Advanced Frontend.pdf"],
  },
  {
    id: 3,
    question: "How does the virtual DOM improve performance in React?",
    frequency: 2,
    sources: ["React Basics.pdf", "Performance Optimization.pdf"],
  },
];

// Sample data for uploaded PDFs
const samplePdfs = [
  {
    id: 1,
    name: "React Basics.pdf",
    size: "2.4 MB",
    date: "2023-09-15",
    questions: 12,
  },
  {
    id: 2,
    name: "Advanced Frontend.pdf",
    size: "3.8 MB",
    date: "2023-10-02",
    questions: 18,
  },
  {
    id: 3,
    name: "Interview Prep.pdf",
    size: "1.6 MB",
    date: "2023-10-10",
    questions: 25,
  },
  {
    id: 4,
    name: "Performance Optimization.pdf",
    size: "2.2 MB",
    date: "2023-09-28",
    questions: 8,
  },
];

const PDFs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("uploaded");
  
  const filteredPdfs = samplePdfs.filter(pdf => 
    pdf.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredQuestions = sampleQuestions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">PDF Management</h1>
          <Button className="bg-smns-purple hover:bg-smns-purple-dark">
            <Upload className="mr-2 h-4 w-4" /> Upload PDF
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search PDFs or questions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="uploaded" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="uploaded">Uploaded PDFs</TabsTrigger>
            <TabsTrigger value="questions">Extracted Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="uploaded" className="space-y-4">
            {filteredPdfs.length > 0 ? (
              filteredPdfs.map(pdf => (
                <Card key={pdf.id}>
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-smns-purple" />
                        <div>
                          <CardTitle className="text-lg">{pdf.name}</CardTitle>
                          <CardDescription>
                            {pdf.size} • Uploaded on {pdf.date}
                          </CardDescription>
                        </div>
                      </div>
                      <Button variant="outline" className="h-8" size="sm">
                        View
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm text-muted-foreground">
                      {pdf.questions} questions extracted
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No PDFs Found</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {searchTerm
                    ? `No PDFs match "${searchTerm}"`
                    : "Upload your first PDF to get started"}
                </p>
                {!searchTerm && (
                  <Button className="mt-4 bg-smns-purple hover:bg-smns-purple-dark">
                    <Upload className="mr-2 h-4 w-4" /> Upload PDF
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="questions" className="space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map(q => (
                <Card key={q.id}>
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{q.question}</CardTitle>
                        <CardDescription>
                          Appears in {q.frequency} document{q.frequency !== 1 ? 's' : ''}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium bg-smns-purple-light/20 text-smns-purple-dark px-2 py-1 rounded-full">
                          Frequency: {q.frequency}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm">
                      <div className="font-medium text-muted-foreground mb-1 flex items-center">
                        <List className="h-4 w-4 mr-1" /> Sources:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {q.sources.map((source, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-gray-100 px-2 py-1 rounded-md"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Questions Found</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {searchTerm
                    ? `No questions match "${searchTerm}"`
                    : "Upload PDFs to extract questions"}
                </p>
                {!searchTerm && activeTab === "questions" && (
                  <Button 
                    className="mt-4 bg-smns-purple hover:bg-smns-purple-dark"
                    onClick={() => setActiveTab("uploaded")}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload PDF
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <AiChatWidget />
    </AppLayout>
  );
};

export default PDFs;
