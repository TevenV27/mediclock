// src/utils/BottomTab.js
import React, { useContext } from 'react';
import { FIREBASE_AUTH } from '../../firebase-config';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Summary from '../screens/Summary';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewMedicine from '../screens/NewMedicine';
import Notifications from '../screens/Notifications';
import { ThemeContext } from '../utils/ThemeContext';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, themeColors }) => (
  <TouchableOpacity
    style={{
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 47,
        height: 47,
        borderRadius: 4,
        backgroundColor: themeColors.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export default function BottomTab() {
  const { isDarkTheme, toggleTheme, themeColors } = useContext(ThemeContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{
          headerShown: true,
          headerTitle: 'Mediclock',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: themeColors.colors.topbar,
          },
          headerTintColor: themeColors.colors.topbarText,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={toggleTheme}>
              <FontAwesome6
                style={{ color: themeColors.colors.topbarText}}
                name={isDarkTheme ? 'sun' : 'moon'}
                solid
                size={25}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => FIREBASE_AUTH.signOut()}
            >
              <Text>
                <FontAwesome6
                  style={{ color: themeColors.colors.topbarText}}
                  name={'right-to-bracket'}
                  solid
                  size={25}
                />
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  const { themeColors } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: themeColors.colors.primary,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: themeColors.colors.bottombar,
        },
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: 'timing',
            config: {
              duration: 100,
            },
          },
          hide: {
            animation: 'timing',
            config: {
              duration: 100,
            },
          },
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'briefcase-medical';
            size = 28;
          } else if (route.name === 'Summary') {
            iconName = 'book-medical';
            size = 25;
          } else if (route.name === 'Profile') {
            iconName = 'user';
            size = 26;
          } else if (route.name === 'Notifications') {
            iconName = 'bell';
            size = 26;
          }

          return <FontAwesome6 name={iconName} size={size} color={color} solid />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Summary" component={Summary} options={{ headerShown: false }} />
      <Tab.Screen
        name="NewMedicine"
        component={NewMedicine}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              themeColors={themeColors}
              onPress={() => navigation.navigate('NewMedicine')}
            >
              <FontAwesome6 name={'notes-medical'} size={25} color="white" />
            </CustomTabBarButton>
          ),
        })}
      />
      <Tab.Screen name="Notifications" component={Notifications} options={{ headerShown: false, tabBarBadge: null }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
