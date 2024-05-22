import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { deleteMedicine } from '../utils/firebase/medicines';
import { ThemeContext } from '../utils/ThemeContext';
const Medicine = ({ dataMedicine, onDelete }) => {
  const [medicine, setMedicine] = useState(dataMedicine);
  const { isDarkTheme, toggleTheme, themeColors } = useContext(ThemeContext);
  useEffect(() => {
    setMedicine(dataMedicine);
    console.log("Medicine updated:", medicine);
  }, [dataMedicine]);

  return (
    <View style={[styles.container, {backgroundColor: themeColors.colors.card}]}>
      <View style={[styles.iconContainer, {backgroundColor: themeColors.colors.iconCardBackground}]}>
        <FontAwesome6 style={[{left: 2}, {color: themeColors.colors.iconCard}]} name={'capsules'} solid size={35} />
      </View>
      <View style={styles.medicineContainer}>
        <Text style={[styles.medicineName, {color: themeColors.colors.textCard}]}>{medicine.name}</Text>
        <Text style={[{ fontSize: 11 }, {color: themeColors.colors.subTextCard}]}>{medicine.description}</Text>
        <Text style={[{ fontSize: 11 }, {color: themeColors.colors.subTextCard}]}>{`Fecha inicio: ${medicine.initDate}`}</Text>
        <Text style={[{ fontSize: 11 }, {color: themeColors.colors.subTextCard}]}>{`Fecha fin: ${medicine.endDate}`}</Text>
      </View>
      <View style={{ justifyContent: 'start', height: 60, alignItems: 'center', gap: 5 }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.medicineTime, {color: themeColors.colors.textCard}]}>{medicine.time}</Text>
          <View style={{ flexDirection: 'row' , gap: 2}}>

            {
              medicine.days.map((day, index) => (
                <Text key={index} style={[{ fontSize: 9 }, {color: themeColors.colors.textCard }]}>{day}</Text>
              ))
            }
          </View>

        </View>

        <TouchableOpacity onPress={onDelete}>
          <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            <FontAwesome6 style={{color: '#8e8e8f'}} name={'trash'} solid size={25} />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  iconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    padding: 8,
    width: 60,
    height: 60,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicineContainer: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'start',


  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicineTime: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default Medicine;
