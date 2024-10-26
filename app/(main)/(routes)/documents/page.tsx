"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image"
import { useNotes } from "@/hooks/use-notes";

const DocumentsPage = () => {
    const { user } = useUser();
    const [notes, setNotes] = useState<string[]>([]);
    const [newNote, setNewNote] = useState('');

    const addNote = (note: string) => {
        setNotes([...notes, note]);
    };

    const handleCreateNote = () => {
        if (newNote.trim() !== '') {
            addNote(newNote);
            setNewNote('');
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s IdeaLab 
            </h2>
            <div className="w-full max-w-md">
                <textarea
                    className="w-full p-2 border rounded"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write your note here..."
                />
                <Button onClick={handleCreateNote} className="mt-2">
                    <PlusCircle className="h-4 w-4 mr-2"/>
                    Create a note
                </Button>
            </div>
            <div className="w-full max-w-md mt-4">
                <p>Your notes are now stored in the sidebar.</p>
            </div>
        </div>
    );
}

export default DocumentsPage;
