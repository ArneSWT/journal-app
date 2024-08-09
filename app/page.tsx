import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
      <main className={styles.container}>
        <div className={styles.sidebar}>
        <p> Write something... </p>
        </div>
        <div className={styles.content}>
          <p> Write something... </p>
        </div>
        
      </main>
  );
}
