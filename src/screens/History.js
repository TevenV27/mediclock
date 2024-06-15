import React, { useState, useCallback, useContext } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import HistoryCard from "../components/HistoryCard";
import { getHistory, deleteHistory } from "../utils/firebase/history";
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../utils/ThemeContext';

export default function History({ navigation }) {
  const { isDarkTheme, toggleTheme, themeColors } = useContext(ThemeContext);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const hist = await getHistory();
      setHistory(hist || []); // Handle case where `meds` is undefined
      console.log("Medicines:", hist);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );
  const handleDeleteHistory = async (historyId) => {
    console.log("Deleting historu with ID:", historyId);
    try {
      await deleteHistory(historyId);
      await fetchHistory();
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  return (
    <View style={{flex: 1, padding: 15, }}>
      <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: 'bold', color: themeColors.colors.text }}>Historial</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard historyData={item} onDelete={() => handleDeleteHistory(item.id)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
});
