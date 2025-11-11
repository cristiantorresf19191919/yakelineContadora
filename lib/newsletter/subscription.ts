import { getFirebaseApp } from "@/lib/firebase/clientApp";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const COLLECTION_NAME = "newsletterSubscribers";

export const subscribeToNewsletter = async (email: string): Promise<void> => {
  if (!email) {
    throw new Error("El correo electrónico es requerido.");
  }

  const app = getFirebaseApp();
  const db = getFirestore(app);

  await addDoc(collection(db, COLLECTION_NAME), {
    email,
    subscribedAt: serverTimestamp(),
  });
};

