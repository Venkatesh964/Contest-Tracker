import React, { useContext } from "react";
import { ThemeContext } from "../context/theme";
import { Appbar } from "../components/Appbar";
import { Contests } from "../components/Contests";

export const MainLayout = () => {
  const { isDarkMode } = useContext(ThemeContext);
  console.log("from dark ", isDarkMode);

  return (
    <div
      className={`${
        isDarkMode ? "bg-stone-900 text-white" : "bg-white text-black"
      }`}
    >
      <Appbar />
      <Contests />
    </div>
  );
};
