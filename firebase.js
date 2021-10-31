import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCoXkAGVdlz9Ftnjq6rNyIniM4SDMuwHGM",
  authDomain: "instagram-clone-master-bb0f3.firebaseapp.com",
  projectId: "instagram-clone-master-bb0f3",
  storageBucket: "instagram-clone-master-bb0f3.appspot.com",
  messagingSenderId: "919857278527",
  appId: "1:919857278527:web:923e2a32555ab586a3528a",
  measurementId: "G-05Q3Y65LYM"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()


export { app, db, storage }