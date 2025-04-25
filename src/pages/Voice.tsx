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

const Voice = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [processingType, setProcessingType] = useState<null | "text" | "summary" | "images">(null);
  const [progress, setProgress] = useState(0);

  const [transcript, setTranscript] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [images, setImages] = useState<{ alt: string; url: string }[]>([]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const stopRecording = () => {
    setIsRecording(false);
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

  const uploadAudio = async (file: File) => {
    setProcessingType("text");
    setProgress(0);

    const formData = new FormData();
    formData.append("audio", file);

    const response = await fetch("http://localhost:8000/api/voice/upload", {
      method: "POST",
      body: formData,
    });    

    const data = await response.json();

    setTranscript(data.transcript);
    setSummary(data.summary);
    setImages(data.images);
    setProcessingType(null);
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
                    isRecording ? "bg-red-50 border-2 border-red-500" : "bg-gray-50 border-2 border-gray-200"
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
                  <div className="text-center">
                    {isRecording ? (
                      <>
                        <p className="text-lg font-medium text-red-500 mb-1">Recording...</p>
                        <p className="text-2xl font-mono">{formatTime(recordingTime)}</p>
                        <p className="mt-4 text-sm text-gray-500">
                          Click the stop button when you're done recording
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-medium mb-1">Ready to Record</p>
                        <p className="text-sm text-gray-500 mb-6">
                          Click the microphone button to start recording
                        </p>
                      </>
                    )}
                  </div>
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
                  <p className="text-lg font-medium mb-2">Drag & drop audio files here</p>
                  <p className="text-sm text-gray-500 mb-4">Supports MP3, WAV, M4A files up to 500MB</p>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) uploadAudio(e.target.files[0]);
                    }}
                    className="block mx-auto text-sm"
                  />
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
                      <div key={recording.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
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
                {transcript && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Transcript</h3>
                    <p className="text-sm text-gray-800 whitespace-pre-line">{transcript}</p>
                  </div>
                )}
                {summary && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Summary</h3>
                    <p className="text-sm text-gray-800 whitespace-pre-line">{summary}</p>
                  </div>
                )}
                {images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Related Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((img, idx) => (
                        <div key={idx} className="bg-gray-100 aspect-square rounded-md flex items-center justify-center overflow-hidden">
                          <img src={img.url} alt={img.alt} className="object-cover h-full w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
      </div>
      <AiChatWidget />
    </AppLayout>
  );
};

export default Voice;
