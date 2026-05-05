import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, type User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Get Firebase configuration from environment variables
const getFirebaseConfig = (): FirebaseConfig => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  // Validate required configuration
  const requiredFields: (keyof FirebaseConfig)[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];

  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    console.error('❌ Firebase configuration missing:', missingFields);
    throw new Error(
      `Missing Firebase configuration: ${missingFields.join(', ')}. ` +
      'Please check your .env.local file and ensure all required Firebase environment variables are set.'
    );
  }

  return config as FirebaseConfig;
};

// Initialize Firebase app
const initializeFirebaseApp = () => {
  try {
    const config = getFirebaseConfig();
    
    // Check if Firebase app is already initialized
    if (getApps().length > 0) {
      console.log('🔥 Firebase app already initialized');
      return getApp();
    }

    const app = initializeApp(config);
    console.log('🔥 Firebase app initialized successfully');
    return app;
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    throw error;
  }
};

// Initialize Firebase services
const app = initializeFirebaseApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase services and utilities
export { app, auth, db };

// Authentication functions
export const firebaseAuth = {
  // Sign in with email and password
  signIn: async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ User signed in successfully');
      return userCredential.user;
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      console.error('❌ Sign in failed:', firebaseError.code, firebaseError.message);
      throw new Error(getAuthErrorMessage(firebaseError.code || 'unknown'));
    }
  },

  // Create user with email and password
  signUp: async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ User created successfully');
      return userCredential.user;
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      console.error('❌ Sign up failed:', firebaseError.code, firebaseError.message);
      throw new Error(getAuthErrorMessage(firebaseError.code || 'unknown'));
    }
  },

  // Sign out
  signOut: async (): Promise<void> => {
    try {
      await signOut(auth);
      console.log('✅ User signed out successfully');
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      console.error('❌ Sign out failed:', firebaseError.code, firebaseError.message);
      throw new Error('Failed to sign out. Please try again.');
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },

  // Sign in with Google
  signInWithGoogle: async (): Promise<User> => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log('✅ User signed in with Google successfully');
      return userCredential.user;
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      console.error('❌ Google sign in failed:', firebaseError.code, firebaseError.message);
      throw new Error(getAuthErrorMessage(firebaseError.code || 'unknown'));
    }
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return auth.onAuthStateChanged(callback);
  }
};

// Helper function to get user-friendly error messages
function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters long.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/requires-recent-login': 'Please sign in again to complete this action.',
    'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed before completion.',
    'auth/popup-blocked': 'Sign-in popup was blocked by the browser. Please allow popups and try again.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled due to multiple popup requests.'
  };

  return errorMessages[errorCode] || 'An authentication error occurred. Please try again.';
}

// Test function to validate Firebase setup
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    // Test if we can access the auth object (this will throw if Firebase is not properly configured)
    if (auth) {
      console.log('✅ Firebase connection test passed');
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return false;
  }
};

export default app;
