import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyDhLkCaapxxgYmOeQiAdP1V1xI8e7aZqlA",
  authDomain: "worktask2-e6e75.firebaseapp.com",
  projectId: "worktask2-e6e75",
  storageBucket: "worktask2-e6e75.appspot.com",
  messagingSenderId: "869898186237",
  appId: "1:869898186237:web:7d7f1e3a8376a3cd907d94",
});

const db = getFirestore(app);

export { db, app };
