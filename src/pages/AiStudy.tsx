
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AiChatWidget } from "@/components/chat/AiChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Check, HelpCircle, CheckCheck, AlertCircle, BookOpen } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options?: string[];
  type: "mcq" | "short" | "long";
  correct?: number;
  userAnswer?: number | string;
}

const mockQuestions: Question[] = [
  {
    id: "1",
    text: "What is the primary function of mitochondria in a cell?",
    options: [
      "Protein synthesis",
      "Energy production (ATP)",
      "Cell division",
      "Waste disposal",
    ],
    type: "mcq",
    correct: 1,
  },
  {
    id: "2",
    text: "Explain the process of photosynthesis in your own words.",
    type: "long",
  },
  {
    id: "3",
    text: "What is the chemical formula for glucose?",
    type: "short",
  },
];

const AiStudy = () => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number | string>>({});
  const [showResult, setShowResult] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setLoading(true);
    
    // Simulate question generation
    setTimeout(() => {
      setLoading(false);
      // In a real app, we would generate questions based on the topic
      setQuestions(mockQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowResult(false);
    }, 1500);
  };
  
  const handleAnswerSelect = (value: string) => {
    const answerValue = currentQuestion.type === "mcq" ? parseInt(value) : value;
    
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: answerValue,
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const getScore = () => {
    let correct = 0;
    
    questions.forEach((question) => {
      if (
        question.type === "mcq" &&
        question.correct !== undefined &&
        userAnswers[question.id] === question.correct
      ) {
        correct++;
      }
    });
    
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Study Helper</h1>
        <p className="text-gray-600 mb-6">
          Generate personalized quizzes and practice questions based on your notes.
        </p>
        
        <Tabs defaultValue="generate">
          <TabsList className="mb-6">
            <TabsTrigger value="generate">Generate Questions</TabsTrigger>
            <TabsTrigger value="quiz">Take Quiz</TabsTrigger>
            <TabsTrigger value="history">Study History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle>Generate Study Questions</CardTitle>
                <CardDescription>
                  Enter a topic or paste your notes to create personalized study questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTopicSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="topic">Topic or Notes</Label>
                      <Textarea
                        id="topic"
                        className="min-h-[150px]"
                        placeholder="Enter a topic (e.g., 'Photosynthesis') or paste your notes here..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Question Types</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="mcq"
                            defaultChecked
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="mcq">Multiple Choice</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="short"
                            defaultChecked
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="short">Short Answer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="long"
                            defaultChecked
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="long">Long Answer</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Difficulty Level</h3>
                      <RadioGroup defaultValue="medium">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="easy" value="easy" />
                            <Label htmlFor="easy">Easy</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="medium" value="medium" />
                            <Label htmlFor="medium">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="hard" value="hard" />
                            <Label htmlFor="hard">Hard</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Number of Questions</h3>
                      <RadioGroup defaultValue="5">
                        <div className="grid grid-cols-4 gap-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="3" value="3" />
                            <Label htmlFor="3">3</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="5" value="5" />
                            <Label htmlFor="5">5</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="10" value="10" />
                            <Label htmlFor="10">10</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem id="15" value="15" />
                            <Label htmlFor="15">15</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-smns-purple hover:bg-smns-purple-dark"
                      disabled={!topic.trim() || loading}
                    >
                      {loading ? "Generating Questions..." : "Generate Questions"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle>Test Your Knowledge</CardTitle>
                <CardDescription>
                  Answer the questions to test your understanding of the material.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showResult ? (
                  <div className="space-y-6">
                    <div className="text-center py-6">
                      <div className="inline-flex rounded-full bg-green-100 p-4 mb-4">
                        <CheckCheck className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                      <p className="text-gray-600 mb-4">
                        You scored {getScore().correct} out of {getScore().total} ({getScore().percentage}%)
                      </p>
                      <Button
                        className="bg-smns-purple hover:bg-smns-purple-dark"
                        onClick={() => {
                          setCurrentQuestionIndex(0);
                          setShowResult(false);
                        }}
                      >
                        Review Questions
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Question Summary</h3>
                      
                      {questions.map((question, index) => (
                        <div
                          key={question.id}
                          className="p-4 border rounded-lg flex items-start space-x-3"
                        >
                          {question.type === "mcq" && question.correct !== undefined && (
                            <div className={`rounded-full p-1 ${
                              userAnswers[question.id] === question.correct
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}>
                              {userAnswers[question.id] === question.correct ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <AlertCircle className="h-4 w-4" />
                              )}
                            </div>
                          )}
                          {(question.type === "short" || question.type === "long") && (
                            <div className="rounded-full p-1 bg-yellow-100 text-yellow-600">
                              <HelpCircle className="h-4 w-4" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{`Question ${index + 1}: ${question.text}`}</p>
                            
                            {question.type === "mcq" && (
                              <div className="mt-2 text-sm">
                                <p className="text-gray-600 mb-1">Your answer:</p>
                                <p>{question.options?.[userAnswers[question.id] as number] || "Not answered"}</p>
                                
                                {question.correct !== undefined && userAnswers[question.id] !== question.correct && (
                                  <div className="mt-2">
                                    <p className="text-gray-600 mb-1">Correct answer:</p>
                                    <p className="text-green-600">{question.options?.[question.correct]}</p>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {(question.type === "short" || question.type === "long") && (
                              <div className="mt-2 text-sm">
                                <p className="text-gray-600 mb-1">Your answer:</p>
                                <p>{userAnswers[question.id] as string || "Not answered"}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : questions.length > 0 ? (
                  <div>
                    <div className="mb-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </span>
                      <span className="text-sm font-medium">
                        {currentQuestion.type === "mcq" ? "Multiple Choice" : 
                         currentQuestion.type === "short" ? "Short Answer" : "Long Answer"}
                      </span>
                    </div>
                    
                    <div className="p-6 bg-white rounded-lg border mb-6">
                      <h3 className="text-lg font-medium mb-6">{currentQuestion.text}</h3>
                      
                      {currentQuestion.type === "mcq" && currentQuestion.options && (
                        <RadioGroup
                          value={
                            userAnswers[currentQuestion.id] !== undefined
                              ? userAnswers[currentQuestion.id].toString()
                              : undefined
                          }
                          onValueChange={handleAnswerSelect}
                        >
                          <div className="space-y-4">
                            {currentQuestion.options.map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-3 p-3 rounded-lg border"
                              >
                                <RadioGroupItem id={`option-${index}`} value={index.toString()} />
                                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      )}
                      
                      {(currentQuestion.type === "short" || currentQuestion.type === "long") && (
                        <Textarea
                          placeholder="Type your answer here..."
                          value={userAnswers[currentQuestion.id] as string || ""}
                          onChange={(e) => handleAnswerSelect(e.target.value)}
                          className={currentQuestion.type === "long" ? "min-h-[150px]" : ""}
                        />
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                      >
                        Previous
                      </Button>
                      <Button
                        className="bg-smns-purple hover:bg-smns-purple-dark"
                        onClick={handleNext}
                      >
                        {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="mb-2 text-gray-600">No questions generated yet</p>
                    <p className="text-sm text-gray-500 mb-6">
                      Go to "Generate Questions" tab to create a quiz
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => document.querySelector('[value="generate"]')?.dispatchEvent(new Event('click'))}
                    >
                      Generate Questions
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Study History</CardTitle>
                <CardDescription>
                  Track your learning progress and review past quizzes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-smns-purple" />
                        <h3 className="font-medium">Biology - Cellular Functions</h3>
                      </div>
                      <span className="text-sm text-gray-500">April 15, 2023</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="font-medium">Score: 80%</span>
                      <span className="text-gray-500">|</span>
                      <span>5 questions</span>
                      <span className="text-gray-500">|</span>
                      <span>4 correct</span>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="ghost" size="sm" className="text-smns-purple">
                        Review Quiz
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-smns-purple" />
                        <h3 className="font-medium">Chemistry - Chemical Bonding</h3>
                      </div>
                      <span className="text-sm text-gray-500">April 12, 2023</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="font-medium">Score: 70%</span>
                      <span className="text-gray-500">|</span>
                      <span>10 questions</span>
                      <span className="text-gray-500">|</span>
                      <span>7 correct</span>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="ghost" size="sm" className="text-smns-purple">
                        Review Quiz
                      </Button>
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

export default AiStudy;
