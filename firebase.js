import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

// dotenv.config();
const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API,
  apiKey: "AIzaSyD9fted5AvuRKMnemH9SvkC9Q3eVjmGZP8",
  authDomain: "mrs-bashirat-blog.firebaseapp.com",
  projectId: "mrs-bashirat-blog",
  storageBucket: "mrs-bashirat-blog.appspot.com",
  messagingSenderId: "800446835493",
  appId: "1:800446835493:web:e874a92bb9228b0142c8cc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
