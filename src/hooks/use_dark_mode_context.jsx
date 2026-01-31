import { useContext } from "react";
import { DarkModeContext } from "../context/dark_mode_context";

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("User Context must be used within a UserContextProvider");
  }

  return context;
};
