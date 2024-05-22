//src/utils/firebase/user.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const createUser = async (name, email, password) => {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  try {
    // Crear el usuario en Firebase Authentication
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;

    const newUser = {
      name: name,
      email: email,
      medicine: []
    };

    // Guardar datos adicionales del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), newUser);
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  const auth = FIREBASE_AUTH;
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid } = user; 

        try {
          const userDoc = await getDoc(doc(FIREBASE_DB, "users", uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const combinedData = { ...user, ...userData };
            resolve(combinedData);
          } else {
            console.warn("User document not found for UID:", uid);
            resolve(user); 
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
    }, (error) => {
      reject(error);
    });
  });
};

