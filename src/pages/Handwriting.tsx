import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AiChatWidget } from "@/components/chat/AiChatWidget";
import { HandwritingCanvas } from "@/components/handwriting/HandwritingCanvas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fontStyles = [
  { id: "casual", name: "Casual Handwriting" },
  { id: "neat", name: "Neat Handwriting" },
  { id: "cursive", name: "Cursive Style" },
  { id: "formal", name: "Formal Print" },
];

const Handwriting = () => {
  const [selectedFont, setSelectedFont] = useState("casual");
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const [convertedText, setConvertedText] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [sourceType, setSourceType] = useState<string | null>(null); // "canvas" or "upload"
  const [isConverting, setIsConverting] = useState(false);

  const handleSaveImage = async (dataUrl: string, source: "canvas" | "upload") => {
    setSavedImage(dataUrl);
    setSourceType(source);
    setConvertedText("Converting...");
    setIsConverting(true);

    try {
      const response = await fetch("http://localhost:8000/convert-handwriting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_base64: dataUrl }),
      });

      const result = await response.json();
      setConvertedText(result.text);
    } catch (error) {
      console.error("Error converting handwriting:", error);
      setConvertedText("Failed to convert handwriting.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Handwriting to Text</h1>
        <p className="text-gray-600 mb-6">
          Write naturally and see your handwriting converted to digital text in real-time.
        </p>

        <Tabs defaultValue="write">
          <TabsList className="mb-6">
            <TabsTrigger value="write">Write & Convert</TabsTrigger>
            <TabsTrigger value="settings">Font Settings</TabsTrigger>
            <TabsTrigger value="samples">My Samples</TabsTrigger>
          </TabsList>

          {/* === WRITE TAB === */}
          <TabsContent value="write">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Draw on Canvas</CardTitle>
                <CardDescription>
                  Use your finger, stylus, or mouse to write, then convert it to text.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HandwritingCanvas onSave={(img) => handleSaveImage(img, "canvas")} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Handwritten Image</CardTitle>
                <CardDescription>
                  Upload a photo or scanned image of your handwriting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64String = reader.result as string;
                      setUploadedImage(base64String);
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="mb-4"
                />
                {uploadedImage && (
                  <>
                    <img src={uploadedImage} alt="Preview" className="mb-4 w-full max-w-sm rounded-lg" />
                    <button
                      onClick={() => handleSaveImage(uploadedImage, "upload")}
                      disabled={isConverting}
                      className={`px-4 py-2 rounded text-white ${
                        isConverting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {isConverting ? "Converting..." : "Convert Handwriting"}
                    </button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* === SETTINGS TAB === */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Output Font</CardTitle>
                <CardDescription>
                  Choose a font style that best represents your handwriting preference.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedFont}
                  onValueChange={setSelectedFont}
                  className="space-y-4"
                >
                  {fontStyles.map((font) => (
                    <div className="flex items-center space-x-3" key={font.id}>
                      <RadioGroupItem value={font.id} id={font.id} />
                      <Label
                        htmlFor={font.id}
                        className={`text-lg ${font.id === "cursive" ? "font-handwriting" : ""}`}
                      >
                        {font.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Preview:</h3>
                  <p
                    className={`text-lg ${
                      selectedFont === "cursive" ? "font-handwriting" : ""
                    }`}
                  >
                    This is how your converted text will appear.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === SAMPLES TAB === */}
          <TabsContent value="samples">
            <Card>
              <CardHeader>
                <CardTitle>Your Handwriting Samples</CardTitle>
                <CardDescription>
                  View and manage your saved handwriting samples and conversions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedImage ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="border p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Handwriting Sample</h3>
                      <img
                        src={savedImage}
                        alt="Handwriting sample"
                        className="border rounded-lg w-full"
                      />
                    </div>
                    <div className="p-4 rounded-lg border">
                      <h3 className="text-sm font-medium mb-2">Converted Text</h3>
                      {sourceType && (
                        <p className="text-sm text-gray-500 mb-2">
                          Source: {sourceType === "canvas" ? "Drawn on Canvas" : "Uploaded Image"}
                        </p>
                      )}
                      <p className="text-base whitespace-pre-wrap">
                        {convertedText || "Converted text will appear here after saving a sample."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>You haven't saved any handwriting samples yet.</p>
                    <p className="mt-2 text-sm">
                      Go to the "Write & Convert" tab to create your first sample.
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

export default Handwriting;