import { useEffect, useState } from "react";
import Box from "../../../../components/box";
import ErrorToast from "../../../../components/toast/error_toast";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import admin_axios from "../../../../base_url";
import DisplayOne from "../../../../components/display_one";

function TrainResult({ job }) {
  const { isDarkMode } = useDarkModeContext();

  const [images, setImages] = useState({});

  const [time_to_complete, setTimeToComplete] = useState(null);

  useEffect(() => {
    const get_images = async () => {
      try {
        const response = await admin_axios.get(
          `api/train/get_plot_images?job_id=${job.job_id}`
        );

        if (response.status == 200) {
          setImages(response.data.plots);
          setTimeToComplete(response.data.time_to_complete);
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        // ErrorToast(isDarkMode, error.response?.data?.message || error.message);
      }
    };
    get_images();
  }, []);

  return (
    <Box topic="Train result">
      <div className="p-5">
        <div className="flex gap-[100px]">
          <DisplayOne topic="Job id" value={job.job_id} />
          <DisplayOne topic="Accuracy" value={job.accuracy} />
          <DisplayOne topic="Time to complete" value={time_to_complete} />
        </div>
        <div className=" mt-[20px]">
          <p>Hyperparameter</p>
          <div className="mt-[0px] flex flex-col flex-wrap gap-x-[80px] gap-y-[10px] h-[200px]">
            {Object.keys(job.hyperparameters).map((key) => (
              <DisplayOne
                gap="gap-[1px]"
                key={key}
                topic={key}
                value={job.hyperparameters[key]}
              />
            ))}
          </div>
        </div>
        <div>
          {Object.keys(images).length > 0 && (
            <div className="flex gap-[30px]">
              <div className="flex-1">
                <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4 ">
                  Accuracy plot
                </p>
                <img
                  src={
                    images[
                      isDarkMode
                        ? "accuracy_plot_dark_url"
                        : "accuracy_plot_light_url"
                    ]
                  }
                  alt="confusion_matrix"
                />
              </div>
              <div className="flex-1">
                <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
                  Loss plot
                </p>
                <img
                  src={
                    images[
                      isDarkMode ? "loss_plot_dark_url" : "loss_plot_light_url"
                    ]
                  }
                  alt="loss plot "
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-[30px] mt-[30px]">
          <div className="flex-1">
            <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
              Confusion matrix
            </p>
            <img
              src={
                images[
                  isDarkMode
                    ? "confusion_matrix_plot_dark_url"
                    : "confusion_matrix_plot_light_url"
                ]
              }
              alt="loss plot "
            />
          </div>
          <div className="flex-1">
            <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
              Classification report
            </p>
            <pre className="text-[15px] text-[#2d323f] dark:text-dark_white leading-6">
              {job.classification_report}
            </pre>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default TrainResult;
