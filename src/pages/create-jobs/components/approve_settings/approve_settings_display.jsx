import admin_axios from "../../../../base_url";
import Box from "../../../../components/box";
import DisplayOne from "../../../../components/display_one";
import ErrorToast from "../../../../components/toast/error_toast";
import SuccessToast from "../../../../components/toast/success_toast";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import { useJobsContext } from "../../../../hooks/use_jobs_data";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function ApproveSettingsDisplay({ job }) {
  const { isDarkMode } = useDarkModeContext();
  const { dispatch } = useJobsContext();

  console.log("job", job);
  const remove_approval = async () => {
    try {
      const response = await admin_axios.post("api/predict/reject", {
        job_id: job.job_id,
      });
      if (response.status == 200) {
        SuccessToast(isDarkMode, response.data.message);
        dispatch({
          type: "ADD_APPROVE",
          payload: {
            job_id: job.job_id,
            threshold: 0,
            approve_name: "",
            approve_date: "",
            approved: false,
            display_names_for_training_classes: [],
          },
        });
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };

  console.log("job", job);
  return (
    <Box
      topic="Approve model"
      button_1_fun={remove_approval}
      button_1_topic="Remove approval"
      button_1_color="yellow"
    >
      <div className="p-5">
        <div className="flex gap-[100px]">
          <DisplayOne topic="Job id" value={job.job_id} />
          <DisplayOne topic="Threshold" value={job.threshold} />
          <DisplayOne topic="Approve name" value={job.approve_name} />
          <DisplayOne topic="Approve date" value={job.approve_date} />
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
                <span className="text-success_green">Approved</span>
              </p>
            }
          />
        </div>
        <div className="mt-[20px] ">
          <div className="flex gap-[30px] text-light_grey dark:text-[#95A5A6] text-[15px] mb-[10px]">
            <p className="w-[100px]">Class name</p>
            <p className="w-[200px]">Display name</p>
            <p className="w-[100px]">Display color</p>
            <p className="w-[100px]">Icon name</p>
          </div>
          <div className="flex flex-col gap-[10px]">
            {job.display_names_for_training_classes.map((item, index) => (
              <div key={index} className="flex gap-[30px] ">
                <div className="w-[100px]">
                  <p className="text-light_black dark:text-[#D5DBDB] text-[14px]">
                    {item.class}
                  </p>
                </div>
                <div className="w-[200px]">
                  <p className="text-light_black dark:text-[#D5DBDB] text-[14px]">
                    {item.display_name}
                  </p>
                </div>
                <div className="w-[100px]">
                  <p className="text-light_black dark:text-[#D5DBDB] text-[14px]">
                    {item.color}{" "}
                  </p>
                </div>
                <div className="w-[100px]">
                  <p className="text-light_black dark:text-[#D5DBDB] text-[14px]">
                    {item.icon}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default ApproveSettingsDisplay;
