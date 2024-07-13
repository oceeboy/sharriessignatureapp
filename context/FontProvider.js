import React, { createContext, useContext, useEffect, useState } from "react";
import * as Font from "expo-font";
import { ActivityIndicator, View } from "react-native";

const FontContext = createContext();

export const useFontsLoaded = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-BlackItalic": require("../assets/fonts/Poppins-BlackItalic.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-BoldItalic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraBoldItalic": require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-ExtraLightItalic": require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
        "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-LightItalic": require("../assets/fonts/Poppins-LightItalic.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-MediumItalic": require("../assets/fonts/Poppins-MediumItalic.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-SemiBoldItalic": require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
        "Poppins-ThinItalic": require("../assets/fonts/Poppins-ThinItalic.ttf"),
        "Lora-Bold": require("../assets/fonts/Lora-Bold.ttf"),
        "Lora-BoldItalic": require("../assets/fonts/Lora-BoldItalic.ttf"),
        "Lora-Italic-VariableFont_wght": require("../assets/fonts/Lora-Italic-VariableFont_wght.ttf"),
        "Lora-Italic": require("../assets/fonts/Lora-Italic.ttf"),
        "Lora-Medium": require("../assets/fonts/Lora-Medium.ttf"),
        "Lora-MediumItalic": require("../assets/fonts/Lora-MediumItalic.ttf"),
        "Lora-Regular": require("../assets/fonts/Lora-Regular.ttf"),
        "Lora-SemiBold": require("../assets/fonts/Lora-SemiBold.ttf"),
        "Lora-SemiBoldItalic": require("../assets/fonts/Lora-SemiBoldItalic.ttf"),
        "Lora-VariableFont_wght": require("../assets/fonts/Lora-VariableFont_wght.ttf"),
        "Redressed-Regular": require("../assets/fonts/Redressed-Regular.ttf"),
        "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FontContext.Provider value={fontsLoaded}>{children}</FontContext.Provider>
  );
};
