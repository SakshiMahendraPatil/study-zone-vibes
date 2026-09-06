import { createServerFn } from "@tanstack/react-start";

/**
 * Firebase web config. The API key is a *publishable* client key, but it is
 * stored as a project secret, so it is handed to the browser at runtime.
 */
export const getFirebaseConfig = createServerFn({ method: "GET" }).handler(async () => {
  return {
    apiKey: (process.env["GOOGLE_API_KEY"] ?? "").trim(),
    authDomain: "tudy-room.firebaseapp.com",
    databaseURL: "https://tudy-room-default-rtdb.firebaseio.com",
    projectId: "tudy-room",
    storageBucket: "tudy-room.firebasestorage.app",
    messagingSenderId: "439622490961",
    appId: "1:439622490961:web:9657ba3e06240fb5f65170",
    measurementId: "G-1GMQ4SNX8K",
  };
});
