import Box from "../../../../components/box";
import dayjs from "dayjs";
import InputText from "../../../../components/input_text";
import { useState } from "react";
import ErrorToast from "../../../../components/toast/error_toast";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import { useJobsContext } from "../../../../hooks/use_jobs_data";
import SuccessToast from "../../../../components/toast/success_toast";
import admin_axios from "../../../../base_url";
import DisplayOne from "../../../../components/display_one";

function ApproveSettingsCreate({ job }) {
  const { isDarkMode } = useDarkModeContext();
  const { dispatch } = useJobsContext();

  const [threshold, setThreshold] = useState(0);
  const [approveName, setApproveName] = useState("");
  const [displayNames, setDisplayNames] = useState(
    job.training_classes.map((training_class) => ({
      class: training_class,
      display_name: "",
      color: "",
      icon: "",
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updatedDisplayNames = [...displayNames];
    updatedDisplayNames[index][field] = value;
    setDisplayNames(updatedDisplayNames);
  };

  const now = dayjs();
  const formattedDate = now.format("MMMM D, YYYY, HH:mm:ss");
  const utcOffset = now.format("Z");

  const approve_model = async () => {
    // if no threshold is set then return
    if (!job.threshold) {
      ErrorToast(isDarkMode, "Please set a threshold to approve the model");
      return;
    }
    // if no approve name is set then return
    if (!approveName) {
      ErrorToast(isDarkMode, "Please set a name to approve the model");
      return;
    }

    if (
      displayNames.some(
        (item) => !item.display_name || !item.color || !item.icon
      )
    ) {
      ErrorToast(
        isDarkMode,
        "Please fill all the display name, color, and icon fields"
      );
      return;
    }

    try {
      const response = await admin_axios.post("api/predict/approve", {
        job_id: job.job_id,
        approve_name: approveName,
        approve_date: `${formattedDate} (UTC${utcOffset})`,
        display_names_for_training_classes: displayNames,
      });
      if (response.status == 200) {
        SuccessToast(isDarkMode, response.data.message);
        dispatch({
          type: "ADD_APPROVE",
          payload: {
            job_id: job.job_id,
            approve_name: approveName.trim(),
            approve_date: `${formattedDate} (UTC${utcOffset})`,
            approved: true,
            display_names_for_training_classes: displayNames,
          },
        });
        setApproveName("");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };

  const add_threshold = async () => {
    // threshold must be between 0 and 1']
    if (threshold <= 0 || threshold >= 1) {
      ErrorToast(isDarkMode, "Threshold must be between 0 and 1");
      return;
    }

    try {
      const response = await admin_axios.post("api/predict/add-threshold", {
        job_id: job.job_id,
        threshold: threshold,
      });
      if (response.status == 200) {
        SuccessToast(isDarkMode, response.data.message);
        dispatch({
          type: "ADD_APPROVE",
          payload: {
            job_id: job.job_id,
            threshold: parseFloat(threshold),
          },
        });
        setThreshold(0);
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };
  const reset_threshold = async () => {
    try {
      const response = await admin_axios.delete(
        `api/predict/remove-threshold?job_id=${job.job_id}`
      );
      if (response.status == 200) {
        SuccessToast(isDarkMode, response.data.message);
        dispatch({
          type: "ADD_APPROVE",
          payload: {
            job_id: job.job_id,
            threshold: 0,
          },
        });
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };

  return (
    <Box
      topic="Approve model"
      button_1_fun={approve_model}
      button_1_topic="Approve model"
      button_1_color="yellow"
      button_2_topic={job.threshold ? "Reset threshold" : "Add threshold"}
      button_2_fun={job.threshold ? reset_threshold : add_threshold}
    >
      <div className="p-5">
        <div className="flex justify-between ">
          <p className="text-text_blue ">
            Job id: <span className="font-semibold">{job.job_id}</span>
          </p>
          <p className="text-light_grey dark:text-dark_grey text-[14px]">
            Date:
            <span className="font-bold">
              {formattedDate} (UTC{utcOffset})
            </span>
          </p>
        </div>
        {!job.threshold ? (
          <div className="w-[400px] mt-[20px]">
            <InputText
              name="Threshold"
              value={threshold}
              input_fun={setThreshold}
              type="number"
            />
          </div>
        ) : (
          <div className="mt-[20px]">
            <DisplayOne topic="Threshold" value={job.threshold} />
          </div>
        )}

        {job.threshold != 0 && (
          <div className="mt-[20px]">
            <div className="w-400">
              <InputText
                name="Approve name"
                value={approveName}
                input_fun={setApproveName}
                bottom="This name will appear to the user. Please provide a name for the approve model"
              />
            </div>
            <div className="mt-[15px] text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
              <div className="flex gap-[20px]">
                <p className="w-[150px] ">Class name</p>
                <p className="w-[60%]">Display name</p>
                <p className="w-[20%]">Display color</p>
                <p className="w-[20%]">Icon name</p>
              </div>
              {job.training_classes.map((training_class, index) => (
                <div
                  key={index}
                  className="flex gap-[20px] items-center mt-[10px]"
                >
                  <p className="w-[150px] text-text_blue font-semibold ">
                    {training_class}
                  </p>
                  <div className="w-[60%]">
                    <InputText
                      value={displayNames[index].display_name}
                      input_fun={(value) =>
                        handleInputChange(index, "display_name", value)
                      }
                    />
                  </div>
                  <div className="w-[20%]">
                    <InputText
                      value={displayNames[index].color}
                      input_fun={(value) =>
                        handleInputChange(index, "color", value)
                      }
                    />
                  </div>
                  <div className="w-[20%]">
                    <InputText
                      value={displayNames[index].icon}
                      input_fun={(value) =>
                        handleInputChange(index, "icon", value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}

export default ApproveSettingsCreate;
