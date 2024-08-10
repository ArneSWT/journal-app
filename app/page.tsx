'use client'

import styles from "./page.module.css";
import Entry from "./Entry";
import Sidebar from "./Sidebar";
import { getEntries } from "../services/entryService";
import React, { useEffect, useState, useRef, use } from 'react';

// Define the type for the entry object
interface EntryType {
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
  const [entries, setEntries] = useState<EntryType[]>([]);

  // useEffect is a React hook that runs after the first render
  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries: EntryType[] = await getEntries();
      setEntries(fetchedEntries.reverse()); 
    };

    fetchEntries();
  }, []); // empty array means that the effect will run only once after the first render

  return (
    <div className={styles.container}>
      <Sidebar />
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

export default Content;