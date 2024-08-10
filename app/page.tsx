'use client'

import styles from "./page.module.css";
import Entry from "./Entry";
import Sidebar from "./Sidebar";
import { getEntries } from "../services/entryService";
import React, { useEffect, useState } from 'react';

interface EntryType {
  id: string;
  text: string;
  content: string;
  created: string;
  // Add other fields as necessary
}

const Content: React.FC = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries: EntryType[] = await getEntries();
      setEntries(fetchedEntries.reverse());
    };

    fetchEntries();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.entrycontainer}>
        {entries?.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Content;