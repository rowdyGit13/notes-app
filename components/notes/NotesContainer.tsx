"use client";

import { useState } from "react";
import { SelectNote } from "@/db/schema/notes-schema";
import NotesList from "./NotesList";
import NoteEditor from "./NoteEditor";

export default function NotesContainer({
  notes,
  userId
}: {
  notes: SelectNote[],
  userId: string
}) {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  return (
    <>
      {/* Sidebar for notes list */}
      <div className="w-64 border-r border-gray-200 p-4">
        <NotesList 
          notes={notes} 
          userId={userId} 
          selectedNoteId={selectedNoteId}
          setSelectedNoteId={setSelectedNoteId}
        />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 p-4">
        <NoteEditor 
          selectedNoteId={selectedNoteId || undefined} 
          userId={userId} 
        />
      </div>
    </>
  );
} 