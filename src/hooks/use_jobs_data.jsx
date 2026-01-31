import { useContext } from "react";
import { JobsContext } from "../context/jobs_context";

export const useJobsContext = () => {
  const context = useContext(JobsContext);

  if (!context) {
    throw new Error("User Context must be used within a UserContextProvider");
  }

  return context;
};
