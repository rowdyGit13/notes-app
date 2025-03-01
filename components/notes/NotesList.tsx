"use client";

import { SelectNote } from "@/db/schema/notes-schema";
import { createNoteAction } from "@/actions/notes-actions";
import NoteItem from "./NoteItem";

export default function NotesList({ 
  notes, 
  userId,
  selectedNoteId,
  setSelectedNoteId
}: { 
  notes: SelectNote[], 
  userId: string,
  selectedNoteId: string | null,
  setSelectedNoteId: (id: string | null) => void
}) {
  const handleCreateNote = async () => {
    const result = await createNoteAction({
      userID: userId,
      title: "Untitled Note",
      content: "",
    });
    
    if (result.status === "success" && result.data) {
      setSelectedNoteId(result.data.id);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Notes</h2>
        <button 
          onClick={handleCreateNote}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          New
        </button>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem 
              key={note.id} 
              note={note} 
              isSelected={selectedNoteId === note.id}
              onSelect={() => setSelectedNoteId(note.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No notes yet</p>
        )}
      </div>
    </div>
  );
} 