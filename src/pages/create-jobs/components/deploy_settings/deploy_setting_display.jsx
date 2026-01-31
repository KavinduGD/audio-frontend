import { useEffect, useState } from "react";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import { useJobsContext } from "../../../../hooks/use_jobs_data";
import Box from "../../../../components/box";
import RefreshIcon from "@mui/icons-material/Refresh";
import admin_axios from "../../../../base_url";
import SuccessToast from "../../../../components/toast/success_toast";
import ErrorToast from "../../../../components/toast/error_toast";
import DisplayOne from "../../../../components/display_one";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InputText from "../../../../components/input_text";

function DeploySettingsDisplay({ job }) {
  const { isDarkMode } = useDarkModeContext();
  const { dispatch } = useJobsContext();

  const [endPointStatus, setEndPointStatus] = useState(null);
  const [newInstanceCount, setNewInstanceCount] = useState(1);

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

  const deploy = async () => {
    try {
      const response = await admin_axios.post("api/deploy/deploy_model", {
        job_id: job.job_id,
      });
      if (response.status == 200) {
        SuccessToast(isDarkMode, "Model deploying at the endpoint");

        dispatch({
          type: "ADD_DEPLOY",
          payload: {
            job_id: job.job_id,
            endpoint_name: response.data.EndpointName,
          },
        });
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const get_endPoint_status = async () => {
      try {
        const response = await admin_axios.get(
          `api/deploy/check_deployment_status?job_id=${job.job_id}`
        );

        setEndPointStatus(response.data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        ErrorToast(isDarkMode, error.response?.data?.message || error.message);
      }
    };

    if (job.endpoint_name) {
      get_endPoint_status();
    }
  }, [job.endpoint_name, job.deploy_instance_count]);

  const reset = async () => {
    if (job.approved) {
      ErrorToast(
        isDarkMode,
        "You can't reset the deployment details of an approved job"
      );
      return;
    }

    if (job.endpoint_name) {
      const data = {
        job_id: job.job_id,
        endpoint_name: "",
        deploy_instance_type: "",
        deploy_instance_count: 0,
        deploy_date: "",
        endpoint_status: "Unknown",
      };
      try {
        const response = await admin_axios.delete(
          `api/deploy/delete_all_deployment_details?job_id=${job.job_id}`
        );
        if (response.status == 200) {
          SuccessToast(isDarkMode, "Deployment details reset successfully");

          dispatch({
            type: "ADD_DEPLOY",
            payload: data,
          });
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        ErrorToast(isDarkMode, error.response?.data?.message || error.message);
      }
    } else {
      const data = {
        job_id: job.job_id,
        deploy_instance_type: "",
        deploy_instance_count: 0,
        deploy_date: "",
      };
      try {
        const response = await admin_axios.delete(
          `api/deploy/delete_deployment_details?job_id=${job.job_id}`
        );
        if (response.status == 200) {
          SuccessToast(isDarkMode, "Deployment details reset successfully");

          dispatch({
            type: "ADD_DEPLOY",
            payload: data,
          });
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        ErrorToast(isDarkMode, error.response?.data?.message || error.message);
      }
    }
  };

  const change_instance_count = async () => {
    // if user did not enter a new instance count
    if (!newInstanceCount) {
      ErrorToast(isDarkMode, "Please enter a new instance count");
      return;
    }
    // is user entered a new instance count same as the previous one
    if (job.deploy_instance_count == newInstanceCount) {
      ErrorToast(isDarkMode, "Please enter a new instance count");
      return;
    }
    // if user entered a new instance count greater than 5 or less than 1
    if (newInstanceCount < 1 || newInstanceCount > 5) {
      ErrorToast(isDarkMode, "Instance count must be between 1-5");
      return;
    }

    try {
      const response = await admin_axios.post(
        "api/deploy/increase_instance_count",
        {
          job_id: job.job_id,
          instance_count: newInstanceCount,
        }
      );
      if (response.status == 200) {
        SuccessToast(isDarkMode, response.data.message);
        dispatch({
          type: "ADD_DEPLOY",
          payload: {
            job_id: job.job_id,
            deploy_instance_count: newInstanceCount,
          },
        });
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };
  console.log("DeploySettingsDisplay", job);
  return (
    <Box
      topic="Deploy settings"
      button_1_disabled={job.endpoint_name != ""}
      button_1_fun={deploy}
      button_1_topic="Deploy instance"
      button_1_color="yellow"
      button_2_topic="reset"
      button_2_fun={reset}
      button_3_topic="Change instance count"
      button_3_fun={change_instance_count}
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
        <div className="flex gap-[150px]">
          <DisplayOne topic="Job id" value={job.job_id} />
          <DisplayOne topic="Instance type" value={job.deploy_instance_type} />
          <DisplayOne
            topic="Instance count"
            value={job.deploy_instance_count}
          />
          {job.endpoint_name && endPointStatus && (
            <>
              {endPointStatus.EndpointStatus === "InService" && (
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
                      <span className="text-success_green">Inservice</span>
                    </p>
                  }
                />
              )}
              {endPointStatus.EndpointStatus === "Creating" && (
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
              {endPointStatus.EndpointStatus === "Updating" && (
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
                      <span className="text-gray-500">Updating</span>
                    </p>
                  }
                />
              )}
              {endPointStatus.EndpointStatus === "Failed" && (
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
        {job.endpoint_name &&
          endPointStatus &&
          endPointStatus.EndpointStatus == "InService" && (
            <div className="w-[400px] mt-[20px]">
              <InputText
                name="New instance count"
                value={newInstanceCount}
                input_fun={setNewInstanceCount}
                type="number"
                bottom="Instance count should be les than 5. Please enter a new instance
              count"
              />
            </div>
          )}
      </div>
    </Box>
  );
}

export default DeploySettingsDisplay;
