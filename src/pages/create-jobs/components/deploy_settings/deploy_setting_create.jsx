import { useEffect, useState } from "react";
import Box from "../../../../components/box";
import dayjs from "dayjs";
import RefreshIcon from "@mui/icons-material/Refresh";
import SelectOptions from "../../../../components/SelectOptions";
import InputText from "../../../../components/input_text";
import ErrorToast from "../../../../components/toast/error_toast";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import admin_axios from "../../../../base_url";
import SuccessToast from "../../../../components/toast/success_toast";
import { useJobsContext } from "../../../../hooks/use_jobs_data";

const instances = [
  "ml.r5d.large",
  "ml.r5d.xlarge",
  "ml.r5d.2xlarge",
  "ml.r5d.4xlarge",
  "ml.r5d.8xlarge",
  "ml.r5d.12xlarge",
  "ml.r5d.16xlarge",
  "ml.r5d.24xlarge",
  "ml.m5.large",
  "ml.m5.xlarge",
  "ml.m5.2xlarge",
  "ml.m5.4xlarge",
  "ml.m5.12xlarge",
  "ml.m5.24xlarge",
  "ml.m4.xlarge",
  "ml.m4.2xlarge",
  "ml.c5.xlarge",
  "ml.c5.2xlarge",
  "ml.c5.4xlarge",
  "ml.c5.9xlarge",
  "ml.c5.18xlarge",
  "ml.c4.xlarge",
  "ml.c4.2xlarge",
  "ml.g4dn.4xlarge",
  "ml.g4dn.8xlarge",
  "ml.g4dn.12xlarge",
  "ml.g4dn.16xlarge",
  "ml.g5.xlarge",
  "ml.g5.2xlarge",
  "ml.g5.4xlarge",
  "ml.g5.8xlarge",
  "ml.m4.2xlarge",
  "ml.m4.4xlarge",
  "ml.m4.10xlarge",
  "ml.m4.16xlarge",
  "ml.t3.medium",
  "ml.t3.large",
  "ml.t3.xlarge",
  "ml.t3.2xlarge",
  "ml.r5.large",
  "ml.r5.xlarge",
  "ml.r5.2xlarge",
  "ml.r5.4xlarge",
  "ml.r5.8xlarge",
  "ml.r5.12xlarge",
  "ml.r5.16xlarge",
  "ml.r5.24xlarge",
  "ml.p2.xlarge",
  "ml.p2.8xlarge",
  "ml.p2.16xlarge",
  "ml.p3.2xlarge",
  "ml.p3.8xlarge",
  "ml.p3.16xlarge",
  "ml.g4dn.xlarge",
  "ml.g4dn.2xlarge",
  "ml.g5.12xlarge",
  "ml.g5.16xlarge",
  "ml.g5.24xlarge",
  "ml.g5.48xlarge",
  "ml.t2.medium",
];
function DeploySettingsCreate({ job }) {
  const { isDarkMode } = useDarkModeContext();
  const { dispatch } = useJobsContext();

  const [instanceType, setInstanceType] = useState("ml.m5.large");
  const [instanceCount, setInstanceCount] = useState(1);

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

  const add_deploy_details = async () => {
    if (job.training_job_status != "Completed") {
      ErrorToast(isDarkMode, "Training job is not completed");
      return;
    }

    if (!instanceType || !instanceCount) {
      ErrorToast(isDarkMode, "Please fill all fields");
      return;
    }

    if (instanceCount < 1 || instanceCount > 5) {
      ErrorToast(isDarkMode, "Instance count must be between 1-5");
      return;
    }

    try {
      const response = await admin_axios.post(
        "api/deploy/add_deployment_details",
        {
          job_id: job.job_id,
          deploy_instance_type: instanceType,
          deploy_instance_count: instanceCount,
          deploy_date: `${formattedDate} (UTC${utcOffset})`,
        }
      );

      if (response.status == 200) {
        SuccessToast(isDarkMode, response.data.message);
        console.log(response.data);
        dispatch({
          type: "ADD_TRAIN_BASIC",
          payload: {
            job_id: job.job_id,
            deploy_instance_type: instanceType,
            deploy_instance_count: instanceCount,
            deploy_date: `${formattedDate} (UTC${utcOffset})`,
          },
        });
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };

  const now = dayjs();
  const formattedDate = now.format("MMMM D, YYYY, HH:mm:ss");
  const utcOffset = now.format("Z");

  return (
    <Box
      topic="Deploy settings"
      button_1_fun={add_deploy_details}
      button_1_topic="Create deployment"
      button_1_color="yellow"
      button_2_topic="Reset"
      button_2_fun={() => {
        setInstanceType("ml.m5.large");
        setInstanceCount(1);
      }}
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
      optional_display={true}
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
        <div className="flex gap-[30px] mt-[20px]">
          <SelectOptions
            name="Instance Type"
            options={instances.map((instance) => ({
              value: instance,
              label: instance,
            }))}
            value={instanceType}
            input_fun={(value) => setInstanceType(value)}
          />
          <InputText
            name="train_instance_typetance Count"
            value={instanceCount}
            input_fun={(value) => setInstanceCount(value)}
            type="number"
          />
        </div>
      </div>
    </Box>
  );
}

export default DeploySettingsCreate;
