import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAukZAUR_0D47xfaBLrvFbRdUtkawUxhzM",
  authDomain: "restaurant-app-677a8.firebaseapp.com",
  databaseURL: "https://restaurant-app-677a8-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-677a8",
  storageBucket: "restaurant-app-677a8.appspot.com",
  messagingSenderId: "257765493364",
  appId: "1:257765493364:web:2153891ee64a134773df21",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };
