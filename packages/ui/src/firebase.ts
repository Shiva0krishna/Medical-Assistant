import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSOzLUQDq8h4XPd1JkBrSHa_E31UaVMbk",
  authDomain: "docs-editor-d252f.firebaseapp.com",
  projectId: "docs-editor-d252f",
  storageBucket: "docs-editor-d252f.appspot.com",
  messagingSenderId: "461662695066",
  appId: "1:461662695066:web:9fe09e41b4056257633923",
  measurementId: "G-RBVGZZH0VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Rename this if it conflicts
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
