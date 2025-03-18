import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Appbar } from "./components/Appbar";
import { Contests } from "./components/Contests";
import { ThemeContext, ThemeProvider } from "./context/theme";
import { useContext } from "react";

function App() {
  const darkTheme = useContext(ThemeContext);
  // const toggleTheme = useContext(UpdateThemeContext);

  // console.log(toggleTheme);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className={`${darkTheme ? "bg-black" : "bg-white"}`}>
                <Appbar />
                <Contests />
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
