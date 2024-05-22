import {
  Text,
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import { getUser } from "../utils/firebase/user";

export default function Profile() {
  const [user, setUser] = useState(null);
  const handleEditPress = () => {
    // Handle what happens when "Edit" is pressed (navigation, etc.)
    console.log("Edit button pressed"); // Example placeholder
  };

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
        <Image
          source={{ uri: "https://i.imgur.com/t3n532j.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>{user?.name}</Text>
        <Text style={styles.infoText}>
          22 year old dev from the Country Side
        </Text>
        {/* Access user.metadata.creationTime instead */}
        <Text style={styles.infoText}>
          Activo desde{" "}
          {user?.metadata?.creationTime
            ? new Date(user.metadata.creationTime).toLocaleDateString()
            : "No creation time data"}
        </Text>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.infoSectionTitle}>
          <Text style={{ ...styles.infoSectionTitle, opacity: 0.9 }}>
            Información personal
          </Text>
          <TouchableOpacity onPress={handleEditPress}>
            <FontAwesome6 name="edit" size={24} color="#525fe1" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Entypo name="email" size={24} color="#525fe1" />
            <Text style={{ ...styles.infoDetails, opacity: 0.6 }}>Email</Text>
          </View>
          <Text style={styles.infoDetails}>{user?.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <FontAwesome name="phone" size={24} color="#525fe1" />
            <Text style={{ ...styles.infoDetails, opacity: 0.6 }}>
              {" "}
              Teléfono
            </Text>
          </View>

          <Text style={styles.infoDetails}>{user?.metadata.phoneNumber}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="location-outline" size={24} color="#525fe1" />
            <Text style={{ ...styles.infoDetails, opacity: 0.6 }}>
              Ubicación
            </Text>
          </View>
          <Text style={styles.infoDetails}>Colombia</Text>
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
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },
  infoText: {
    fontSize: 20,
    marginTop: 10,
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  infoSectionTitle: {
    fontSize: 23,
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

    // Agregar padding horizontal
  },

  infoIcon: {
    flexDirection: "row",
    alignItems: "center",

    // Agregar padding horizontal
  },

  infoDetails: {
    marginLeft: 15,
    fontSize: 20,
  },
});
