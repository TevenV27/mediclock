// src/utils/ThemeContext.js
import React, { createContext, useState } from 'react';
import { CustomDarkTheme, CustomLightTheme } from './colors/colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const themeColors = isDarkTheme ? CustomDarkTheme : CustomLightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
