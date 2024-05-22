// App.js
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase-config';
import MyStack from './src/utils/MyStack';
import { ThemeProvider, ThemeContext } from './src/utils/ThemeContext';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <ThemeProvider>
      <ThemedApp user={user} />
    </ThemeProvider>
  );
}

function ThemedApp({ user }) {
  const { themeColors } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={themeColors}>
      <MyStack user={user} />
    </NavigationContainer>
  );
}
