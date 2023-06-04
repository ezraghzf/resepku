import {
  Provider as PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Main from "./app/Main";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { useColorScheme } from "react-native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

export default function App() {
  const theme = useColorScheme();
  const colorTheme =
    theme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;
  return (
    <PaperProvider theme={colorTheme}>
      <NavigationContainer theme={colorTheme}>
        <Main />
      </NavigationContainer>
    </PaperProvider>
  );
}
