
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

interface CalendarProps {
  id: string;
  text: string;
  created: string;
}

interface SidebarProps {
  calendar: CalendarProps[];
  visibleEntries: Set<string>;
}

//returns just the day of the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric'
  }).format(date);
};


const Sidebar: React.FC<SidebarProps> = ({calendar, visibleEntries}) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();

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

  // Extract dates from visible entries
  const visibleDates = new Set<string>();
  visibleEntries.forEach(id => {
    const entry = calendar.find(entry => entry.id === id);
    if (entry) {
      const date = new Date(entry.created).toISOString().split('T')[0];
      visibleDates.add(date);
    }
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
      <div className={styles.placeholder}></div>
      {months.slice(0, currentMonth + 1).reverse().map((month, monthIndex) => (
        <div key={monthIndex} className={styles.month_container}>
          <div className={styles.sticky}>
            <p className={styles.month}>
              {month.toLocaleString('default', { month: 'long' })}
            </p>
            <p className={styles.year}>{currentYear}</p>
          </div>
          <div className={styles.days_container}>
          {Array.from({ length: monthIndex === 0 ? currentDate : new Date(currentYear, currentMonth - monthIndex + 1, 0).getDate() }, (_, dayIndex) => {
            const day = dayIndex;
            const date = new Date(currentYear, currentMonth - monthIndex, day + 1).toLocaleDateString('en-CA'); // Adjusted to use toLocaleDateString
            const isVisible = visibleDates.has(date);
            return (
              <p key={dayIndex} className={`${styles.day} ${isVisible ? styles.highlight : ''}`}>
                {day + 1}
              </p>
            );
          })}
        </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Sidebar;