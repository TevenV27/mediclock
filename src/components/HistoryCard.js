import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ThemeContext } from '../utils/ThemeContext';

const HistoryCard = ({ historyData, onDelete }) => {
  const [history, setHistory] = useState(historyData);
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('');
  const { isDarkTheme, toggleTheme, themeColors } = useContext(ThemeContext);
  useEffect(() => {
    setHistory(historyData);
    if(history.message === 'Medicamento eliminado'){
        setColor('#B11515');
        setIcon('minus');
      }else{
        setColor('12A30B');
        setIcon('plus');
      }
    console.log("Medicine updated:", history);
  }, [historyData]);

  


  return (
    <View style={[styles.container, {backgroundColor: themeColors.colors.card}]}>
      <View style={[styles.iconContainer, {backgroundColor: themeColors.colors.iconCardBackground}]}>
        <FontAwesome6 style={[{left: 2}, {color: themeColors.colors.iconCard}]} name={icon} solid size={35} />
      </View>
      <View style={styles.medicineContainer}>
        <Text style={[styles.medicineName, {color: themeColors.colors.textCard}]}>{history.message}</Text>
        <Text style={[{ fontSize: 11 }, {color: themeColors.colors.subTextCard}]}>{history.date}</Text>
        <Text style={[{ fontSize: 11 }, {color: themeColors.colors.subTextCard}]}>{`Medicamento: ${history.medicine.name}`}</Text>
        <Text style={[{ fontSize: 11 }, {color: themeColors.colors.subTextCard}]}>{`Descripcion: ${history.medicine.description}`}</Text>
      </View>
      <View style={{ justifyContent: 'center', height: 60,width:50, alignItems: 'center', gap: 5 }}>
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

export default HistoryCard;
