
import { DefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

export const colors = {
  DarkTheme: {
    primary: '#bf1e5a',
    secondary: '#0f1c21',
    background: '#142E37',
    topbar: '#0f1c21',
    topbarText: '#fff',
    bottombar: '#0f1c21',
    card: '#0f1c21',
    textCard: '#fff',
    subTextCard: '#ddd',
    iconCard: '#bf1e5a',
    iconCardBackground: '#f1fbff',
    text: '#fff',
    border: '#000000',
    notification: '#FF6347',
  },
  LightTheme: {
    primary: '#415DD1',
    secondary: '#bf1e5a',
    background: '#EEF2FF',
    topbar: '#415DD1',
    topbarText: '#fff',
    bottombar: '#fff',
    card: '#324952',
    textCard: '#000',
    subTextCard: '#8e8e8f',
    iconCard: '#415DD1',
    iconCardBackground: '#EEF2FF',
    card: '#FFFFFF',
    text: '#000',
    border: '#000000',
    notification: '#FF6347',
  },
};

export const CustomDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...colors.DarkTheme,
  },
};

export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors.LightTheme,
  },
};
