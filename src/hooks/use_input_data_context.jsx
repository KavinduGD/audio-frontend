import { useContext } from "react";
import { InputDataContext } from "../context/input_data_context";

export const useInputDataContext = () => {
  const context = useContext(InputDataContext);

  if (!context) {
    throw new Error("User Context must be used within a UserContextProvider");
  }

  return context;
};
