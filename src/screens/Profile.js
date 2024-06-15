import {
  Text,
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState, useEffect, useContext } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import { getUser } from "../utils/firebase/user";
import { ThemeContext } from '../utils/ThemeContext';

export default function Profile() {
  const [user, setUser] = useState(null);
  const { isDarkTheme, toggleTheme, themeColors } = useContext(ThemeContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const combinedUser = await getUser();
        setUser(combinedUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.basicInfo}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', gap: 10 }}>
          <Image
            source={require("../../assets/profile.png")}
            style={styles.profileImage}
          />
          <View style={{ flex: 1, justifyContent: 'start', alignItems: 'start', marginTop: -20 }}>
            <Text style={[styles.nameText, { color: themeColors.colors.text }]}>{'Nombre: ' + user?.name}</Text>
            <Text style={[styles.infoText, { color: themeColors.colors.text, opacity: 0.8 }]}>
              Edad: 22 Años
            </Text>
            <Text style={[styles.infoText, { color: themeColors.colors.text, opacity: 0.8 }]}>
              Activo desde{" "}
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "No creation time data"}
            </Text>

          </View>



        </View>

        {/* Access user.metadata.creationTime instead */}

      </View>
      <View style={styles.infoSection}>
        <View style={styles.infoSectionTitle}>
          <Text style={[styles.infoSectionTitle, { color: themeColors.colors.text }]}>
            Información personal
          </Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Entypo name="email" size={24} color={themeColors.colors.primary} />
            <Text style={[styles.infoDetails, { color: themeColors.colors.text, opacity: 0.9 }]}>Correo</Text>
          </View>
          <Text style={[styles.infoDetails, { color: themeColors.colors.text, opacity: 0.9 }]}>{user?.email}</Text>
        </View>


        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="location-outline" size={24} color={themeColors.colors.primary} />
            <Text style={[styles.infoDetails, { color: themeColors.colors.text, opacity: 0.9 }]}>
              Ubicación
            </Text>
          </View>
          <Text style={[styles.infoDetails, { color: themeColors.colors.text, opacity: 0.9 }]}>Colombia</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  basicInfo: {
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,

  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    marginTop: 10,
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  infoSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flexDirection: "row", // Make the section row-based
    justifyContent: "space-between",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    flexDirection: "row", // Make the section row-based
    justifyContent: "space-between",
  },

  infoIcon: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoDetails: {
    marginLeft: 15,
    fontSize: 14,
  },
});
