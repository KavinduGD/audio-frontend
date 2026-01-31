import admin_axios from "../base_url";
import { createContext, useEffect, useReducer } from "react";
import colors from "../assets/colors";

export const PreDataContext = createContext();

const preDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRE_DATA":
      return { pre_data: action.payload };

    case "ADD_PRE_DATA":
      const existingIndex = state.pre_data.findIndex(
        (pre_data) => pre_data.name === action.payload.name
      );
      if (existingIndex !== -1) {
        // Update existing class data if found
        const updatedPreData = [...state.pre_data];
        updatedPreData[existingIndex] = action.payload;
        return { pre_data: updatedPreData };
      } else {
        // Add new class data if not found
        return {
          pre_data: [
            ...state.pre_data,
            {
              ...action.payload,
              fill: colors[parseInt(state.pre_data.length % colors.length)],
            },
          ],
        };
      }

    case "DELETE_PRE_DATA":
      return {
        pre_data: state.pre_data.filter(
          (pre_data) => !action.payload.includes(pre_data.name)
        ),
      };

    case "UPDATE_PRE_DATA":
      return state.pre_data.map((pre_data) =>
        pre_data.id === action.payload.id ? action.payload : pre_data
      );

    default:
      return state;
  }
};

export const PreDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(preDataReducer, { pre_data: [] });

  useEffect(() => {
    const getPreData = async () => {
      try {
        const response = await admin_axios.get(
          "api/zip-data/get-all-class-count"
        );

        const classes = response.data.classes;

        const pre_data = Object.keys(classes);

        const xxx = pre_data.map((key, index) => ({
          name: key,
          count: classes[key],
          fill: colors[parseInt(index % colors.length)],
        }));

        dispatch({ type: "SET_PRE_DATA", payload: xxx });
      } catch (error) {
        console.log(error);
      }
    };
    getPreData();
  }, []);

  return (
    <PreDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PreDataContext.Provider>
  );
};
