"use client";

import styles from "./page.module.css";
import Entry from "./Entry";
import { getEntries } from "../services/entryService";
import React from 'react';

//test

const Content: React.FC = async () => {
  const entries = await getEntries();

  return (
    <div>
      <h1>Entries</h1>
      <div className={styles.grid}>
        {entries?.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Content;