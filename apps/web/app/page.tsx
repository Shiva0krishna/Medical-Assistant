 "use client";

import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
             Revolutionize Your Health Journey
            <span className={styles.logoGroup}>
              <span className={styles.logoCircle1}></span>
              <span className={styles.logoCircle2}></span>
            </span>
             with MedAssist AI; Your
          </h1>
          <h2 className={styles.subtitle}>
            Personal Guide to Smarter, Healthier Living.
          </h2>
          
          <p className={styles.description}>
            Interact through our intuitive chat interface to get real-time guidance, symptom analysis, and health insights powered by advanced AI models.
          </p>

          <div className={styles.ctas}>
            <Button appName="web" className={styles.secondary}>
              Sign in
            </Button>
          </div>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <a href="#" className={styles.footerLink}>Documentation</a>
        <a href="#" className={styles.footerLink}>Community</a>
        <a href="#" className={styles.footerLink}>Support</a>
      </footer>
    </div>
  );
}