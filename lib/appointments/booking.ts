import { getFirebaseApp } from "@/lib/firebase/clientApp";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const COLLECTION_NAME = "yakelineAppointments";

export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message?: string;
}

export interface AppointmentRecord extends AppointmentData {
  id: string;
  createdAt: unknown;
  status: string;
}

export const bookAppointment = async (
  data: AppointmentData
): Promise<string> => {
  if (!data.name || !data.email || !data.phone || !data.date || !data.time) {
    throw new Error("Todos los campos obligatorios son requeridos.");
  }

  const app = getFirebaseApp();
  const db = getFirestore(app);

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

export const getAppointmentsByDate = async (
  date: string
): Promise<AppointmentRecord[]> => {
  const app = getFirebaseApp();
  const db = getFirestore(app);

  const q = query(
    collection(db, COLLECTION_NAME),
    where("date", "==", date),
    where("status", "!=", "cancelled")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AppointmentRecord[];
};
