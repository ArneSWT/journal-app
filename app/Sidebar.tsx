
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

interface CalendarProps {
  id: string;
  text: string;
  created: string;
}

interface SidebarProps {
  calendar: CalendarProps[];
}

//returns just the day of the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric'
  }).format(date);
};


const Sidebar: React.FC<SidebarProps> = ({calendar}) => {
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => new Date(currentYear, i, 1));

  // filtering non-unique dates, so days with 
  // entries can be highlighted in the calendar view
  const uniqueDates = new Set<string>();
  const filteredCalendar = calendar.filter(item => {
    const formattedDate = formatDate(item.created);
    if (uniqueDates.has(formattedDate)) {
      return false;
    }
    uniqueDates.add(formattedDate);
    return true;
  });
/*
  return (
    <div className={styles.sidebar}>
      {filteredCalendar.map((item, index) => (
        <div key={index}>{formatDate(item.created)}</div>
      ))}
    </div>
  );
*/
  return (
    <div className={styles.sidebar}>
      <div className={styles.calendar_container}>
        {months.slice().reverse().map((month, monthIndex) => (
          <div key={monthIndex}>
            <div className={`${styles.month} ${styles.sticky}`}>{
              month.toLocaleString('default', { month: 'long' })}
            </div>
            {Array.from({ length: new Date(currentYear, monthIndex + 1, 0).getDate() }, (_, dayIndex) => (
              <div key={dayIndex} className={styles.day}>{dayIndex + 1}</div>
            ))}
          </div> 
        ))}
      </div>
    </div>
  );
};

export default Sidebar;