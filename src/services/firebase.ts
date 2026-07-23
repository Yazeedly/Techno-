import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Read config from firebase-applet-config.json if available
let firebaseConfig: any = {
  projectId: "gen-lang-client-0325037411",
  appId: "1:1028613451421:web:8a7fdcca808bfd7abb2e74",
  apiKey: "AIzaSyCGn3HeDMyqwL1TgEJDxLDfiMoQ69JRjEE",
  authDomain: "gen-lang-client-0325037411.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-25567995-baa0-46cb-a881-94c00b3ca5a5",
  storageBucket: "gen-lang-client-0325037411.firebasestorage.app",
  messagingSenderId: "1028613451421",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with specific database ID if available
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

export default app;
