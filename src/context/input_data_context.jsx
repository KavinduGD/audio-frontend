import admin_axios from "../base_url";
import { createContext, useEffect, useReducer } from "react";
import colors from "../assets/colors";

export const InputDataContext = createContext();

const inputDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT_DATA":
      return { input_data: action.payload };
    case "ADD_INPUT_DATA":
      const existingIndex = state.input_data.findIndex(
        (input_data) => input_data.name === action.payload.name
      );
      if (existingIndex !== -1) {
        // Update existing class data if found
        const updatedInputData = [...state.input_data];

        updatedInputData[existingIndex] = action.payload;
        return { input_data: updatedInputData };
      } else {
        // Add new class data if not found
        return {
          input_data: [
            ...state.input_data,
            {
              ...action.payload,

              fill: colors[parseInt(state.input_data.length % colors.length)],
            },
          ],
        };
      }

    case "DELETE_INPUT_DATA":
      return {
        input_data: state.input_data.filter(
          (input_data) => !action.payload.includes(input_data.name)
        ),
      };
    case "UPDATE_INPUT_DATA":
      return state.map((input_data) =>
        input_data.id === action.payload.id ? action.payload : input_data
      );
    default:
      return state;
  }
};

export const InputDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inputDataReducer, { input_data: [] });

  useEffect(() => {
    const getInputData = async () => {
      try {
        const response = await admin_axios.get(
          "api/input-data/get-all-class-count"
        );

        const classes = response.data.classes;

        const input_data = Object.keys(classes);

        const xxx = input_data.map((key, index) => ({
          name: key,
          count: classes[key],
          fill: colors[parseInt(index % colors.length)],
        }));

        dispatch({ type: "SET_INPUT_DATA", payload: xxx });
      } catch (error) {
        console.log(error);
      }
    };
    getInputData();
  }, []);

  return (
    <InputDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InputDataContext.Provider>
  );
};
