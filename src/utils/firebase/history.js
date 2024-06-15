
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const addHistory = async (medicineData,type) => {
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  if (type === "create") {
    newHistory = {
      message: "Medicamento creado",
      medicine: medicineData,
      date: new Date().toISOString(),
    };
  }else if (type === "delete") {
    newHistory = {
      message: "Medicamento eliminado",
      medicine: medicineData,
      date: new Date().toISOString(),
    };
}
  try {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userDocData = userDocSnapshot.data();

      let updatedHistory = [];
      let historyCounter = userDocData.historyCounter || 0;

      
      historyCounter += 1;

      // Asignar el ID único secuencial al nuevo historial
      newHistory.id = historyCounter;

      if (Array.isArray(userDocData.history)) {
        updatedHistory = [...userDocData.history, newHistory];
      } else {
        updatedHistory = [newHistory];
      }

      await updateDoc(userDocRef, {
        history: updatedHistory,
        historyCounter: historyCounter,
      });
    } else {
      throw new Error("No hay usuario autenticado");
    }
  } catch (error) {
    throw error;
  }
};


export const getHistory = async () => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;
  
    try {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userDocData = userDocSnapshot.data();
  
        if (userDocData && userDocData.history) {
          return userDocData.history;
        } else {
          throw new Error("No se encontro historial en el documento del usuario");
        }
      } else {
        throw new Error("No hay usuario autenticado");
      }
    } catch (error) {
      throw error;
    }
  };

  export const deleteHistory = async (historyId) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;
  
    try {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userDocData = userDocSnapshot.data();
  
        if (userDocData && userDocData.history) {
          const updatedHistory = userDocData.history.filter(
            (his) => his.id !== historyId
          );
  
          await updateDoc(userDocRef, { history: updatedHistory});
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