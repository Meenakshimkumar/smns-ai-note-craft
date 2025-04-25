import React, { useRef, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiChatWidget } from "@/components/chat/AiChatWidget";
import { FileText, Upload, Search, List, AlertCircle, ScrollText } from "lucide-react";

const PDFs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("uploaded");
  const [pdfData, setPdfData] = useState<any[]>([]);
  const [questionsData, setQuestionsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
  
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
  
    setIsLoading(true);
  
    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
  
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        const newPdf = {
          id: pdfData.length + 1,
          name: data.filename,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          date: new Date().toISOString().split("T")[0],
          questions: data.questions.length,
          summary: data.summary,
        };
  
        setPdfData((prev) => [...prev, newPdf]);
  
        const updatedQuestions = data.questions.map((q: any, index: number) => ({
          ...q,
          id: questionsData.length + index + 1,
        }));
        setQuestionsData((prev) => [...prev, ...updatedQuestions]);
      }
    } catch (err) {
      alert("Unexpected error during upload");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };  

  const filteredPdfs = pdfData.filter((pdf) =>
    pdf.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  const filteredQuestions = questionsData.filter((q) =>
    q.question?.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">PDF Management</h1>
          <div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <Button
              className="bg-smns-purple hover:bg-smns-purple-dark"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload PDF
            </Button>
          </div>
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
        {isLoading && (
          <div className="text-sm p-4 bg-yellow-100 text-yellow-800 rounded-md">
            Processing your PDF... this may take a few seconds ⏳
          </div>
        )}

        <Tabs defaultValue="uploaded" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="uploaded">Uploaded PDFs</TabsTrigger>
            <TabsTrigger value="questions">Extracted Questions</TabsTrigger>
          </TabsList>

          {/* Uploaded PDFs */}
          <TabsContent value="uploaded" className="space-y-4">
            {filteredPdfs.length > 0 ? (
              filteredPdfs.map((pdf) => (
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
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    <div className="text-sm text-muted-foreground">
                      {pdf.questions} questions extracted
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-muted-foreground mb-1 flex items-center">
                        <ScrollText className="h-4 w-4 mr-1" /> Summary:
                      </div>
                      <div className="text-sm bg-gray-100 rounded-md p-3 whitespace-pre-wrap">
                        {pdf.summary}
                      </div>
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
                  <Button
                    className="mt-4 bg-smns-purple hover:bg-smns-purple-dark"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload PDF
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          {/* Extracted Questions */}
          <TabsContent value="questions" className="space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (
                <Card key={q.id}>
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{q.question}</CardTitle>
                        <CardDescription>
                          Appears in {q.frequency} document
                          {q.frequency !== 1 ? "s" : ""}
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
                        {q.sources.map((source: string, i: number) => (
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
