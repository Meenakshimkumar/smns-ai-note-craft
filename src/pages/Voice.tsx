
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AiChatWidget } from "@/components/chat/AiChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, StopCircle, Upload, FileAudio, Type, Image, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Recording {
  id: string;
  name: string;
  duration: string;
  date: string;
}

const mockRecordings: Recording[] = [
  {
    id: "1",
    name: "Lecture on Cell Biology",
    duration: "23:45",
    date: "2023-04-12",
  },
  {
    id: "2",
    name: "Meeting Notes - Project X",
    duration: "12:18",
    date: "2023-04-10",
  },
];

const Voice = () => {
  const [recordings, setRecordings] = useState<Recording[]>(mockRecordings);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [processingType, setProcessingType] = useState<null | "text" | "summary" | "images">(null);
  const [progress, setProgress] = useState(0);
  
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Simulate recording time update
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
    
    // Store the interval ID for cleanup
    return () => clearInterval(interval);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    
    // Add the new recording to the list
    const newRecording: Recording = {
      id: `new-${Date.now()}`,
      name: `Recording ${recordings.length + 1}`,
      duration: formatTime(recordingTime),
      date: new Date().toISOString().split("T")[0],
    };
    
    setRecordings([newRecording, ...recordings]);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  const processRecording = (type: "text" | "summary" | "images") => {
    setProcessingType(type);
    setProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setProcessingType(null), 500);
          return 0;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Voice Processing</h1>
        <p className="text-gray-600 mb-6">
          Record or upload audio to extract text, summaries, and related visuals.
        </p>
        
        <Tabs defaultValue="record">
          <TabsList className="mb-6">
            <TabsTrigger value="record">Record Audio</TabsTrigger>
            <TabsTrigger value="upload">Upload Audio</TabsTrigger>
            <TabsTrigger value="library">My Recordings</TabsTrigger>
            <TabsTrigger value="processing">Processing Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record">
            <Card>
              <CardHeader>
                <CardTitle>Voice Recorder</CardTitle>
                <CardDescription>
                  Record your lectures, meetings, or voice notes for processing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className={`relative rounded-full w-32 h-32 flex items-center justify-center mb-6 ${
                    isRecording 
                      ? "bg-red-50 border-2 border-red-500" 
                      : "bg-gray-50 border-2 border-gray-200"
                  }`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full h-24 w-24 ${
                        isRecording ? "text-red-500" : "text-gray-500"
                      }`}
                      onClick={isRecording ? stopRecording : startRecording}
                    >
                      {isRecording ? (
                        <StopCircle className="h-12 w-12" />
                      ) : (
                        <Mic className="h-12 w-12" />
                      )}
                    </Button>
                    
                    {isRecording && (
                      <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 animate-pulse-light" />
                    )}
                  </div>
                  
                  {isRecording ? (
                    <div className="text-center">
                      <p className="text-lg font-medium text-red-500 mb-1">Recording...</p>
                      <p className="text-2xl font-mono">{formatTime(recordingTime)}</p>
                      <p className="mt-4 text-sm text-gray-500">
                        Click the stop button when you're done recording
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-medium mb-1">Ready to Record</p>
                      <p className="text-sm text-gray-500 mb-6">
                        Click the microphone button to start recording
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <Button 
                            variant="outline" 
                            className="w-full h-24 flex flex-col items-center justify-center space-y-2 border-dashed"
                            disabled
                          >
                            <Type className="h-6 w-6 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              Extract Text
                            </span>
                          </Button>
                        </div>
                        <div className="text-center">
                          <Button 
                            variant="outline" 
                            className="w-full h-24 flex flex-col items-center justify-center space-y-2 border-dashed"
                            disabled
                          >
                            <FileAudio className="h-6 w-6 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              Summarize
                            </span>
                          </Button>
                        </div>
                        <div className="text-center">
                          <Button 
                            variant="outline" 
                            className="w-full h-24 flex flex-col items-center justify-center space-y-2 border-dashed"
                            disabled
                          >
                            <Image className="h-6 w-6 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              Fetch Images
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload Audio</CardTitle>
                <CardDescription>
                  Upload existing audio files for text extraction, summarization, or image retrieval.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">
                    Drag & drop audio files here
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports MP3, WAV, M4A files up to 500MB
                  </p>
                  <Button variant="outline" className="mx-auto">
                    Browse Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="library">
            <Card>
              <CardHeader>
                <CardTitle>Your Voice Recordings</CardTitle>
                <CardDescription>
                  Manage your recordings and process them for insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recordings.length > 0 ? (
                  <div className="space-y-4">
                    {recordings.map((recording) => (
                      <div
                        key={recording.id}
                        className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-smns-purple-light/20 flex items-center justify-center mr-4">
                            <FileAudio className="h-5 w-5 text-smns-purple" />
                          </div>
                          <div>
                            <p className="font-medium">{recording.name}</p>
                            <p className="text-sm text-gray-500">
                              {recording.duration} • {recording.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => processRecording("text")}
                          >
                            <Type className="h-4 w-4 mr-1" />
                            Text
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => processRecording("summary")}
                          >
                            <FileAudio className="h-4 w-4 mr-1" />
                            Summary
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => processRecording("images")}
                          >
                            <Image className="h-4 w-4 mr-1" />
                            Images
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>You don't have any recordings yet.</p>
                    <p className="mt-2 text-sm">
                      Go to the "Record Audio" tab to create your first recording.
                    </p>
                  </div>
                )}
                
                {processingType && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                      <div className="flex items-center mb-4">
                        <Sparkles className="h-5 w-5 text-smns-purple mr-2" />
                        <h3 className="text-lg font-medium">
                          {processingType === "text" && "Extracting Text"}
                          {processingType === "summary" && "Generating Summary"}
                          {processingType === "images" && "Finding Related Images"}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Please wait while we process your recording...
                      </p>
                      <Progress value={progress} className="h-2 mb-2" />
                      <p className="text-right text-sm text-gray-500">{progress}%</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="processing">
            <Card>
              <CardHeader>
                <CardTitle>Processing Results</CardTitle>
                <CardDescription>
                  View text extraction, summaries, and related images from your recordings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Lecture on Cell Biology</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Type className="h-4 w-4 mr-2 text-smns-purple" />
                            Extracted Text
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm">
                            "Today we will discuss cell biology, focusing on the structure and function of organelles. The mitochondria is known as the powerhouse of the cell, responsible for generating ATP through cellular respiration..."
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base flex items-center">
                            <FileAudio className="h-4 w-4 mr-2 text-smns-blue" />
                            Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm">
                            "This lecture covers the fundamentals of cell biology with a focus on organelle structure and function. Key topics include mitochondria, cellular respiration, and the production of ATP."
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Image className="h-4 w-4 mr-2 text-green-600" />
                            Related Images
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-100 aspect-square rounded-md flex items-center justify-center">
                              <span className="text-xs text-gray-500">Cell Image</span>
                            </div>
                            <div className="bg-gray-100 aspect-square rounded-md flex items-center justify-center">
                              <span className="text-xs text-gray-500">Mitochondria</span>
                            </div>
                            <div className="bg-gray-100 aspect-square rounded-md flex items-center justify-center">
                              <span className="text-xs text-gray-500">ATP Diagram</span>
                            </div>
                            <div className="bg-gray-100 aspect-square rounded-md flex items-center justify-center">
                              <span className="text-xs text-gray-500">Respiration</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <AiChatWidget />
    </AppLayout>
  );
};

export default Voice;
