import { useEffect, useState } from "react";
import admin_axios from "../../../../base_url";
import Box from "../../../../components/box";
import DisplayOne from "../../../../components/display_one";
import ErrorToast from "../../../../components/toast/error_toast";
import SuccessToast from "../../../../components/toast/success_toast";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import { useInputDataContext } from "../../../../hooks/use_input_data_context";
import { useJobsContext } from "../../../../hooks/use_jobs_data";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

function PreprocessDisplay({ job }) {
  const { input_data } = useInputDataContext();
  const { dispatch } = useJobsContext();
  const { isDarkMode } = useDarkModeContext();

  const [preprocessJobStatus, setPreprocessJobStatus] = useState(null);

  const main_class = job.class_configs.filter((cls) => cls.type === "main");
  const other_class = job.class_configs.filter((cls) => cls.type === "other");

  // const mainClassChunks = chunkArray(main_class, 5);
  // const otherClassChunks = chunkArray(other_class, 5);

  const reset = async () => {
    const data = {
      job_id: job.job_id,
      class_configs: [],
      instance_type: "",
      instance_count: 0,
      preprocess_date: "",
      sagemaker_preprocess_job_name: "",
    };
    // /api/preprocess/delete-classes?job_id=8861ho370202376
    try {
      const response = await admin_axios.delete(
        `api/preprocess/delete-classes?job_id=${job.job_id}`
      );

      if (response.status === 200) {
        dispatch({ type: "ADD_CLASSES", payload: data });
        SuccessToast(isDarkMode, "Classes reset successfully");
        setPreprocessJobStatus(null);
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };

  const startPreprocess = async () => {
    try {
      const response = await admin_axios.post(
        "api/preprocess/preprocess-sagemaker",
        {
          job_id: job.job_id,
        }
      );
      if (response.status === 200) {
        // refresh the page
        // window.location.reload();
        SuccessToast(isDarkMode, "Preprocess started successfully");
        dispatch({
          type: "ADD_PREPROCESS_AND_TRAIN_JOB_NAME",
          payload: {
            job_id: job.job_id,
            sagemaker_preprocess_job_name: response.data.processing_job_name,
          },
        });
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const get_preprocess_job_status = async () => {
      try {
        const response = await admin_axios.get(
          `api/preprocess/check-preprocess-job-status?job_id=${job.job_id}`
        );

        setPreprocessJobStatus(response.data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        ErrorToast(isDarkMode, error.response?.data?.message || error.message);
      }
    };

    if (job.sagemaker_preprocess_job_name) {
      get_preprocess_job_status();
    }
  }, [job.sagemaker_preprocess_job_name]);

  const downloadCSV = async () => {
    try {
      const response = await admin_axios.get(
        `api/preprocess/get-csv-file?job_id=${job.job_id}`
      );

      if (response.status === 200 && response.data.status === "success") {
        window.location.href = response.data.presigned_url;
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };
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

  return (
    <Box
      topic="Preprocess settings"
      button_1_disabled={job.sagemaker_preprocess_job_name != ""}
      button_1_fun={startPreprocess}
      button_1_topic="Start preprocess"
      button_1_color="yellow"
      button_2_topic="reset"
      button_2_fun={reset}
      button_3_topic="Download csv"
      button_3_disabled={
        !(
          job.sagemaker_preprocess_job_name &&
          preprocessJobStatus &&
          preprocessJobStatus.ProcessingJobStatus == "Completed"
        )
      }
      button_3_fun={downloadCSV}
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
      <div className="">
        <div className="p-5 flex justify-between border-b-[1px] border-gray-200 dark:border-[#4b4949]">
          <DisplayOne topic="Job id" value={job.job_id} />

          <DisplayOne topic="Preprocess date" value={job.preprocess_date} />
          <DisplayOne topic="Instance type" value={job.instance_type} />
          <DisplayOne topic="Instance count" value={job.instance_count} />
          {job.sagemaker_preprocess_job_name && preprocessJobStatus && (
            <>
              {preprocessJobStatus.ProcessingJobStatus == "Completed" && (
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
              {preprocessJobStatus.ProcessingJobStatus == "InProgress" && (
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
              {preprocessJobStatus.ProcessingJobStatus == "Failed" && (
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
        <div className="p-5">
          <div>
            <p className="font-medium">Main classes</p>
            {/* {mainClassChunks.map((chunk, idx) => (
              <div key={idx} className="flex flex-wrap gap-[100px]">
                {chunk.map((cls, index) => (
                  <DisplayOne
                    key={index}
                    topic={`Class name - ${cls.class_name}`}
                    value={`Selected Samples - ${cls.class_count} / ${
                      input_data.find((data) => data.name === cls.class_name)
                        ?.count || ""
                    }`}
                  />
                ))}
              </div>
            ))} */}
            <div className="flex flex-wrap gap-x-[100px] gap-y-[20px]">
              {main_class.map((cls, index) => (
                <DisplayOne
                  key={index}
                  topic={`Class name - ${cls.class_name}`}
                  value={`Selected Samples - ${cls.class_count} / ${
                    input_data.find((data) => data.name === cls.class_name)
                      ?.count || ""
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="mt-[20px]">
            <p className="font-medium">Other classes</p>
            {/* {otherClassChunks.map((chunk, idx) => (
              <div
                key={idx}
                className="flex flex-wrap gap-x-[100px] gap-y-[10px]"
              >
                {chunk.map((cls, index) => (
                  <DisplayOne
                    key={index}
                    topic={`Class name - ${cls.class_name}`}
                    value={`Selected Samples - ${cls.class_count} / ${
                      input_data.find((data) => data.name === cls.class_name)
                        ?.count || ""
                    }`}
                  />
                ))}
              </div>
            ))} */}
            <div className="flex flex-wrap gap-x-[100px] gap-y-[20px]">
              {other_class.map((cls, index) => (
                <DisplayOne
                  key={index}
                  topic={`Class name - ${cls.class_name}`}
                  value={`Selected Samples - ${cls.class_count} / ${
                    input_data.find((data) => data.name === cls.class_name)
                      ?.count || ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default PreprocessDisplay;
