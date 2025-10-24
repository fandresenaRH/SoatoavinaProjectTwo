import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { ThemeContext, LanguageContext } from "../component/AppContext";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

export default function Parametre() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkMode ? "#121212" : "#f8f9fa",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#333" : "#ddd",
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: "500",
      color: isDarkMode ? "#fff" : "#000",
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 20,
      color: isDarkMode ? "#fff" : "#000",
    },
  });

  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>
        {language === "mg" ? "Fikirakirana" : "Settings"}
      </Text>
      {/* Thème */}
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Feather
            name={isDarkMode ? "moon" : "sun"}
            size={24}
            color={isDarkMode ? "#f1c40f" : "#e67e22"}
          />
          <Text style={styles.label}>
            {language === "mg" ? "Mode : " : "Theme: "}
            {isDarkMode
              ? language === "mg"
                ? "Alina"
                : "Dark"
              : language === "mg"
              ? "Andro"
              : "Light"}
          </Text>
        </View>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>
      {/* Langue */}
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <FontAwesome5
            name="language"
            size={22}
            color={isDarkMode ? "#1abc9c" : "#2980b9"}
          />
          <Text style={styles.label}>
            {language === "mg" ? "Fiteny: Malagasy" : "Language: English"}
          </Text>
        </View>
        <Switch
          value={language === "en"}
          onValueChange={(value) => setLanguage(value ? "en" : "mg")}
        />
      </View>
    </View>
  );
}
