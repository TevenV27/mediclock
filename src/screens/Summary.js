import { Text, StyleSheet, View, Button,TouchableOpacity, } from "react-native";
import handleNavigation from "../utils/handleNavigation";
import { FIREBASE_AUTH } from "../../firebase-config";

export default function Summary({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <View style={styles.registerContainer}>
        
        <TouchableOpacity onPress={() => handleNavigation(navigation, "Profile")}>
          <Text style={styles.registerLink}> Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
          <Text style={styles.registerLink}> Cerrar sesion</Text>
        </TouchableOpacity>
      </View>
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
