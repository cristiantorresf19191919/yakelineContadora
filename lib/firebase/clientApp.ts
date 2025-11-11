import {
  initializeApp,
  getApps,
  FirebaseApp,
  FirebaseOptions,
} from "firebase/app";

type FirebaseConfig = {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId?: string | undefined;
};

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const isBrowser = typeof window !== "undefined";

const ensureConfig = () => {
  const requiredKeys: Array<keyof FirebaseConfig> = [
    "apiKey",
    "authDomain",
    "projectId",
    "appId",
  ];

  for (const key of requiredKeys) {
    if (!firebaseConfig[key]) {
      throw new Error(
        `Missing Firebase configuration value for "${key}". Update your environment variables to enable newsletter subscriptions.`
      );
    }
  }
};

let firebaseApp: FirebaseApp | null = null;

export const getFirebaseApp = (): FirebaseApp => {
  if (!isBrowser) {
    throw new Error(
      "Attempted to initialize Firebase outside the browser. Ensure Firebase-dependent code runs client-side."
    );
  }

  if (firebaseApp) {
    return firebaseApp;
  }

  if (!getApps().length) {
    ensureConfig();
    firebaseApp = initializeApp(firebaseConfig as FirebaseOptions);
    return firebaseApp;
  }

  firebaseApp = getApps()[0]!;
  return firebaseApp;
};

