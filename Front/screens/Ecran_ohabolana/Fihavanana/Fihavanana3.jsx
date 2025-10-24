import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext, LanguageContext } from "../../../component/AppContext";
import { Feather } from "@expo/vector-icons";

export default function Fihavanana3() {
  // mode nuit et jour
  const { isDarkMode } = useContext(ThemeContext);
  // malagasy/anglais
  const { language } = useContext(LanguageContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    },
    text: {
      fontSize: 22,
      fontWeight: "600",
      color: isDarkMode ? "#ffffff" : "#000000",
      marginTop: 15,
    },
  });

  return (
    <View style={styles.container}>
      <Feather
        name={isDarkMode ? "moon" : "sun"}
        size={40}
        color={isDarkMode ? "#f1c40f" : "#e67e22"}
      />
      <Text style={styles.text}>
        {language === "mg"
          ? "Tongasoa eto amin'ny pejy fandraisana"
          : "Welcome to the Home Page"}
      </Text>
    </View>
  );
}
