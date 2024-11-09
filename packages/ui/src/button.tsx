"use client";

import { ReactNode } from "react";
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { useRouter } from "next/navigation";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');  // Redirect to dashboard after successful sign-in
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');  // Redirect to homepage after sign-out
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <button
      className={className}
      onClick={appName === "web" ? handleSignIn : handleSignOut}
    >
      {children}
    </button>
  );
};
