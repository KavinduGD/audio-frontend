import RefreshIcon from "@mui/icons-material/Refresh";
import { useEffect, useState } from "react";
import Box from "../../../../components/box";
import DisplayOne from "../../../../components/display_one";
import admin_axios from "../../../../base_url";
import SuccessToast from "../../../../components/toast/success_toast";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import ErrorToast from "../../../../components/toast/error_toast";
import { useJobsContext } from "../../../../hooks/use_jobs_data";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const architectures = [
  {
    1: {
      suitable_for: "Small Datasets with simple patterns",
      epochs: 50,
      Layers: 2,
    },
  },
  {
    2: {
      suitable_for: "Small Datasets with regularization",
      epochs: 50,
      Layers: 3,
    },
  },
  {
    3: {
      suitable_for: "Large Datasets with no regularization",
      epochs: 100,
      Layers: 5,
    },
  },
  {
    4: {
      suitable_for: "Large Datasets with regularization",
      epochs: 100,
      Layers: 5,
    },
  },
];
function TrainSettingsDisplay({ job }) {
  const { isDarkMode } = useDarkModeContext();
  const { dispatch } = useJobsContext();

  const [trainJobStatus, setTrainJobStatus] = useState(null);

  const handleRefresh = () => {
    localStorage.setItem("scrollPosition", window.scrollY);
    window.location.reload();
  };

  useEffect(() => {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      localStorage.removeItem("scrollPosition");
    }
  }, []);

  const startTrain = async () => {
    try {
      const response = await admin_axios.post(
        "api/train/train-model-sagemaker",
        {
          job_id: job.job_id,
        }
      );

      if (response.status === 200 && response.data.status === "success") {
        SuccessToast(isDarkMode, response.data.message);
        dispatch({
          type: "ADD_PREPROCESS_AND_TRAIN_JOB_NAME",
          payload: {
            job_id: job.job_id,
            sagemaker_train_job_name: response.data.training_job_name,
          },
        });
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const get_train_job_status = async () => {
      try {
        const response = await admin_axios.get(
          `api/train/check-train-job-status?job_id=${job.job_id}`
        );

        setTrainJobStatus(response.data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        ErrorToast(isDarkMode, error.response?.data?.message || error.message);
      }
    };

    if (job.sagemaker_train_job_name) {
      get_train_job_status();
    }
  }, [job.sagemaker_train_job_name]);

  const reset = async () => {
    if (job.sagemaker_train_job_name) {
      const data = {
        job_id: job.job_id,
        sagemaker_train_job_name: "",
        train_architecture_type: 0,
        train_instance_type: "",
        train_instance_count: 0,
        train_date: "",
        training_classes: [],
        classification_report: "",
        accuracy: 0,
        hyperparameters: {},
        training_job_status: "Unknown",
      };
      try {
        const response = await admin_axios.delete(
          `api/train/delete_all_train_data?job_id=${job.job_id}`
        );

        if (response.status === 200) {
          dispatch({ type: "ADD_CLASSES", payload: data });
          SuccessToast(isDarkMode, "Classes reset successfully");
          setTrainJobStatus(null);
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        ErrorToast(isDarkMode, error.response?.data?.message || error.message);
      }
    } else {
      const data = {
        job_id: job.job_id,
        train_architecture_type: 0,
        train_instance_type: "",
        train_instance_count: 0,
        train_date: "",
      };
      try {
        const response = await admin_axios.delete(
          `api/train/delete-train-details?job_id=${job.job_id}`
        );

        if (response.status === 200) {
          dispatch({ type: "ADD_CLASSES", payload: data });
          SuccessToast(isDarkMode, "Classes reset successfully");
          setTrainJobStatus(null);
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        ErrorToast(isDarkMode, error.response?.data?.message || error.message);
      }
    }
  };
  return (
    <Box
      topic="Train settings"
      button_1_disabled={job.sagemaker_train_job_name !== ""}
      button_1_fun={startTrain}
      button_1_topic="Start training"
      button_1_color="yellow"
      button_2_topic="reset"
      button_2_fun={reset}
      optional_display={true}
      optional={() => (
        <div
          onClick={handleRefresh}
          className="flex items-center px-[10px] cursor-pointer bg-white dark:bg-[#2A2E33] text-[#545b64] font-bold rounded-[2px] border-[#545b64] border-[1px]  dark:text-[#D5DBDB]
    dark:border-[#879596]  dark:hover:text-[#e6fafa] dark:hover:border-[#aab7b8] hover:text-[#16191f] hover:border-[#16191f]"
        >
          <RefreshIcon
            sx={{
              fontSize: "25px",
            }}
          />
        </div>
      )}
    >
      <div className="p-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-[20px]">
            <DisplayOne topic="Job id" value={job.job_id} />
            <DisplayOne
              topic="Architecture type"
              value={`Architecture - ${job.train_architecture_type}`}
            />
          </div>
          <div className="flex flex-col gap-[20px]">
            <DisplayOne topic="Train date" value={job.train_date} />
            <DisplayOne
              topic="Suitable for"
              value={
                architectures[job.train_architecture_type - 1][
                  job.train_architecture_type
                ].suitable_for
              }
            />
          </div>
          <div className="flex flex-col gap-[20px]">
            <DisplayOne topic="Instance type" value={job.train_instance_type} />
            <DisplayOne
              topic="Epochs"
              value={
                architectures[job.train_architecture_type - 1][
                  job.train_architecture_type
                ].epochs
              }
            />
          </div>
          <div className="flex flex-col gap-[20px]">
            <DisplayOne
              topic="Instance count"
              value={job.train_instance_count}
            />
            <DisplayOne
              topic="Layers"
              value={
                architectures[job.train_architecture_type - 1][
                  job.train_architecture_type
                ].Layers
              }
            />
          </div>
          <div className="flex flex-col gap-[20px]">
            {job.sagemaker_train_job_name && trainJobStatus && (
              <>
                {trainJobStatus.TrainingJobStatus == "Completed" && (
                  <DisplayOne
                    gap="gap-[6px]"
                    topic="Job status"
                    value={
                      <p className="flex items-center gap-[3px]">
                        <CheckCircleOutlineIcon
                          sx={{
                            fontSize: "20px",
                            color: "#1d8102",
                            stroke: "#1d8102",
                            strokeWidth: "0.3px",
                          }}
                        />
                        <span className="text-success_green">Completed</span>
                      </p>
                    }
                  />
                )}
                {trainJobStatus.TrainingJobStatus == "InProgress" && (
                  <DisplayOne
                    gap="gap-[6px]"
                    topic="Job status"
                    value={
                      <p className="flex items-center gap-[3px]">
                        <AccessTimeIcon
                          sx={{
                            fontSize: "20px",
                            color: "#6b7280",
                            stroke: "#6b7280",
                            strokeWidth: "0.3px",
                          }}
                        />
                        <span className="text-gray-500">Inprogress</span>
                      </p>
                    }
                  />
                )}
                {trainJobStatus.TrainingJobStatus == "Failed" && (
                  <DisplayOne
                    gap="gap-[6px]"
                    topic="Job status"
                    value={
                      <p className="flex items-center gap-[3px]">
                        <ErrorOutlineIcon
                          sx={{
                            fontSize: "20px",
                            color: "#d13212",
                            stroke: "#d13212",
                            strokeWidth: "0.3px",
                          }}
                        />
                        <span className="text-error_red">Failed</span>
                      </p>
                    }
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default TrainSettingsDisplay;
