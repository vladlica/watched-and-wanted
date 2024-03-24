import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

// Props:
// - children: ReactNode - Nested components wrapped by the DarkModeProvider.
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(function () {
    // Check if the user has previously set dark mode preference
    const storedValue = localStorage.getItem("isDarkMode");
    // If preference is stored, use that, otherwise check user's system preference
    return storedValue
      ? JSON.parse(storedValue)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(
    function () {
      localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    },
    [isDarkMode]
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.style.colorScheme = "light";
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");

  return context;
}

export { DarkModeProvider, useDarkMode };
