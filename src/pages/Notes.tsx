
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AiChatWidget } from "@/components/chat/AiChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  FileText, 
  FolderOpen, 
  MessageSquare, 
  MoreVertical, 
  Plus, 
  Search,
  Tag,
  Sparkles,
  FileImage,
  FileAudio
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Note {
  id: string;
  title: string;
  preview: string;
  content: string; // optional
  date: string;
  type: "text" | "handwriting" | "pdf" | "voice" | "image";
  tags: string[];
}

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Biology Lecture Notes",
    preview: "Cellular respiration is the process by which cells convert nutrients into energy...",
    content: "",
    date: "2023-04-15",
    type: "text",
    tags: ["biology", "science"],
  },
  {
    id: "2",
    title: "Project Meeting Summary",
    preview: "Discussed timeline adjustments and new feature priorities...",
    content: "",
    date: "2023-04-12",
    type: "voice",
    tags: ["work", "meetings"],
  },
  {
    id: "3",
    title: "Chemistry Formulas",
    preview: "Key formulas and reactions for organic chemistry...",
    content: "",
    date: "2023-04-10",
    type: "handwriting",
    tags: ["chemistry", "formulas"],
  },
  {
    id: "4",
    title: "Physics Textbook Chapter 5",
    preview: "Notes on thermodynamics and heat transfer...",
    content: "",
    date: "2023-04-05",
    type: "pdf",
    tags: ["physics", "thermodynamics"],
  },
  {
    id: "5",
    title: "Diagram of Cell Structure",
    preview: "Visual representation of cellular components and their functions...",
    content: "",
    date: "2023-04-03",
    type: "image",
    tags: ["biology", "diagrams"],
  },
];

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [newNoteModalOpen, setNewNoteModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteType, setNewNoteType] = useState<Note["type"]>("text");
  const [newNoteTags, setNewNoteTags] = useState<string[]>([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  const filteredNotes = notes.filter((note) => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const getIconByType = (type: Note["type"]) => {
    switch (type) {
      case "text":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "handwriting":
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "voice":
        return <FileAudio className="h-5 w-5 text-green-500" />;
      case "image":
        return <FileImage className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const handleCreateNote = () => {
    if (editingNote) {
      const updatedNotes = notes.map(n =>
        n.id === editingNote.id
          ? {
              ...n,
              title: newNoteTitle,
              content: newNoteContent,
              preview: newNoteContent.slice(0, 50),
              tags: newNoteTags,
              type: newNoteType,
              date: new Date().toLocaleDateString(),
            }
          : n
      );
      setNotes(updatedNotes);
      setEditingNote(null);
    } else {
      const newNote: Note = {
        id: (notes.length + 1).toString(),
        title: newNoteTitle,
        preview: newNoteContent.slice(0, 50),
        content: newNoteContent,
        date: new Date().toLocaleDateString(),
        type: newNoteType,
        tags: newNoteTags,
      };
      setNotes([...notes, newNote]);
    }
  
    // Clear fields and close modal
    setNewNoteModalOpen(false);
    setNewNoteTitle("");
    setNewNoteContent("");
    setNewNoteTags([]);
    setNewNoteType("text");
  };
  

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Notes</h1>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notes..."
                className="pl-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-smns-purple hover:bg-smns-purple-dark" onClick={() => setNewNoteModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </div>
        </div>
        
        {/* Modal for creating new note */}
        {newNoteModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-2xl font-bold mb-4">Create New Note</h2>
              <Input
                placeholder="Note Title"
                className="mb-4"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              <textarea
                placeholder="Note Content"
                className="w-full p-2 mb-4 border rounded-md"
                rows={4}
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
              />
              <Input
                placeholder="Tags (comma separated)"
                className="mb-4"
                value={newNoteTags.join(", ")}
                onChange={(e) => setNewNoteTags(e.target.value.split(",").map(tag => tag.trim()))}
              />
              <div className="mb-4">
                <select
                  value={newNoteType}
                  onChange={(e) => setNewNoteType(e.target.value as Note["type"])}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="text">Text</option>
                  <option value="handwriting">Handwriting</option>
                  <option value="pdf">PDF</option>
                  <option value="voice">Voice</option>
                  <option value="image">Image</option>
                </select>
              </div>
              <div className="flex justify-end">
                <h2 className="text-2xl font-bold mb-4">
                  {editingNote ? "Edit Note" : "Create New Note"}
                </h2>
                <Button
                  onClick={handleCreateNote}
                  className="bg-smns-purple hover:bg-smns-purple-dark"
                >
                  {editingNote ? "Update Note" : "Create Note"}
                </Button>
                <Button
                  onClick={() => {
                    setNewNoteModalOpen(false);
                    setEditingNote(null);
                    setNewNoteTitle("");
                    setNewNoteContent("");
                    setNewNoteTags([]);
                    setNewNoteType("text");
                  }}
                  className="ml-2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Notes</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="handwriting">Handwriting</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="pdf">PDFs</TabsTrigger>
            <TabsTrigger value="folders">Folders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      {getIconByType(note.type)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate Summary
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Extract Questions
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Create Mind Map
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Move to Folder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Tag className="h-4 w-4 mr-2" />
                            Manage Tags
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setEditingNote(note);
                            setNewNoteTitle(note.title);
                            setNewNoteContent(note.content);
                            setNewNoteTags(note.tags);
                            setNewNoteType(note.type);
                            setNewNoteModalOpen(true);
                          }}>
                            ✏️ Edit Note
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="text-lg mt-2">{note.title}</CardTitle>
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <CardDescription>{note.preview}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3">{note.preview}</p>
                    <p className="text-sm text-gray-600 line-clamp-3">{note.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{note.date}</p>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed hover:border-smns-purple hover:border-solid transition-colors cursor-pointer flex items-center justify-center min-h-[200px]">
                <div className="text-center p-6">
                  <Button className="h-12 w-12 rounded-full bg-smns-purple-light/20 flex items-center justify-center mx-auto mb-4" onClick={() => setNewNoteModalOpen(true)}>
                    <Plus className="h-6 w-6 text-smns-purple" />
                  </Button>
                  <p className="font-medium text-smns-purple">Create New Note</p>
                  <p className="text-sm text-gray-500 mt-1">Add text, images, voice, or handwritten notes</p>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="text">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes
                .filter((note) => note.type === "text")
                .map((note) => (
                  <Card key={note.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {getIconByType(note.type)}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </div>
                      <CardTitle className="text-lg mt-2">{note.title}</CardTitle>
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-3">{note.preview}</p>
                      <p className="text-xs text-gray-400 mt-2">{note.date}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="handwriting">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes
                .filter((note) => note.type === "handwriting")
                .map((note) => (
                  <Card key={note.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {getIconByType(note.type)}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </div>
                      <CardTitle className="text-lg mt-2">{note.title}</CardTitle>
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-3 font-handwriting">
                        {note.preview}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">{note.date}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="voice">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes
                .filter((note) => note.type === "voice")
                .map((note) => (
                  <Card key={note.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {getIconByType(note.type)}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </div>
                      <CardTitle className="text-lg mt-2">{note.title}</CardTitle>
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-8 bg-gray-100 rounded-md flex items-center px-2 mb-2">
                        <div className="w-full h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">{note.preview}</p>
                      <p className="text-xs text-gray-400 mt-2">{note.date}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pdf">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes
                .filter((note) => note.type === "pdf")
                .map((note) => (
                  <Card key={note.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {getIconByType(note.type)}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </div>
                      <CardTitle className="text-lg mt-2">{note.title}</CardTitle>
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-3">{note.preview}</p>
                      <p className="text-xs text-gray-400 mt-2">{note.date}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="folders">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <FolderOpen className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="font-medium text-lg mb-1">Biology</h3>
                    <p className="text-sm text-gray-500 mb-2">3 notes</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <FolderOpen className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="font-medium text-lg mb-1">Chemistry</h3>
                    <p className="text-sm text-gray-500 mb-2">2 notes</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <FolderOpen className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="font-medium text-lg mb-1">Work Projects</h3>
                    <p className="text-sm text-gray-500 mb-2">4 notes</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-dashed hover:border-smns-purple hover:border-solid transition-colors cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Plus className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="font-medium text-lg mb-1">New Folder</h3>
                    <p className="text-sm text-gray-500 mb-2">Create a folder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <AiChatWidget />
    </AppLayout>
  );
};

export default Notes;