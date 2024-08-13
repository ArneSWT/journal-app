'use client'

import styles from "./page.module.css";
import Entry from "./Entry";
import Sidebar from "./Sidebar";
import { getEntries } from "../services/entryService";
import React, { useEffect, useState, useRef } from 'react';

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

  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries: EntryProps[] = await getEntries();
      setEntries(fetchedEntries.reverse()); 
      setDate(fetchedEntries);
    };

    fetchEntries();
  }, []);

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

    const entryElements = document.querySelectorAll('.entry');
    entryElements.forEach(element => observer.observe(element));

    return () => {
      entryElements.forEach(element => observer.unobserve(element));
    };
  }, [entries]);

  //filters out all unique dates of entries
  const uniqueDates = new Set<string>();
  entries.forEach(entry => {
    const date = new Date(entry.created).toISOString().split('T')[0]; // Extract date part
    uniqueDates.add(date);
  });

  return (
    <div className={styles.container}>
      <Sidebar calendar={date} visibleEntries={visibleEntries}/>
      <div className={styles.entrycontainer}>
        <div className={styles.placeholder}></div>
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