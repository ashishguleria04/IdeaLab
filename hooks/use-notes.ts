import { useState } from 'react';

export const useNotes = () => {
  const [notes, setNotes] = useState<string[]>([]);

  const addNote = (note: string) => {
    setNotes([...notes, note]);
  };

  return { notes, addNote };
};
