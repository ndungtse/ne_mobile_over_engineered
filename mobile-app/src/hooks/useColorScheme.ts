import { useState } from "react";
import {
  ColorSchemeName,
  useColorScheme as useNativeColorScheme,
} from "react-native";

export const useColorScheme = (defaultValue?: ColorSchemeName) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    defaultValue ?? useNativeColorScheme() ?? "light"
  );

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return { colorScheme, setColorScheme, toggleColorScheme };
};

export default useColorScheme;
