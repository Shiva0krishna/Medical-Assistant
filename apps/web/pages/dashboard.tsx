import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../../packages/ui/src/firebase"; // Adjust the import path accordingly
import { onAuthStateChanged, User } from "firebase/auth";
import { Button } from "@repo/ui/button";  // Assuming the Button component is in this path
import styles from './dashboard.module.css';

const Dashboard: React.FC = () => {
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
     <div className={styles.page}>
      <main className={styles.main}>
        <Button appName="dashboard" className={styles.secondary}>
          Sign Out
        </Button>
        <button onClick={handlesendapi}> Chat with MEdical Assitant</button>
      </main>
    </div>

  );
};

export default Dashboard;
