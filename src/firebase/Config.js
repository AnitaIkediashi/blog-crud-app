import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "blog-crud-app-eeeb9.firebaseapp.com",
  projectId: "blog-crud-app-eeeb9",
  storageBucket: "blog-crud-app-eeeb9.appspot.com",
  messagingSenderId: "387271712336",
  appId: "1:387271712336:web:e6eff883599326dc1e7b55",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
