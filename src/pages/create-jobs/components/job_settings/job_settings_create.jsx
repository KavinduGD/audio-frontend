import { useEffect, useState } from "react";
import Box from "../../../../components/box";
import admin_axios from "../../../../base_url";
import dayjs from "dayjs";
import InputText from "../../../../components/input_text";
import SelectOptions from "../../../../components/SelectOptions";
import TextArea from "../../../../components/text_area";
import SuccessToast from "../../../../components/toast/success_toast";
import ErrorToast from "../../../../components/toast/error_toast";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import { useNavigate } from "react-router-dom";
import { useJobsContext } from "../../../../hooks/use_jobs_data";

function JobSettingsCreate() {
  const navigate = useNavigate();

  const { dispatch } = useJobsContext();

  const [jobID, setJobID] = useState("");
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("binary");
  const [jobDescription, setJobDescription] = useState("");

  const { isDarkMode } = useDarkModeContext();

  useEffect(() => {
    const fetchJobID = async () => {
      try {
        const response = await admin_axios.get(
          "api/preprocess/get-next-job-id"
        );

        const job_id = response.data;
        setJobID(job_id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobID();
  }, []);

  const now = dayjs();
  const formattedDate = now.format("MMMM D, YYYY, HH:mm:ss");
  const utcOffset = now.format("Z");

  const reset_job_settings = () => {
    setJobName("");
    setJobType("binary");
    setJobDescription("");
  };

  const upload_job_settings = async () => {
    const trimmedJobName = jobName.trim();
    const trimmedJobDescription = jobDescription.trim();

    if (!jobName || !jobType || !jobDescription) {
      ErrorToast(isDarkMode, "Please fill all fields!");
      console.error("Please fill all fields!");
      return;
    }

    if (jobName.length > 30) {
      ErrorToast(isDarkMode, "Job name must be 30 characters or less!");
      return;
    }

    if (!/^[a-z_]+$/.test(jobName)) {
      ErrorToast(
        isDarkMode,
        "Job names must be in lowercase and only contain letters and underscores (e.g. job_name)."
      );
      return;
    }

    if (jobName.split(" ").length > 1) {
      ErrorToast(isDarkMode, "Job name must be one word only!");
      return;
    }

    if (jobDescription.length > 1000) {
      ErrorToast(
        isDarkMode,
        "Job description must be 1000 characters or less!"
      );
      return;
    }

    const data = {
      job_id: jobID,
      job_name: trimmedJobName,
      job_type: jobType,
      job_description: trimmedJobDescription,
      job_date: `${formattedDate} (UTC${utcOffset})`,
    };

    try {
      const response = await admin_axios.post(
        "api/preprocess/preprocess-create",
        data
      );
      if (response.status == 201) {
        SuccessToast(isDarkMode, response.data.message);
        dispatch({
          type: "ADD_JOB_WITH_BASIC",
          payload: { ...data, class_configs: [] },
        });
        console.log(response.data);
        reset_job_settings();

        navigate(`/jobs?job_id=${jobID}`);
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };
  return (
    <Box
      topic="Job Settings"
      button_1_topic="Create a Job"
      button_1_color="yellow"
      button_1_fun={upload_job_settings}
      button_2_topic="Reset"
      button_2_fun={reset_job_settings}
    >
      <div className="p-5 font-amazon_ember">
        <div className="flex justify-between">
          <p className="text-text_blue ">
            Job id : <span className="font-semibold">{jobID}</span>{" "}
          </p>
          <p className="text-light_grey dark:text-dark_grey text-[14px]">
            Date :
            <span className="font-bold">
              {formattedDate} (UTC{utcOffset})
            </span>
          </p>
        </div>
        <div className="flex gap-[60px] mt-[10px]">
          <InputText
            name="Job name"
            value={jobName}
            input_fun={setJobName}
            bottom="Job names must be in lowercase and only contain letters and underscores (e.g. job_name). Max length is 30 characters. One word only."
          />
          <SelectOptions
            name="Job type"
            value={jobType}
            options={[
              { value: "binary", label: "binary classification" },
              { value: "multi", label: "multi-class classification" },
            ]}
            input_fun={setJobType}
          />
        </div>
        <div className="mt-[10px]">
          <TextArea
            name="Job description"
            value={jobDescription}
            input_fun={setJobDescription}
            bottom="Job description must be in maximum 1000 characters. Do not use Special characters. Avoid using emojis. Adjust the text area to fit the content."
          />
        </div>
      </div>
    </Box>
  );
}

export default JobSettingsCreate;
