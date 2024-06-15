// Import the functions you need from the SDKs you need
import { getReactNativePersistence  } from "firebase/auth";
import { initializeApp  } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRrseL8_16b4x3lChNI2Dv6fOemREg7pw",
  authDomain: "mediclock-1403f.firebaseapp.com",
  projectId: "mediclock-1403f",
  storageBucket: "mediclock-1403f.appspot.com",
  messagingSenderId: "131673253485",
  appId: "1:131673253485:web:b3b7754d2ff0589ebd4164",
  measurementId: "G-Q2FR0P58KQ"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
