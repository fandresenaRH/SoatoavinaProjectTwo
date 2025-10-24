import React, { createContext, useState } from "react";

export const ThemeContext = createContext();
export const LanguageContext = createContext();

export const AppProvider  = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("mg"); // mg = Malagasy, en = English

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        {children}
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};
