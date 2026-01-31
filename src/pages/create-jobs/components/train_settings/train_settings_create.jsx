import dayjs from "dayjs";
import Box from "../../../../components/box";
import { useEffect, useState } from "react";
import SelectOptions from "../../../../components/SelectOptions";
import InputText from "../../../../components/input_text";
import SuccessToast from "../../../../components/toast/success_toast";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import ErrorToast from "../../../../components/toast/error_toast";
import { useJobsContext } from "../../../../hooks/use_jobs_data";
import admin_axios from "../../../../base_url";
import RefreshIcon from "@mui/icons-material/Refresh";

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
];
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
function TrainSettingsCreate({ job }) {
  const [selectedArchitectureType, setSelectedArchitectureType] = useState(1);
  const [instanceType, setInstanceType] = useState("ml.m5.large");
  const [instanceCount, setInstanceCount] = useState(1);

  const { isDarkMode } = useDarkModeContext();
  const { dispatch } = useJobsContext();

  console.log(selectedArchitectureType);

  const now = dayjs();
  const formattedDate = now.format("MMMM D, YYYY, HH:mm:ss");
  const utcOffset = now.format("Z");

  console.log("preprocess_job_name", job);

  const create_train_job = async () => {
    if (job.preprocessing_job_status != "Completed") {
      ErrorToast(isDarkMode, "Please preprocess the data first");
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
      const response = await admin_axios.post("api/train/add-train-details", {
        job_id: job.job_id,
        train_architecture_type: parseInt(selectedArchitectureType),
        train_instance_type: instanceType,
        train_instance_count: instanceCount,
        train_date: `${formattedDate} (UTC${utcOffset})`,
      });

      if (response.status == 200) {
        SuccessToast(isDarkMode, response.data.message);
        console.log(response.data);
        dispatch({
          type: "ADD_TRAIN_BASIC",
          payload: {
            job_id: job.job_id,
            train_architecture_type: parseInt(selectedArchitectureType),
            train_instance_type: instanceType,
            train_instance_count: instanceCount,
            train_date: `${formattedDate} (UTC${utcOffset})`,
          },
        });
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
      topic="Train settings"
      button_1_fun={create_train_job}
      button_1_topic="Create a train job"
      button_1_color="yellow"
      button_2_topic="Reset"
      button_2_fun={() => {
        setSelectedArchitectureType(1);
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

        <div className="mt-[20px]">
          <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
            Train architecture type
          </p>
          <div className="flex mt-[15px] gap-[30px]">
            {architectures.map((architecture) => (
              <div
                key={Object.keys(architecture)[0]}
                className={`flex flex-1 cursor-pointer flex-col  p-3 rounded-[3px]  border-[#879596] dark:border-[#4b4949] border-[1px] dark:border-[1px] ${
                  selectedArchitectureType ===
                  parseInt(Object.keys(architecture)[0])
                    ? " bg-gray-100 dark:bg-gray-900   border-[#1A2029] border-[1px] dark:border-gray-500 dark:border-[2px]"
                    : " bg-[#fff] dark:bg-[#1A2029]"
                }`}
                onClick={() =>
                  setSelectedArchitectureType(
                    parseInt(Object.keys(architecture)[0])
                  )
                }
              >
                <p className="font-semibold mb-[10px]">
                  Architecture {Object.keys(architecture)[0]}
                </p>

                <div className="flex flex-col gap-[10px]">
                  <div>
                    <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
                      Suitable for:
                    </p>
                    <p className="text-[#1A2029] dark:text-[#879596] text-[14px]">
                      {architecture[Object.keys(architecture)[0]].suitable_for}
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
                      Epochs:
                    </p>
                    <p className="text-[#1A2029] dark:text-[#879596] text-[14px]">
                      {architecture[Object.keys(architecture)[0]].epochs}
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
                      Layers:
                    </p>
                    <p className="text-[#1A2029] dark:text-[#879596] text-[14px]">
                      {architecture[Object.keys(architecture)[0]].Layers}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            name="Instance Count"
            value={instanceCount}
            input_fun={(value) => setInstanceCount(value)}
            type="number"
          />
        </div>
      </div>
    </Box>
  );
}

export default TrainSettingsCreate;
