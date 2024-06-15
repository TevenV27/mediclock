//src/screens/Home.js
import React, { useState, useCallback, useContext } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import Medicine from "../components/MedicineCard";
import { getMedicines, deleteMedicine } from "../utils/firebase/medicines";
import { addHistory } from "../utils/firebase/history";
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../utils/ThemeContext';

export default function Home({ navigation }) {
  const { isDarkTheme, toggleTheme, themeColors } = useContext(ThemeContext);
  const [medicines, setMedicines] = useState([]);

  const fetchMedicines = async () => {
    try {
      const meds = await getMedicines();
      setMedicines(meds || []); // Handle case where `meds` is undefined
      console.log("Medicines:", meds);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMedicines();
    }, [])
  );
  const handleDeleteMedicine = async (medicine) => {

    console.log("Deleting medicine with ID:", medicine.id);
    try {
      await deleteMedicine(medicine.id);
      await addHistory(medicine,'delete');
      await fetchMedicines();
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  return (
    <View style={{flex: 1, padding: 15, }}>
      <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: 'bold', color: themeColors.colors.text }}>Medicamentos registrados</Text>
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Medicine dataMedicine={item} onDelete={() => handleDeleteMedicine(item)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
