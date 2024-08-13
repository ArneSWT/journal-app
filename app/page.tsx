'use client'

import styles from "./page.module.css";
import Entry from "./Entry";
import Sidebar from "./Sidebar";
import { getEntries } from "../services/entryService";
import React, { useEffect, useState, useRef } from 'react';
import CreateEntry from "./CreateEntry";

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
const Content: React.FC = () => {
  const [entries, setEntries] = useState<EntryProps[]>([]);
  const [date, setDate] = useState<EntryProps[]>([]);
  const [visibleEntries, setVisibleEntries] = useState<Set<string>>(new Set());

  // Fetch entries from the server
  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries: EntryProps[] = await getEntries();
      setEntries(fetchedEntries.reverse()); 
      setDate(fetchedEntries);
    };

    fetchEntries();
  }, []);

  // Create an IntersectionObserver to track which entries are visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleEntries(prev => new Set(prev).add(entry.target.id));
        } else {
          setVisibleEntries(prev => {
            const newSet = new Set(prev);
            newSet.delete(entry.target.id);
            return newSet;
          });
        }
      });
    }, { threshold: 0.5 });

    // Observe all entry elements
    const entryElements = document.querySelectorAll('.entry');
    entryElements.forEach(element => observer.observe(element));

    // Cleanup
    return () => {
      entryElements.forEach(element => observer.unobserve(element));
    };
  }, [entries]); // Re-run the effect when the entries change

  /*
  //filters out all unique dates of entries
  const uniqueDates = new Set<string>();
  entries.forEach(entry => {
    const date = new Date(entry.created).toISOString().split('T')[0]; // Extract date part
    uniqueDates.add(date);
  });
  */

  return (
    <div className={styles.container}>
      <Sidebar calendar={date} visibleEntries={visibleEntries}/>

      { /* Display all entries */}
      <div className={styles.entrycontainer}>
        <div className={styles.placeholder}></div>
        <CreateEntry />
        {entries?.map((entry) => (
          <Entry 
            key={entry.id} 
            entry={entry} 
            className="entry"
            id={entry.id}
          />
        ))}
      
      </div>
      
      <div className={styles.visibleEntries}>
        <h2>Visible Entries</h2>
        <ul>
          {Array.from(visibleEntries).map(id => {
            const entry = entries.find(entry => entry.id === id);
            return (
              <li key={id}>
                {id} - {entry ? new Date(entry.created).toLocaleString() : 'Date not found'}
              </li>
            );
          })}
        </ul>
      </div>
        

    </div>
  );
};


export default Content;