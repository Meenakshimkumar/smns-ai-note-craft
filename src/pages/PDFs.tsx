
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AiChatWidget } from "@/components/chat/AiChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileText, Search, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PDFFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
}

const mockPDFs: PDFFile[] = [
  {
    id: "1",
    name: "Lecture Notes Week 1.pdf",
    size: "2.4 MB",
    uploadDate: "2023-03-15",
  },
  {
    id: "2",
    name: "Chemistry Question Bank.pdf",
    size: "5.1 MB",
    uploadDate: "2023-03-10",
  },
];

const PDFs = () => {
  const [pdfs, setPdfs] = useState<PDFFile[]>(mockPDFs);
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    setAnalyzing(true);
    setProgress(0);
    
    // Simulate file processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          
          // Add the "uploaded" files to our list
          const newPdfs = Array.from(files).map((file, index) => ({
            id: `new-${Date.now()}-${index}`,
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            uploadDate: new Date().toISOString().split("T")[0],
          }));
          
          setPdfs((prev) => [...newPdfs, ...prev]);
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };
  
  const analyzePDFs = () => {
    setAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          return 0;
        }
        return prev + 5;
      });
    }, 300);
  };
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">PDF Analysis</h1>
        <p className="text-gray-600 mb-6">
          Upload PDFs to extract questions, identify key concepts, and generate study materials.
        </p>
        
        <Tabs defaultValue="upload">
          <TabsList className="mb-6">
            <TabsTrigger value="upload">Upload PDFs</TabsTrigger>
            <TabsTrigger value="library">My PDF Library</TabsTrigger>
            <TabsTrigger value="analysis">Extracted Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your PDFs</CardTitle>
                <CardDescription>
                  Drag and drop files or click to browse. We'll extract questions and key information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive ? "border-smns-purple bg-smns-purple-light/10" : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">
                    {dragActive ? "Drop your files here" : "Drag & drop your PDFs here"}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    or click to browse your files
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="mx-auto" as="span">
                      Browse Files
                    </Button>
                  </label>
                </div>
                
                {analyzing && (
                  <div className="mt-6">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Processing your PDFs...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
                
                {pdfs.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-3">Recent Uploads</h3>
                    <div className="space-y-2">
                      {pdfs.slice(0, 3).map((pdf) => (
                        <div
                          key={pdf.id}
                          className="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <FileText className="h-5 w-5 text-smns-purple mr-3" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{pdf.name}</p>
                            <p className="text-xs text-gray-500">
                              {pdf.size} • Uploaded on {pdf.uploadDate}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {pdfs.length > 0 && (
                      <div className="mt-6">
                        <Button 
                          className="w-full bg-smns-purple hover:bg-smns-purple-dark"
                          onClick={analyzePDFs}
                          disabled={analyzing}
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Analyze for Questions & Concepts
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="library">
            <Card>
              <CardHeader>
                <CardTitle>Your PDF Library</CardTitle>
                <CardDescription>
                  Manage your uploaded PDFs and view extraction results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pdfs.length > 0 ? (
                  <div className="space-y-4">
                    {pdfs.map((pdf) => (
                      <div
                        key={pdf.id}
                        className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-smns-purple mr-4" />
                          <div>
                            <p className="font-medium">{pdf.name}</p>
                            <p className="text-sm text-gray-500">
                              {pdf.size} • Uploaded on {pdf.uploadDate}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Analysis
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="mb-2">No PDFs have been uploaded yet</p>
                    <p className="text-sm">
                      Go to the Upload PDFs tab to add some documents
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle>Extracted Questions</CardTitle>
                <CardDescription>
                  View questions extracted from your PDFs and analyze patterns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pdfs.length > 0 ? (
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg bg-smns-purple-light/5">
                      <p className="font-medium text-smns-purple-dark mb-2">
                        Repeated Question Pattern
                      </p>
                      <p className="text-gray-700 mb-4">
                        "Explain the process of photosynthesis and its importance in the ecosystem."
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <p>Found in 3 documents</p>
                        <span className="mx-2">•</span>
                        <p>High importance</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">All Extracted Questions</h3>
                      <div className="p-4 border rounded-lg">
                        <p className="font-medium mb-1">
                          What are the main factors affecting climate change?
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          From: Lecture Notes Week 1.pdf
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <p className="font-medium mb-1">
                          Describe the structure of an atom and explain the properties of its subatomic particles.
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          From: Chemistry Question Bank.pdf
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg bg-smns-purple-light/5">
                        <p className="font-medium mb-1 text-smns-purple-dark">
                          Explain the process of photosynthesis and its importance in the ecosystem.
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          From: Multiple documents
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="mb-2">No questions have been extracted yet</p>
                    <p className="text-sm">
                      Upload and analyze PDFs to see extracted questions
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <AiChatWidget />
    </AppLayout>
  );
};

export default PDFs;
