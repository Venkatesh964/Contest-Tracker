import { createContext, useState } from "react";

type themeUpdate = () => void;

//@ts-ignore
export const ThemeContext = createContext();
export const UpdateThemeContext = createContext<themeUpdate>(() => {});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme((theme) => !theme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
      {/* <UpdateThemeContext value={toggleTheme}>{children}</UpdateThemeContext> */}
    </ThemeContext.Provider>
  );
};
