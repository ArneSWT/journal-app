import React from 'react';
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
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.test}>Sidebar</h1>
      {calendar.map((item, index) => (
        <div key={index}>{formatDate(item.created)}</div>
      ))}
    </div>
  );
};

export default Sidebar;