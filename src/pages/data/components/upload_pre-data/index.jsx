import { useState } from "react";
import Box from "../../../../components/box";
import { useDropzone } from "react-dropzone";
import SuccessToast from "../../../../components/toast/success_toast";
import ErrorToast from "../../../../components/toast/error_toast";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import { RotatingLines } from "react-loader-spinner";
import InputText from "../../../../components/input_text";
import { usePreDataContext } from "../../../../hooks/use_pre_data_context";
import admin_axios from "../../../../base_url";

function UploadPreData() {
  const [file, setFile] = useState(null);
  const [className, setClassName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isDarkMode } = useDarkModeContext();
  const { dispatch } = usePreDataContext();

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      ErrorToast(isDarkMode, "Only sounds.zip file is allowed!");
      console.error("Only sounds.zip file is allowed!");
      return;
    }
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".zip",
    maxFiles: 1,
    validator: (file) => {
      if (file.name !== "sounds.zip") {
        return {
          code: "wrong-file-name",
          message: "Only sounds.zip file is allowed!",
        };
      }
      return null;
    },
    noClick: false,
    noKeyboard: true,
  });

  const uploadFile = async () => {
    if (!file) {
      ErrorToast(isDarkMode, "No file selected!");
      console.error("No file selected!");
      return;
    }

    if (!className) {
      ErrorToast(isDarkMode, "Class name is required!");
      console.error("Class name is required!");
      return;
    }

    if (!/^[a-z_]+$/.test(className)) {
      ErrorToast(
        isDarkMode,
        "Class names must be in lowercase and only contain letters and underscores (e.g. class_name)."
      );
      console.error(
        "Class names must be in lowercase and only contain letters and underscores (e.g. class_name)."
      );
      return;
    }

    if (className.length > 20) {
      ErrorToast(isDarkMode, "Class name must be less than 20 characters!");
      console.error("Class name must be less than 20 characters!");
      return;
    }

    if (className.split(" ").length > 1) {
      ErrorToast(isDarkMode, "Class name must be one word only!");
      console.error("Class name must be one word only!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("class_name", className.trim());

    setIsLoading(true); // Start loading

    try {
      const response = await admin_axios.post(
        "api/zip-data/upload-zip-fast",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 201) {
        SuccessToast(isDarkMode, response.data.message);
        console.log(response.data);
        dispatch({
          type: "ADD_PRE_DATA",
          payload: { name: className, count: response.data.total_count },
        });
        setFile(null);
        setClassName("");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Box
      topic="Upload Pre Data"
      button_1_topic="upload"
      button_1_fun={uploadFile}
      button_1_color="yellow"
      button_1_disabled={isLoading}
      optional_display={true}
      button_2_topic="reset"
      button_2_fun={() => {
        setFile(null);
        setClassName("");
      }}
      button_2_color="grey"
      button_2_disabled={isLoading}
      optional={() => {
        return (
          <div className="flex items-center ">
            {isLoading && (
              <RotatingLines
                visible={true}
                height="30"
                width="30"
                strokeColor={isDarkMode ? "#fff" : "#000"}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            )}
          </div>
        );
      }}
    >
      <div className="p-5">
        <div className="flex">
          <InputText
            name="Class name"
            bottom="Class names must be in lowercase and only contain letters and underscores (e.g. class_name). Max length is 20 characters. One word only."
            input_fun={setClassName}
            value={className}
          />
        </div>

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
      </div>
    </Box>
  );
}

export default UploadPreData;
