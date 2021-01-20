import React from "react";
import { useTranslation } from "react-i18next";

import { RiSunFill as SunIcon, RiMoonFill as MoonIcon } from "react-icons/ri";

const DarkmodeButton = () => {
  const mode = "light";

  return (
    <button
      className="rounded-md focus:outline-none"
      //   onClick={toggleMode}
      aria-label="Toggle color mode"
    >
      {mode === "dark" ? (
        <SunIcon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default DarkmodeButton;
