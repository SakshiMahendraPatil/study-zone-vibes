import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getDatabase, type Database } from "firebase/database";

import { getFirebaseConfig } from "./firebase-config.functions";

let appPromise: Promise<FirebaseApp> | undefined;

export async function getFirebaseApp(): Promise<FirebaseApp> {
  if (typeof window === "undefined") throw new Error("Firebase is browser-only here");
  if (!appPromise) {
    appPromise = (async () => {
      const existing = getApps();
      if (existing.length > 0) return existing[0]!;
      const config = await getFirebaseConfig();
      return initializeApp(config);
    })();
  }
  return appPromise;
}

export async function getDb(): Promise<Database> {
  return getDatabase(await getFirebaseApp());
}

export async function getAuthClient(): Promise<Auth> {
  return getAuth(await getFirebaseApp());
}

export type Lead = {
  id: string;
  name: string;
  phone: string;
  submittedAt: string;
  createdAt: number;
};

/** Save a lead into the Realtime Database at /leads */
export async function saveLead(name: string, phone: string): Promise<void> {
  const { ref, push, serverTimestamp } = await import("firebase/database");
  const db = await getDb();
  await push(ref(db, "leads"), {
    name,
    phone,
    submittedAt: new Date().toLocaleString(),
    createdAt: serverTimestamp(),
  });
}
