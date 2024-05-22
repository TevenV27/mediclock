//src/utils/firebase/medicine.js

import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const addMedicine = async (newMedicine) => {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  try {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userDocData = userDocSnapshot.data();

      let updatedMedicines = [];
      let medicineCounter = userDocData.medicineCounter || 0;

      // Incrementar el contador de medicinas
      medicineCounter += 1;

      // Asignar el ID único secuencial a la nueva medicina
      newMedicine.id = medicineCounter;

      if (Array.isArray(userDocData.medicine)) {
        updatedMedicines = [...userDocData.medicine, newMedicine];
      } else {
        updatedMedicines = [newMedicine];
      }

      await updateDoc(userDocRef, {
        medicine: updatedMedicines,
        medicineCounter: medicineCounter,
      });
    } else {
      throw new Error("No hay usuario autenticado");
    }
  } catch (error) {
    throw error;
  }
};

export const getMedicines = async () => {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  try {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userDocData = userDocSnapshot.data();

      if (userDocData && userDocData.medicine) {
        return userDocData.medicine;
      } else {
        throw new Error("No se encontraron medicinas en el documento del usuario");
      }
    } else {
      throw new Error("No hay usuario autenticado");
    }
  } catch (error) {
    throw error;
  }
};

export const deleteMedicine = async (medicineId) => {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  try {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userDocData = userDocSnapshot.data();

      if (userDocData && userDocData.medicine) {
        const updatedMedicines = userDocData.medicine.filter(
          (med) => med.id !== medicineId
        );

        await updateDoc(userDocRef, { medicine: updatedMedicines });
      } else {
        throw new Error("No se encontraron medicinas en el documento del usuario");
      }
    } else {
      throw new Error("No hay usuario autenticado");
    }
  } catch (error) {
    throw error;
  }
};
