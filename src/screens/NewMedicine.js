// src/screens/NewMedicine.js
import React, { useState, useCallback, useContext} from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addMedicine } from "../utils/firebase/medicines";
import { addHistory } from "../utils/firebase/history";
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../utils/ThemeContext';

export default function NewMedicine() {
  const [medicine, setMedicine] = useState({
    name: "",
    time: "",
    quantity: "",
    description: "",
    days: [],
    initDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
  });

  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPickerTime, setShowPickerTime] = useState(false);
  const { isDarkTheme, toggleTheme, themeColors } = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Resetear el estado cuando el componente se desenfoca
        setMedicine({
          name: "",
          time: "",
          quantity: "",
          description: "",
          days: [],
          initDate: new Date().toLocaleDateString(),
          endDate: new Date().toLocaleDateString(),
        });
      };
    }, [])
  );

  const toggleDataPicker1 = () => {
    setShowPicker1(!showPicker1);
  };
  const toggleDataPicker2 = () => {
    setShowPicker2(!showPicker2);
  };
  const toggleDataPickerTime = () => {
    setShowPickerTime(!showPickerTime);
  };

  const onChangeDataPicker1 = (event, selectedDate) => {
    if (event.type === "set") {
      toggleDataPicker1();

      const currentDate = selectedDate || new Date();
      setMedicine((prevMedicine) => ({
        ...prevMedicine,
        initDate: currentDate.toLocaleDateString(),
      }));
    } else {
      toggleDataPicker1();
    }
  };

  const onChangeDataPicker2 = (event, selectedDate) => {
    if (event.type === "set") {
      toggleDataPicker2();

      const currentDate = selectedDate || new Date();
      setMedicine((prevMedicine) => ({
        ...prevMedicine,
        endDate: currentDate.toLocaleDateString(),
      }));
    } else {
      toggleDataPicker2();
    }
  };

  const onChangeDataPickerTime = (event, selectedTime) => {
    if (event.type === "set") {
      toggleDataPickerTime();

      const currentTime = selectedTime || new Date();
      setMedicine((prevMedicine) => ({
        ...prevMedicine,
        time: currentTime.toLocaleTimeString(),
      }));
    } else {
      toggleDataPickerTime();
    }
  };

  const handleMedicineChange = (key, value) => {
    setMedicine((prevMedicine) => ({
      ...prevMedicine,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const { name, time, quantity, description, days, initDate, endDate } = medicine;
    if (!name || !time || !quantity || !description || days.length === 0 || !initDate || !endDate) {
      Alert.alert("Error", "Todos los campos son requeridos.");
      return false;
    }
    return true;
  };

  const handleCreateReport = async (med) => {
    if (!validateForm()) return;

    try {
      await addMedicine(med);
      await addHistory(med, "create")
      Alert.alert("Éxito", "Medicina Creada");
    } catch (error) {
      Alert.alert("Error", "Error al crear la medicina: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: themeColors.colors.background}]}>
      <Text style={[styles.text, {color: themeColors.colors.text}]}>Nuevo medicamento</Text>
      <View style={[styles.card]}>
        <TextInput
          placeholder="Nombre"
          placeholderTextColor={themeColors.colors.text}
          style={[styles.input, {color: themeColors.colors.text, backgroundColor: themeColors.colors.card}]}
          value={medicine.name}
          onChangeText={(text) => handleMedicineChange("name", text)}
        />
        <TextInput
          placeholder="Descripción"
          placeholderTextColor={themeColors.colors.text}
          style={[styles.input, {color: themeColors.colors.text, backgroundColor: themeColors.colors.card}]}
          value={medicine.description}
          onChangeText={(text) => handleMedicineChange("description", text)}
        />
        <TextInput
          placeholder="Cantidad"
          placeholderTextColor={themeColors.colors.text}
          style={[styles.input, {color: themeColors.colors.text, backgroundColor: themeColors.colors.card}]}
          value={medicine.quantity}
          onChangeText={(text) => handleMedicineChange("quantity", text)}
        />

        <Pressable onPress={toggleDataPickerTime}>
          <TextInput
            placeholder="Hora"
            placeholderTextColor={themeColors.colors.text}
            style={[styles.input, {color: themeColors.colors.text, backgroundColor: themeColors.colors.card}]}
            value={medicine.time}
            editable={false}
          />
        </Pressable>
        {showPickerTime && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="spinner"
            onChange={onChangeDataPickerTime}
            onDismiss={toggleDataPickerTime}
          />
        )}

        <View style={styles.datecontainer}>
          <Pressable onPress={toggleDataPicker1}>
            <TextInput
              placeholder="Fecha inicial"
              style={[styles.inputdate, {color: themeColors.colors.text, backgroundColor: themeColors.colors.card}]}
              value={medicine.initDate}
              editable={false}
            />
          </Pressable>
          {showPicker1 && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="spinner"
              onChange={onChangeDataPicker1}
              onDismiss={toggleDataPicker1}
            />
          )}

          <Pressable onPress={toggleDataPicker2}>
            <TextInput
              placeholder="Fecha final"
              style={[styles.inputdate, {color: themeColors.colors.text, backgroundColor: themeColors.colors.card}]}
              value={medicine.endDate}
              editable={false}
            />
          </Pressable>
          {showPicker2 && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="spinner"
              onChange={onChangeDataPicker2}
              onDismiss={toggleDataPicker2}
            />
          )}
        </View>

        <View style={styles.dayscontainer}>
          <Text style={[styles.inputText, {color: themeColors.colors.text}]}>Días de la semana</Text>
          <View style={styles.buttonContainer}>
            {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.typeButton, {backgroundColor: themeColors.colors.card, borderColor: themeColors.colors.border},
                  medicine.days.includes(day) && {backgroundColor: themeColors.colors.primary}
                ]}
                onPress={() => {
                  setMedicine((prevMedicine) => {
                    let days = prevMedicine.days;
                    if (days.includes(day)) {
                      days = days.filter((d) => d !== day);
                    } else {
                      days = [...days, day];
                    }
                    return {
                      ...prevMedicine,
                      days,
                    };
                  });
                }}
              >
                <Text style={[styles.inputText, {color: themeColors.colors.text}]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={[styles.boxButton, {backgroundColor: themeColors.colors.primary}]}
            onPress={() => handleCreateReport(medicine)}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  datecontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  dayscontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    padding: 20,
  },
  inputdate: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#cccccc40",
    borderRadius: 5,
    marginVertical: 10,
    width: 165,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
    color: 'white'
  },
  containerButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  boxButton: {
    backgroundColor: "#69cf00",
    borderRadius: 5,
    paddingVertical: 12,
    width: 150,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
    gap: 8,
  },
  typeButton: {
    borderRadius: 3,
    padding: 15,
    marginHorizontal: 0,
  },
  selectedButton: {
    backgroundColor: "#69cf00",
  },
});
