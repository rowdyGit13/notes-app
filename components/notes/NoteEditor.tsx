"use client";

import { useState, useEffect } from "react";
import { SelectNote } from "@/db/schema/notes-schema";
import { getNoteByIdAction, updateNoteAction } from "@/actions/notes-actions";

export default function NoteEditor({ 
  selectedNoteId,
  userId
}: { 
  selectedNoteId?: string,
  userId: string
}) {
  const [note, setNote] = useState<SelectNote | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (selectedNoteId) {
      loadNote(selectedNoteId);
    } else {
      setNote(null);
      setTitle("");
      setContent("");
    }
  }, [selectedNoteId]);
  
  const loadNote = async (id: string) => {
    const result = await getNoteByIdAction(id);
    if (result.status === "success" && result.data) {
      setNote(result.data);
      setTitle(result.data.title);
      setContent(result.data.content || "");
    }
  };
  
  const handleSave = async () => {
    if (!note) return;
    
    setIsSaving(true);
    await updateNoteAction(note.id, {
      title,
      content,
      userID: userId
    });
    setIsSaving(false);
  };
  
  if (!note) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a note or create a new one
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-semibold w-full border-b border-transparent focus:border-gray-300 focus:outline-none"
          placeholder="Note title"
        />
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-3 py-1 bg-green-500 text-white rounded disabled:bg-green-300"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full p-2 border rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Write your note here..."
      />
    </div>
  );
} 