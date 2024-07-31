// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

import { getFirestore , collection } from "firebase/firestore";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { } from "./constants/Persistance/react_native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getReactNativePersistence ,initializeAuth ,getAuth } from '@firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEyh2f4GqPHv0s5rr42iEUfxR7VhNDeZA",
  authDomain: "projetpfe-ad611.firebaseapp.com",
  projectId: "projetpfe-ad611",
  storageBucket: "projetpfe-ad611.appspot.com",
  messagingSenderId: "84713085306",
  appId: "1:84713085306:web:cfa3903b10d69694059ec3",
  measurementId: "G-P6TDRKRJXK"
};

// Initialize Firebase


export const firebase_app = initializeApp(firebaseConfig);

export const auth = initializeAuth
(firebase_app, { persistence: getReactNativePersistence(AsyncStorage) });

export const db = getFirestore(firebase_app);

export const userRef =collection(db,'users');
export const roomRef =collection(db,'rooms');  //fetch data
export const ratingRef =collection(db,'rating'); 
export const SleepratingRef =collection(db,'sleeprating'); 



// const analytics = getAnalytics(firebase_app);