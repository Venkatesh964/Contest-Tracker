import { useState } from "react";
import { Button } from "./Button";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const Appbar = () => {
  const [dark, setDarkTheme] = useState(false);
  const handleDarkTheme = () => {
    setDarkTheme((theme) => !theme);
  };
  return (
    <div className="border-b border-slate-300  shadow-md py-4">
      <div className="flex justify-between  max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="font-bold text-lg">Contest Tracker</div>
        </div>
        <div className="flex gap-12 items-center">
          <div className="text-blue-800 cursor-pointer">Contests</div>
          {/* <div className="cursor-pointer">Videos</div> */}
          <div className="cursor-pointer">Bookmarks</div>
          {/* <button className="border bg-blue-500 px-4 py-1.5 rounded-xl text-white  font-medium cursor-pointer">
            Contests
          </button> */}
          {/* <button className="border bg-blue-500 px-4 py-2 rounded-xl text-white font-medium cursor-pointer">
            Videos
          </button> */}
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={handleDarkTheme}
        >
          {/* <MoonSvg /> */}
          <Button
            children={"Codeforces"}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            color={"bg-green-500"}
          />
          {/* <div>
            <MoonIcon className="size-6 text-blue-500" />
          </div> */}

          {dark ? (
            <MoonIcon className="size-6" />
          ) : (
            <SunIcon className="size-6" />
          )}
        </div>
      </div>
    </div>
  );
};
