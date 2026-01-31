import admin_axios from "../base_url";
import { createContext, useEffect, useReducer } from "react";
import colors from "../assets/colors";

export const JobsContext = createContext();

const jobsReducer = (state, action) => {
  switch (action.type) {
    case "SET_JOBS":
      return { jobs: action.payload };
    case "ADD_JOB_WITH_BASIC":
      return { jobs: [...state.jobs, action.payload] };
    case "ADD_CLASSES":
      return {
        jobs: state.jobs.map((job) =>
          job.job_id === action.payload.job_id
            ? { ...job, ...action.payload }
            : job
        ),
      };
    case "ADD_PREPROCESS_AND_TRAIN_JOB_NAME":
      return {
        jobs: state.jobs.map((job) =>
          job.job_id === action.payload.job_id
            ? { ...job, ...action.payload }
            : job
        ),
      };
    case "ADD_TRAIN_BASIC":
      return {
        jobs: state.jobs.map((job) =>
          job.job_id === action.payload.job_id
            ? { ...job, ...action.payload }
            : job
        ),
      };
    case "ADD_DEPLOY":
      return {
        jobs: state.jobs.map((job) =>
          job.job_id === action.payload.job_id
            ? { ...job, ...action.payload }
            : job
        ),
      };
    case "ADD_APPROVE":
      return {
        jobs: state.jobs.map((job) =>
          job.job_id === action.payload.job_id
            ? { ...job, ...action.payload }
            : job
        ),
      };
    // list of job_ids will come from payload
    case "DELETE_WHOLE_JOB":
      return {
        jobs: state.jobs.filter((job) => !action.payload.includes(job.job_id)),
      };
    default:
      return state;
  }
};

export const JobsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobsReducer, { jobs: [] });

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await admin_axios.get(
          "api/preprocess/get-all-jobs-data"
        );

        dispatch({ type: "SET_JOBS", payload: response.data.jobs });
      } catch (error) {
        console.log(error);
      }
    };

    getJobs();
  }, []);

  return (
    <JobsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JobsContext.Provider>
  );
};
