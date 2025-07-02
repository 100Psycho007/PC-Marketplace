import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvZET5hYRadlY_ptlm-VMTmxjQw6reAZU",
  authDomain: "pc-marketplace-87f6d.firebaseapp.com",
  projectId: "pc-marketplace-87f6d",
  storageBucket: "pc-marketplace-87f6d.appspot.com",
  messagingSenderId: "773699358884",
  appId: "1:773699358884:web:b8da06b909ba95a537d631",
  measurementId: "G-TJ3GLS6V1P"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app); 