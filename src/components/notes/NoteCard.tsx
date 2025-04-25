import React from 'react';

export interface NoteCardProps {
    id: string;
    title: string;
    preview: string;
    content?: string; // optional
    date: string;
    type: 'text' | 'voice' | 'image' | 'pdf';
    tags: string[];
  }
  

export default function NoteCard({ content }: NoteCardProps) {
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-white">
      <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
    </div>
  );
}
