import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-fezSmo_puNcRT9mk_hkGTaz3mDkT_wI",
  authDomain: "chithha-e7266.firebaseapp.com",
  projectId: "chithha-e7266",
  storageBucket: "chithha-e7266.appspot.com",
  messagingSenderId: "603750551023",
  appId: "1:603750551023:web:3016334052d89e8a787a1a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
