"use client";

import { SelectNote } from "@/db/schema/notes-schema";
import { deleteNoteAction } from "@/actions/notes-actions";

export default function NoteItem({ 
  note, 
  isSelected,
  onSelect 
}: { 
  note: SelectNote,
  isSelected: boolean,
  onSelect: () => void
}) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this note?")) {
      await deleteNoteAction(note.id);
    }
  };
  
  return (
    <div 
      onClick={onSelect}
      className={`p-3 mb-2 rounded cursor-pointer ${
        isSelected ? "bg-blue-100" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium truncate">{note.title}</h3>
        <button 
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
      {note.content && (
        <p className="text-sm text-gray-500 truncate mt-1">
          {note.content}
        </p>
      )}
    </div>
  );
} 