// Firebase config and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// IMPORTANT: Replace the values below with your real Firebase project credentials.
// Get these from Firebase Console > Project Settings > General > Your apps (Web app)
const firebaseConfig = {
  apiKey: 'AIzaSyDB91c6qRdqfKmVpNoqwJYX7JxJalVntfw',
  authDomain: 'authentication-api-cb0fa.firebaseapp.com',
  projectId: 'authentication-api-cb0fa',
  appId: '1:936818100308:web:7afdca6305efa7ab2e45c1',
  databaseURL: 'https://authentication-api-cb0fa-default-rtdb.asia-southeast1.firebasedatabase.app', // <-- Add this line
  // ...other fields if needed
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Export the Realtime Database instance
import { getDatabase } from 'firebase/database';
export const db = getDatabase(app);
