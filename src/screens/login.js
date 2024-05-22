import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import handleNavigation from "../utils/handleNavigation";
import { login } from "../utils/firebase/user";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      alert("Se inicio sesion");
    } catch (error) {
      // Mostrar alerta de error
      alert("Error al iniciar sesion " + error.message);
    }
  };

  return (
    <View style={styles.conteiner}>
      <Image
        source={require("../../assets/health.png")}
        style={styles.profile}
      />

      <View style={styles.card}>
        <View style={styles.boxText}>
          <TextInput
            placeholder="Correo electrónico"
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setEmail(text)}
            
          />
        </View>

        <View style={styles.boxText}>
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={true}
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View style={styles.conteinerButton}>
          <TouchableOpacity
            style={styles.boxButton}
            onPress={() => handleLogin(email, password)}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => handleNavigation(navigation, "SignIn")}
          >
            <Text style={styles.registerLink}> Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  profile: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderColor: "white",
  },
  card: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 5,
    width: "90%",
    padding: 20,
    
  },
  boxText: {
    paddingVertical: 10,
    backgroundColor: "#cccccc40",
    borderRadius: 5,
    marginVertical: 10,
  },
  conteinerButton: {
    alignItems: "center",
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

  line: {
    borderBottomColor: "#00000040",
    borderBottomWidth: 1,
    marginTop: 30, // Espacio vertical opcional entre la línea y otros elementos
  },

  registerContainer: {
    flexDirection: "row", // Para alinear horizontalmente el texto y el enlace
    alignItems: "center", // Para centrar verticalmente el texto y el enlace
    justifyContent: "center", // Para centrar horizontalmente el texto y el enlace
    marginTop: 20, // Espacio entre la línea y el contenedor de "Regístrate"
  },
  registerText: {
    marginRight: 5, // Espacio entre el texto "¿No tienes una cuenta?" y el enlace "Regístrate"
  },
  registerLink: {
    color: "#0080ff", // Color del enlace
  },
});
