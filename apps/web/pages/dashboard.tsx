 import React, { useState ,useEffect} from 'react';
import styles from './dashboard.module.css';
import { Button } from '@repo/ui/button';
import { useRouter } from 'next/router';
import { auth } from "../../../packages/ui/src/firebase"; // Adjust the import path accordingly
import { onAuthStateChanged, User } from "firebase/auth";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // User is signed in, proceed to dashboard
        setLoading(false);
      } else {
        // No user, redirect to sign-in page
        setLoading(false);
        router.push("/"); // Make sure to stop loading here as well
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handlesendapi = async () =>{
    router.push('/chatPage')
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Medical Assistant Dashboard</h1>
          <Button  appName="dashboard" className={styles.outlineButton}>
            <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Welcome to Your Medical Dashboard</h2>
            <p className={styles.cardSubtitle}>
              Get started with your medical consultation by clicking the button below.
            </p>
          </div>

          <div className={styles.buttonContainer}>
            <button  onClick={handlesendapi} className={styles.primaryButton}>
              <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Start Medical Consultation
            </button>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <h3 className={styles.featureTitle}>24/7 Availability</h3>
              <p className={styles.featureText}>Access medical assistance anytime, anywhere.</p>
            </div>

            <div className={styles.featureCard}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <h3 className={styles.featureTitle}>Secure Conversations</h3>
              <p className={styles.featureText}>Your medical data is protected and encrypted.</p>
            </div>

            <div className={styles.featureCard}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <h3 className={styles.featureTitle}>Expert Guidance</h3>
              <p className={styles.featureText}>Get reliable medical information and support.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          © {new Date().getFullYear()} Medical Assistant. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;