'use client'

import styles from "./page.module.css";
import Entry from "./Entry";
import Sidebar from "./Sidebar";
import { getEntries } from "../services/entryService";
import React, { useEffect, useState, useRef, use } from 'react';

// Define the type for the entry object
interface EntryProps {
  id: string;
  text: string;
  created: string;
}

/**
 * Component that displays the whole page, 
 * including the Sidebar and the Entry components
 * 
 * @returns jsx element that displays the whole page
 */
// React.FC -> React Functional Component, a type provided by React for TypeScript
const Content: React.FC = () => {
  /** 
   * [entries, setEntries] ->
   * [current state value, function to update the state value]
   * 
   * useState<EntryType[]>([]) -> 
   * initializes the state value with an empty array of EntryType objects
  */
  const [entries, setEntries] = useState<EntryProps[]>([]);
  const [date, setDate] = useState<EntryProps[]>([]);

  // useEffect is a React hook that runs after the first render
  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries: EntryProps[] = await getEntries();
      setEntries(fetchedEntries.reverse()); 
      setDate(fetchedEntries);
    };

    fetchEntries();
  }, []); // empty array means that the effect will run only once after the first render

  return (
    <div className={styles.container}>
      <Sidebar calendar={date} />
      <div className={styles.entrycontainer}>
        <div className={styles.placeholder}></div>
        {entries?.map((entry) => (
          <Entry 
            key={entry.id} 
            entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Content