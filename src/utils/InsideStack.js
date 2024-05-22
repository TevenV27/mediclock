import React from "react";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./bottomTap";


const insideStack = createNativeStackNavigator();

export default function InsideStack() {
  return (
    
      <insideStack.Navigator initialRouteName="Home">
        <insideStack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <insideStack.Screen name="Sí" component={BottomTab} />
        <insideStack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        
      </insideStack.Navigator>
    
  );
}