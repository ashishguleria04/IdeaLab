"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle, Save, Edit, Check, Image, Trash, FolderPlus, Folder, ChevronDown, ChevronRight } from "lucide-react"; // Added ChevronDown and ChevronRight imports
import { useNotes } from "@/hooks/use-notes";

interface Folder {
    name: string;
    notes: string[];
    subfolders: Folder[];
    isOpen: boolean;
}

const DocumentsPage = () => {
    const { user } = useUser();
    const { notes, addNote } = useNotes();
    const [newNote, setNewNote] = useState('');
    const [savedNotes, setSavedNotes] = useState<string[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
    const [newFolderName, setNewFolderName] = useState('');

    const handleCreateNote = (parentFolder: Folder | null = null) => {
        if (newNote.trim() !== '') {
            if (parentFolder) {
                const updatedFolders = [...folders];
                const folderIndex = updatedFolders.indexOf(parentFolder);
                updatedFolders[folderIndex].notes.push(newNote);
                setFolders(updatedFolders);
            } else if (currentFolder) {
                const updatedFolders = [...folders];
                const folderIndex = updatedFolders.indexOf(currentFolder);
                updatedFolders[folderIndex].notes.push(newNote);
                setFolders(updatedFolders);
            } else {
                addNote(newNote);
            }
            setNewNote('');
        }
    };

    const handleSaveNote = () => {
        if (newNote.trim() !== '') {
            setSavedNotes([...savedNotes, newNote]);
            setNewNote('');
        }
    };

    const handleEditNote = (index: number) => {
        setEditingIndex(index);
        setNewNote(savedNotes[index]);
    };

    const handleUpdateNote = () => {
        if (newNote.trim() !== '' && editingIndex !== null) {
            const updatedNotes = [...savedNotes];
            updatedNotes[editingIndex] = newNote;
            setSavedNotes(updatedNotes);
            setEditingIndex(null);
            setNewNote('');
        }
    };

    const handleDeleteNote = (index: number) => {
        const updatedNotes = savedNotes.filter((_, i) => i !== index);
        setSavedNotes(updatedNotes);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddImage = () => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewNote(prevNote => prevNote + `\n![Image](data:image/png;base64,${btoa(reader.result as string)})`);
            };
            reader.readAsDataURL(image);
            setImage(null);
        }
    };

    const handleCreateNoteWithImage = (parentFolder: Folder | null = null) => {
        if (newNote.trim() !== '' || image) {
            if (image) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const noteWithImage = newNote + `\n![Image](data:image/png;base64,${btoa(reader.result as string)})`;
                    if (parentFolder) {
                        const updatedFolders = [...folders];
                        const folderIndex = updatedFolders.indexOf(parentFolder);
                        updatedFolders[folderIndex].notes.push(noteWithImage);
                        setFolders(updatedFolders);
                    } else if (currentFolder) {
                        const updatedFolders = [...folders];
                        const folderIndex = updatedFolders.indexOf(currentFolder);
                        updatedFolders[folderIndex].notes.push(noteWithImage);
                        setFolders(updatedFolders);
                    } else {
                        addNote(noteWithImage);
                    }
                    setNewNote('');
                    setImage(null);
                };
                reader.readAsDataURL(image);
            } else {
                if (parentFolder) {
                    const updatedFolders = [...folders];
                    const folderIndex = updatedFolders.indexOf(parentFolder);
                    updatedFolders[folderIndex].notes.push(newNote);
                    setFolders(updatedFolders);
                } else if (currentFolder) {
                    const updatedFolders = [...folders];
                    const folderIndex = updatedFolders.indexOf(currentFolder);
                    updatedFolders[folderIndex].notes.push(newNote);
                    setFolders(updatedFolders);
                } else {
                    addNote(newNote);
                }
                setNewNote('');
            }
        }
    };

    const handleCreateFolder = (parentFolder: Folder | null = null) => {
        if (newFolderName.trim() !== '') {
            const newFolder: Folder = { name: newFolderName, notes: [], subfolders: [], isOpen: false };
            if (parentFolder) {
                const updatedFolders = [...folders];
                const folderIndex = updatedFolders.indexOf(parentFolder);
                updatedFolders[folderIndex].subfolders.push(newFolder);
                setFolders(updatedFolders);
            } else {
                setFolders([...folders, newFolder]);
            }
            setNewFolderName('');
        }
    };

    const handleSelectFolder = (folder: Folder) => {
        setCurrentFolder(folder);
    };

    const toggleFolder = (folder: Folder) => {
        folder.isOpen = !folder.isOpen;
        setFolders([...folders]);
    };

    const renderFolders = (folders: Folder[]) => {
        return folders.map((folder, index) => (
            <div key={index} className="p-2 border-b">
                <div className="flex justify-between items-center">
                    <span onClick={() => handleSelectFolder(folder)} className="cursor-pointer flex items-center">
                        {folder.isOpen ? <ChevronDown className="h-4 w-4 mr-2" onClick={() => toggleFolder(folder)} /> : <ChevronRight className="h-4 w-4 mr-2" onClick={() => toggleFolder(folder)} />}
                        <Folder className="h-4 w-4 mr-2"/>
                        {folder.name}
                    </span>
                    <Button onClick={() => handleCreateFolder(folder)}>
                        <FolderPlus className="h-4 w-4 mr-2"/>
                        Add Subfolder
                    </Button>
                    <Button onClick={() => handleCreateNoteWithImage(folder)}>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Add Note
                    </Button>
                </div>
                {folder.isOpen && (
                    <div className="ml-6">
                        {folder.notes.map((note, noteIndex) => (
                            <div key={noteIndex} className="p-2 border-b flex justify-between items-center">
                                <span>{note}</span>
                            </div>
                        ))}
                        {renderFolders(folder.subfolders)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4 p-4">
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s IdeaLab 
            </h2>
            <div className="w-full h-full flex flex-col">
                <textarea
                    className="flex-1 p-4 border rounded resize-none"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write your note here..."
                />
                <div className="flex space-x-2 mt-2 self-end">
                    {editingIndex !== null ? (
                        <Button onClick={handleUpdateNote}>
                            <Check className="h-4 w-4 mr-2"/>
                            Update note
                        </Button>
                    ) : (
                        <>
                            <Button onClick={() => handleCreateNoteWithImage(null)}>
                                <PlusCircle className="h-4 w-4 mr-2"/>
                                Create a note
                            </Button>
                            <Button onClick={handleSaveNote}>
                                <Save className="h-4 w-4 mr-2"/>
                                Save note
                            </Button>
                        </>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="upload-image" />
                    <Button onClick={handleAddImage}>
                        <label htmlFor="upload-image" className="cursor-pointer">
                            <Image className="h-4 w-4 mr-2"/>
                            Add Image
                        </label>
                    </Button>
                </div>
            </div>
            <div className="w-full mt-4">
                <h3 className="text-md font-medium">Saved Notes:</h3>
                {savedNotes.map((note, index) => (
                    <div key={index} className="p-2 border-b flex justify-between items-center">
                        <span>{note}</span>
                        <div className="flex space-x-2">
                            <Button onClick={() => handleEditNote(index)}>
                                <Edit className="h-4 w-4 ml-2"/>
                                Edit
                            </Button>
                            <Button onClick={() => handleDeleteNote(index)}>
                                <Trash className="h-4 w-4 ml-2"/>
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full mt-4">
                <h3 className="text-md font-medium">Folders:</h3>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="New folder name"
                        className="flex-1 p-2 border rounded"
                    />
                    <Button onClick={() => handleCreateFolder(null)}>
                        <FolderPlus className="h-4 w-4 mr-2"/>
                        Create Folder
                    </Button>
                </div>
                <div className="mt-4">
                    {renderFolders(folders)}
                </div>
            </div>
        </div>
    );
}

export default DocumentsPage;
