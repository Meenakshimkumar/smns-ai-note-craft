
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
  
  const handleSaveImage = (dataUrl: string) => {
    setSavedImage(dataUrl);
    // In a real implementation, this would send the image to a backend for processing
    console.log("Saved handwriting image:", dataUrl);
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
          
          <TabsContent value="write">
            <Card>
              <CardHeader>
                <CardTitle>Handwriting Canvas</CardTitle>
                <CardDescription>
                  Write using your finger, stylus, or mouse and your handwriting will be converted to text.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HandwritingCanvas onSave={handleSaveImage} />
              </CardContent>
            </Card>
          </TabsContent>
          
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
                        className={`text-lg ${font.id === 'cursive' ? 'font-handwriting' : ''}`}
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
                      selectedFont === 'cursive' ? 'font-handwriting' : ''
                    }`}
                  >
                    This is how your converted text will appear.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
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
                      <p className="font-handwriting text-lg">
                        This is a simulation of converted text from your handwriting...
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
