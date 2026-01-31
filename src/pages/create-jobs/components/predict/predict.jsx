import { useState } from "react";
import Box from "../../../../components/box";
import { useDropzone } from "react-dropzone";
import ErrorToast from "../../../../components/toast/error_toast";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import admin_axios from "../../../../base_url";
import AudioPlayer from "react-h5-audio-player";

function Predict({ job }) {
  const { isDarkMode } = useDarkModeContext();
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);

  const predict = async () => {
    if (!file) {
      ErrorToast(isDarkMode, "No file selected!");
      console.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_id", job.job_id);
    try {
      const response = await admin_axios.post("api/predict/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "success") {
        setPredictions(response.data);
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      ErrorToast(isDarkMode, "Only .wav files are allowed!");
      console.error("Only .wav files are allowed!");
      return;
    }
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".wav",
    maxFiles: 1,
    noClick: false,
    noKeyboard: true,
    // only allow .wav files
    validator: (file) => {
      if (file.name.split(".")[file.name.split(".").length - 1] !== "wav") {
        return {
          code: "wrong-file-name",
          message: "Only .wav files are allowed!",
        };
      }
      return null;
    },
  });
  return (
    <Box
      topic="Predict"
      button_1_topic="Predict"
      button_1_fun={predict}
      button_1_color="yellow"
      button_2_topic="Reset"
      button_2_fun={() => {
        setFile(null);
        setPredictions(null);
      }}
    >
      <div className="p-5 flex flex-col">
        <div className="flex gap-[20px] items-center">
          <div
            {...getRootProps({
              className: isDarkMode ? "dropzone_dark" : "dropzone",
            })}
          >
            <input {...getInputProps()} />
            <p className="text-light_black dark:text-dark_grey">
              <span className="font-bold">Drag and drop</span> a file here, or
              <span className="font-bold"> click </span>to select file
            </p>
          </div>
          {file && (
            <div className="w-[500px]">
              <AudioPlayer
                autoPlayAfterSrcChange={false}
                src={URL.createObjectURL(file)}
                className={isDarkMode ? "no-border-dark" : "no-border-light"}
                style={{
                  backgroundColor: isDarkMode ? "#2A2E33" : "#fff",
                }}
              />
            </div>
          )}
        </div>
        {file && (
          <div className="flex  gap-[60px] mt-[5px] text-light_grey text-[14px] dark:text-dark_grey">
            <p>
              Selected file:
              <span className="font-semibold text-[15px]">{file.name}</span>
            </p>
            <p>
              Size:
              <span className="font-semibold text-[15px]">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </p>
            <p>
              Type:
              <span className="font-semibold text-[15px]">{file.type}</span>
            </p>
          </div>
        )}

        <div className="mt-[10px]">
          <h3 className="font-bold dark:text-white">Predictions</h3>
          {predictions ? (
            <div className="mt-[2px]">
              <p className="text-sm ">
                <strong>Prediction: </strong> {predictions.prediction}
              </p>
              {predictions.prediction_data?.predictions &&
                predictions.training_classes && (
                  <div>
                    <h4 className="font-semibold text-sm mt-2">
                      Prediction Scores:
                    </h4>
                    <div className="list-disc  text-[14px] dark:text-dark_grey flex flex-wrap gap-x-[100px] gap-y-[5px]">
                      {predictions.prediction_data.predictions[0].length > 1 &&
                        predictions.prediction_data.predictions[0].map(
                          (score, index) => (
                            <p key={index}>
                              {predictions.training_classes[index]}:{" "}
                              {score.toFixed(8)}
                            </p>
                          )
                        )}
                      {predictions.prediction_data.predictions[0].length ==
                        1 && (
                        <p>
                          {predictions.training_classes[0]}:{" "}
                          {1 -
                            predictions.prediction_data.predictions[0][0].toFixed(
                              9
                            )}
                        </p>
                      )}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <p>No predictions yet. Upload a file to see the results.</p>
          )}
        </div>
      </div>
    </Box>
  );
}

export default Predict;
