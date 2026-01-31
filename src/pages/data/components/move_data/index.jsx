import { useEffect, useState } from "react";
import Box from "../../../../components/box"; // Assuming Box is a reusable component in your project
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context"; // Assuming you have a dark mode context
import InputText from "../../../../components/input_text";
import SelectOptions from "../../../../components/SelectOptions";
import EastIcon from "@mui/icons-material/East";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { usePreDataContext } from "../../../../hooks/use_pre_data_context";
import { useInputDataContext } from "../../../../hooks/use_input_data_context";
import ButtonGrey from "../../../../components/button_grey";
import admin_axios from "../../../../base_url";
import ErrorToast from "../../../../components/toast/error_toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SuccessToast from "../../../../components/toast/success_toast";
import { RotatingLines } from "react-loader-spinner";
function MoveData() {
  const { isDarkMode } = useDarkModeContext();
  const { pre_data } = usePreDataContext();
  const { input_data, dispatch } = useInputDataContext();

  const [selectedPreDataClass, setSelectedPreDataClass] = useState("");
  const [selectedInputDataClass, setSelectedInputDataClass] = useState("");
  const [selectedOption, setSelectedOption] = useState("useExistingClass");
  const [selectedNewInputDataClass, setSelectedNewInputDataClass] =
    useState("");
  const [count, setCount] = useState(0);
  const [comparedData, setComparedData] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);

  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (pre_data.length > 0) {
      setSelectedPreDataClass(pre_data[0].name);
    }

    if (input_data.length > 0) {
      setSelectedInputDataClass(input_data[0].name);
    }
  }, [pre_data, input_data]);

  const compare = async () => {
    if (selectedPreDataClass == "" || selectedInputDataClass == "") {
      ErrorToast(isDarkMode, "Please select both classes");
      return;
    }
    const data = {
      zip_class_name: selectedPreDataClass,
      input_class_name: selectedInputDataClass,
    };
    try {
      const response = await admin_axios.post("api/input-data/compare", data);
      if (response.status == 200) {
        setComparedData(response.data.common_audio_files);
        console.log(response.data.common_audio_files);
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    }
  };

  const rename = async () => {
    const data = {
      zip_class_name: selectedPreDataClass,
      input_class_name: selectedInputDataClass,
    };
    try {
      setIsRenaming(true);
      const response = await admin_axios.post("api/input-data/rename", data);

      if (response.status == 200) {
        setComparedData(null);
        SuccessToast(isDarkMode, "Audios renamed successfully");
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    } finally {
      setIsRenaming(false);
    }
  };

  const move = async (type) => {
    const percentage =
      (count / pre_data.find((cls) => cls.name == selectedPreDataClass).count) *
      100;

    if (selectedOption == "createNewClass" && selectedNewInputDataClass == "") {
      ErrorToast(isDarkMode, "Please enter new input class name");
      return;
    }

    if (selectedOption == "useExistingClass" && selectedInputDataClass == "") {
      ErrorToast(isDarkMode, "Please select input class name");
      return;
    }

    if (selectedPreDataClass == "") {
      ErrorToast(isDarkMode, "Please select pre data class name");
      return;
    }

    if (count <= 0) {
      ErrorToast(isDarkMode, "Please enter number of samples");
      return;
    }

    if (percentage > 100) {
      ErrorToast(
        isDarkMode,
        "Selected samples must be less than or equal to total samples"
      );
      return;
    }
    // check the new class name already exists in the input data
    if (
      selectedOption == "createNewClass" &&
      input_data.find((cls) => cls.name == selectedNewInputDataClass)
    ) {
      ErrorToast(isDarkMode, "New input class name already exists");
      return;
    }

    if (
      selectedOption == "createNewClass" &&
      selectedNewInputDataClass.length > 20
    ) {
      ErrorToast(
        isDarkMode,
        "New input class name must be less than 20 characters"
      );
      return;
    }

    if (
      selectedOption == "createNewClass" &&
      selectedNewInputDataClass.split(" ").length > 1
    ) {
      ErrorToast(isDarkMode, "New input class name must be one word only");
      return;
    }

    if (
      selectedOption == "createNewClass" &&
      !/^[a-z_]+$/.test(selectedNewInputDataClass)
    ) {
      ErrorToast(
        isDarkMode,
        "New input class names must be in lowercase and only contain letters and underscores (e.g. class_name)."
      );
      return;
    }

    try {
      const data = {
        zip_class_name: selectedPreDataClass,
        input_class_name:
          selectedOption == "useExistingClass"
            ? selectedInputDataClass
            : selectedNewInputDataClass,
        percentage: percentage,
      };
      setIsMoving(true);
      let url = "";
      if (type == "keep_both") {
        url = "api/input-data/copy-and-keep-both-with-percentage";
      } else {
        url = "api/input-data/copy-and-override-with-percentage";
      }
      const response = await admin_axios.post(url, data);
      if (response.status == 200) {
        SuccessToast(isDarkMode, "Data moved successfully");
        dispatch({
          type: "ADD_INPUT_DATA",
          payload: {
            name:
              selectedOption == "useExistingClass"
                ? selectedInputDataClass
                : selectedNewInputDataClass,
            count: response.data.total_files_after_copy,
          },
        });
        setCount(0);
        if (selectedOption == "createNewClass") {
          setSelectedNewInputDataClass("");
        }
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      ErrorToast(isDarkMode, error.response?.data?.message || error.message);
    } finally {
      setIsMoving(false);
    }
  };

  return (
    <Box
      topic="Move to Input Data"
      button_1_topic="Move and keep both"
      button_1_fun={() => {
        move("keep_both");
      }}
      button_1_color="yellow"
      button_2_topic="Move and override"
      button_2_fun={() => {
        move("override");
      }}
      button_2_color="yellow"
      optional={() => {
        return (
          <div className="flex items-center ">
            {isMoving && (
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
      optional_display={true}
    >
      <div className="p-5">
        <div className="text-light_black dark:text-dark_white">
          <div className="flex items-center gap-[10px]">
            <input
              className="w-[15px] h-[15px] "
              type="radio"
              id="useExistingClass"
              name="classOption"
              value="useExistingClass"
              checked={selectedOption === "useExistingClass"}
              onChange={(e) => {
                setComparedData(null);
                setSelectedOption(e.target.value);
                setSelectedNewInputDataClass("");
              }}
            />
            <label htmlFor="useExistingClass">
              Use existing input class names
            </label>
          </div>
          <div className="flex items-center gap-[10px]">
            <input
              className="w-[15px] h-[15px] "
              type="radio"
              id="createNewClass"
              name="classOption"
              value="createNewClass"
              checked={selectedOption === "createNewClass"}
              onChange={(e) => {
                setComparedData(null);
                setSelectedOption(e.target.value);
                setSelectedInputDataClass("");
              }}
            />
            <label htmlFor="createNewClass">
              Create a new input class name
            </label>
          </div>
        </div>
        {/* <p className="mt-[20px]">Select class details below</p> */}
        {/* middle */}
        <div className="w-full flex gap-[35px] mt-[20px]">
          {/* left */}
          <div className="flex gap-[35px]">
            <div className="flex flex-col gap-[12px] w-[80px]">
              <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
                All samples
              </p>

              <p className="text-[14px] text-[#1A2029] dark:text-[#879596]">
                {selectedPreDataClass != "" && pre_data.length > 0
                  ? pre_data.find((cls) => cls.name == selectedPreDataClass)
                      .count
                  : "-"}
              </p>
            </div>
            <div className="w-[150px]">
              <InputText
                name="Selected samples"
                type="number"
                value={count}
                input_fun={setCount}
              />
            </div>
          </div>
          {/* right */}
          <div className="flex w-full">
            <SelectOptions
              name="Pre data classes"
              options={pre_data.map((cls) => ({
                value: cls.name,
                label: cls.name,
              }))}
              input_fun={setSelectedPreDataClass}
              value={selectedPreDataClass}
            />
            <div className="flex pt-[22px]">
              <TrendingFlatIcon
                sx={{
                  fontSize: "30px",
                  fontFamily: "Amazon Ember",
                  color: isDarkMode ? "#879596" : "#6b7280",
                  strokeWidth: 1.5,
                }}
              />
            </div>
            {selectedOption !== "useExistingClass" ? (
              <InputText
                name="New input class name"
                value={selectedNewInputDataClass}
                input_fun={setSelectedNewInputDataClass}
              />
            ) : (
              <SelectOptions
                name="existing input class"
                options={input_data.map((cls) => ({
                  value: cls.name,
                  label: cls.name,
                }))}
                input_fun={setSelectedInputDataClass}
                value={selectedInputDataClass}
              />
            )}
          </div>
        </div>

        <div className="flex  items-end gap-[10px] mt-[20px]">
          {selectedOption == "useExistingClass" && (
            <ButtonGrey
              topic="Compare audio names"
              disabled={selectedInputDataClass == ""}
              button_fun={compare}
            />
          )}
          {comparedData != null ? (
            <>
              {(comparedData.length > 0 || comparedData.length == 0) && (
                <DeleteOutlineIcon
                  onClick={() => setComparedData(null)}
                  className="cursor-pointer"
                  sx={{
                    fontSize: "18px",
                    color: isDarkMode ? "#fff" : "#374151",
                  }}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        {comparedData != null ? (
          <>
            {comparedData.length == 0 && (
              <div className="mt-[10px] text-[#374151] dark:text-[#a3a3a3]">
                <p className="text-light_black dark:text-dark_grey">
                  There are {comparedData.length} audio file with same name
                </p>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
        {comparedData != null ? (
          <>
            {comparedData.length > 0 && (
              <div className="mt-[10px] text-[#374151] dark:text-[#a3a3a3]">
                <p className="text-light_black dark:text-dark_grey">
                  There are {comparedData.length} audio file with same name
                </p>
                <div className="flex flex-wrap gap-x-[10px]">
                  {comparedData.map((data, index) => {
                    return (
                      <span key={index} className="text-[13px] ">
                        {data} ,
                      </span>
                    );
                  })}
                </div>
                <div className="flex gap-[20px] items-center mt-[10px]">
                  <button
                    onClick={rename}
                    className="px-[10px] py-[4px] text-[14px] bg-white dark:bg-[#2A2E33] text-[#545b64] font-bold rounded-[2px] border-[#545b64] border-[1px]  dark:text-[#D5DBDB]
        dark:border-[#879596] dark:hover:text-[#e6fafa] dark:hover:border-[#aab7b8] hover:text-[#16191f] hover:border-[#16191f]"
                  >
                    Rename audios
                  </button>
                  {isRenaming && (
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
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </Box>
  );
}

export default MoveData;
