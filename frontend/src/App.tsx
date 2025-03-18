import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Appbar } from "./components/Appbar";
import { Contests } from "./components/Contests";
import { ThemeContext, ThemeProvider } from "./context/theme";
import { useContext } from "react";
import { MainLayout } from "./pages/MainLayout";

function App() {
  // const darkTheme = useContext(ThemeContext);
  const { isDarkMode, toggleColorMode } = useContext(ThemeContext);
  // const toggleTheme = useContext(UpdateThemeContext);
  console.log("from dark ", isDarkMode);

  console.log("dark mode in app", isDarkMode);
  // console.log(toggleTheme);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
