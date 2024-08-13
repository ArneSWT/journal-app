import React, { useState, useCallback, useEffect, useRef } from 'react';
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
interface HighlightProps {
  sendToParent: (data: string) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const Entry: React.FC<EntryProps> = ({ entry }) => {
  const [text, setText] = useState(entry.text);
  const [isSaving, setIsSaving] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const entryRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 1 } // Adjust the threshold as needed
    );

    if (entryRef.current) {
      observer.observe(entryRef.current);
    }

    return () => {
      if (entryRef.current) {
        observer.unobserve(entryRef.current);
      }
    };
  }, []);

  return (
    <div ref={entryRef} className={styles.entry}>
      <p className={styles.entrydate}>{formatDate(entry.created)}</p>
      <textarea className={styles.textarea} value={text} onChange={handleTextChange} />
      {isSaving && <p>Saving...</p>}
      {isInView && <p>Entry is in view</p>}
    </div>
  );
};

export default Entry;