import React, { useState, useCallback, useEffect } from 'react';
import { updateEntry } from '../services/entryService';
import useDebounce from '../hooks/useDebounce';
import styles from './page.module.css';

interface EntryProps {
  entry: {
    id: string;
    text: string;
    created: string;
  };
}

const Entry: React.FC<EntryProps> = ({ entry }) => {
  const [text, setText] = useState(entry.text);
  const [isSaving, setIsSaving] = useState(false);

  const saveUpdatedText = async (id: string, text: string) => {
    setIsSaving(true);
    try {
      await updateEntry(id, text);
      console.log('Entry updated successfully');
    } catch (error) {
      console.error('Error updating entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const debouncedSave = useDebounce((id: string, text: string) => {
    saveUpdatedText(id, text);
  }, 2000);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    debouncedSave(entry.id, e.target.value);
  };

  /*
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSaving) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (isSaving) {
        saveUpdatedText(entry.id, text);
      }
    };
  }, [isSaving, text, entry.id]);
  */

  return (
    <div className={styles.note}>
      <p>{entry.created}</p>
      <textarea value={text} onChange={handleTextChange} />
      {isSaving && <p>Saving...</p>}
    </div>
  );
};

export default Entry;