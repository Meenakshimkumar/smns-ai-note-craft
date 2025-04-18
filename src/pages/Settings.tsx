
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AiChatWidget } from "@/components/chat/AiChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Bell, 
  Lock, 
  Zap, 
  Cloud, 
  Smartphone, 
  PenTool,
  HelpCircle,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

const Settings = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600 mb-6">
          Customize your SMNS experience and manage preferences.
        </p>
        
        <Tabs defaultValue="account">
          <TabsList className="mb-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="handwriting">Handwriting</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
            <TabsTrigger value="ai">AI Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Profile Information</h3>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <input
                      id="name"
                      type="text"
                      className="p-2 border rounded-md"
                      defaultValue="John Doe"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <input
                      id="email"
                      type="email"
                      className="p-2 border rounded-md"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Subscription</h3>
                  <div className="bg-smns-purple-light/10 p-4 rounded-lg">
                    <p className="font-medium">Free Plan</p>
                    <p className="text-sm text-gray-600 mt-1">
                      You're currently on the Free plan with limited features.
                    </p>
                    <Button className="mt-4 bg-smns-purple hover:bg-smns-purple-dark">
                      Upgrade to Pro
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of your SMNS app.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Theme</h3>
                  <RadioGroup defaultValue="light">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="light" value="light" />
                      <Label htmlFor="light">Light Theme</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="dark" value="dark" />
                      <Label htmlFor="dark">Dark Theme</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="system" value="system" />
                      <Label htmlFor="system">System Default</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Font Size</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Smaller</span>
                      <span>Larger</span>
                    </div>
                    <Slider defaultValue={[50]} min={0} max={100} step={10} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Layout</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="compact" />
                    <Label htmlFor="compact">Compact View</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="handwriting">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PenTool className="h-5 w-5 mr-2" />
                  Handwriting Settings
                </CardTitle>
                <CardDescription>
                  Customize the handwriting recognition and conversion preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Default Font Style</h3>
                  <RadioGroup defaultValue="neat">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="casual" value="casual" />
                      <Label htmlFor="casual">Casual Handwriting</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="neat" value="neat" />
                      <Label htmlFor="neat">Neat Handwriting</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="cursive" value="cursive" />
                      <Label htmlFor="cursive" className="font-handwriting">Cursive Style</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="formal" value="formal" />
                      <Label htmlFor="formal">Formal Print</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Recognition Sensitivity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Lower</span>
                      <span>Higher</span>
                    </div>
                    <Slider defaultValue={[70]} min={0} max={100} step={10} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Higher sensitivity detects more subtle pen movements but may introduce more errors.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Auto-Formatting</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="autoformat" defaultChecked />
                    <Label htmlFor="autoformat">Automatically format text as you write</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications from SMNS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">
                        Receive updates about your account and content
                      </p>
                    </div>
                    <Switch id="email" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Study Reminders</p>
                      <p className="text-sm text-gray-500">
                        Get reminders to study based on your learning schedule
                      </p>
                    </div>
                    <Switch id="reminders" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">AI Recommendations</p>
                      <p className="text-sm text-gray-500">
                        Receive personalized study recommendations
                      </p>
                    </div>
                    <Switch id="ai-rec" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Updates</p>
                      <p className="text-sm text-gray-500">
                        Learn about new features and offers
                      </p>
                    </div>
                    <Switch id="marketing" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Privacy & Data
                </CardTitle>
                <CardDescription>
                  Manage your data and privacy settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Usage for AI Improvements</p>
                      <p className="text-sm text-gray-500">
                        Allow your anonymized data to improve our AI models
                      </p>
                    </div>
                    <Switch id="ai-data" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">End-to-End Encryption</p>
                      <p className="text-sm text-gray-500">
                        Enable enhanced security for your notes
                      </p>
                    </div>
                    <Switch id="encryption" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Activity Tracking</p>
                      <p className="text-sm text-gray-500">
                        Track your studying patterns for personalized insights
                      </p>
                    </div>
                    <Switch id="tracking" defaultChecked />
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <Button variant="outline" className="w-full">
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                    Delete My Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  AI Preferences
                </CardTitle>
                <CardDescription>
                  Customize how the AI features work for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">AI Language Model</h3>
                  <RadioGroup defaultValue="balanced">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="precise" value="precise" />
                      <Label htmlFor="precise">Precise - Focus on accuracy and facts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="balanced" value="balanced" />
                      <Label htmlFor="balanced">Balanced - Good mix of precision and creativity</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="creative" value="creative" />
                      <Label htmlFor="creative">Creative - More exploratory and diverse responses</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Question Generation</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Multiple Choice Questions</p>
                      </div>
                      <Switch id="mcq-gen" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Short Answer Questions</p>
                      </div>
                      <Switch id="short-gen" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Long Answer Questions</p>
                      </div>
                      <Switch id="long-gen" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Study Assistant</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="assistant" defaultChecked />
                    <Label htmlFor="assistant">Enable AI assistant in all notes</Label>
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

export default Settings;
