import { useContext } from "react";
import { PreDataContext } from "../context/pre_data_context";

export const usePreDataContext = () => {
  const context = useContext(PreDataContext);

  if (!context) {
    throw new Error("User Context must be used within a UserContextProvider");
  }

  return context;
};
