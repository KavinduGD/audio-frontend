import { useState } from "react";
import dayjs from "dayjs";
import Box from "../../../../components/box";
import BinaryClass from "./components/binary_class";
import MultiClass from "./components/multi_class";
import { useInputDataContext } from "../../../../hooks/use_input_data_context";
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
];
function PreprocessCreate({ job }) {
  const { input_data } = useInputDataContext();
  const { isDarkMode } = useDarkModeContext();
  const { dispatch } = useJobsContext();

  const [instanceType, setInstanceType] = useState("ml.m5.large");
  const [instanceCount, setInstanceCount] = useState(1);

  const [binaryMainClassName, setBinaryMainClassName] = useState("");
  const [mainBinaryClassCount, setMainBinaryClassCount] = useState("");
  const [otherBinaryClassesWithCount, setOtherBinaryClassesWithCount] =
    useState([{ className: "", count: "" }]);

  const [mainMultiClassNamesWithCount, setMainMultiClassNamesWithCount] =
    useState([{ className: "", count: "" }]);
  const [otherMultiClassNamesWithCount, setOtherMultiClassNamesWithCount] =
    useState([{ className: "", count: "" }]);

  const now = dayjs();
  const formattedDate = now.format("MMMM D, YYYY, HH:mm:ss");
  const utcOffset = now.format("Z");

  // For binary
  const handleAddBinaryClass = () => {
    setOtherBinaryClassesWithCount([
      ...otherBinaryClassesWithCount,
      { className: "", count: "" },
    ]);
  };

  // Handler for removing the last class
  const handleRemoveBinaryClass = () => {
    setOtherBinaryClassesWithCount(otherBinaryClassesWithCount.slice(0, -1));
  };

  // For multi class
  const handleAddMultiMainClass = () => {
    setMainMultiClassNamesWithCount([
      ...mainMultiClassNamesWithCount,
      { className: "", count: "" },
    ]);
  };

  const handleRemoveMultiMainClass = () => {
    setMainMultiClassNamesWithCount(mainMultiClassNamesWithCount.slice(0, -1));
  };

  const handleAddMultiOtherClass = () => {
    setOtherMultiClassNamesWithCount([
      ...otherMultiClassNamesWithCount,
      { className: "", count: "" },
    ]);
  };

  const handleRemoveMultiOtherClass = () => {
    setOtherMultiClassNamesWithCount(
      otherMultiClassNamesWithCount.slice(0, -1)
    );
  };

  // other methods

  const createPreprocessJob = async () => {
    if (job.job_type === "binary") {
      if (!binaryMainClassName || !mainBinaryClassCount) {
        ErrorToast(isDarkMode, "Please fill all fields");
        console.error("Please fill all fields!");
        return;
      }
      const emptyOtherClasses = otherBinaryClassesWithCount.filter(
        (cls) => cls.className === "" || cls.count === ""
      );
      if (emptyOtherClasses.length > 0) {
        ErrorToast(isDarkMode, "Please fill all fields in other classes");
        console.error("Please fill all fields!");
        return;
      }

      if (instanceCount < 1) {
        ErrorToast(isDarkMode, "Instance count must be greater than 0");
        console.error("Instance count must be greater than 0");
        return;
      }

      // if same class name is entered in main and other classes
      if (
        otherBinaryClassesWithCount.some(
          (cls) => cls.className === binaryMainClassName
        )
      ) {
        ErrorToast(isDarkMode, "Main class name should not be repeated");
        console.error("Main class name should not be repeated");
        return;
      }

      //same classnames are should not be in other classes as well
      const otherClasses = otherBinaryClassesWithCount.map(
        (cls) => cls.className
      );
      const uniqueOtherClasses = [...new Set(otherClasses)];
      if (uniqueOtherClasses.length !== otherClasses.length) {
        ErrorToast(
          isDarkMode,
          "Other classes should not have same class names"
        );
        console.error("Other classes should not have same class names");
        return;
      }

      // class count should not be grater that Sample count
      const classCount = parseInt(mainBinaryClassCount);
      if (
        classCount >
        input_data.find((data) => data.name === binaryMainClassName).count
      ) {
        ErrorToast(
          isDarkMode,
          "Class count should not be greater than Sample count"
        );
        console.error("Class count should not be greater than Sample count");
        return;
      }

      // class count should not be grater that Sample count in other classes
      for (let i = 0; i < otherBinaryClassesWithCount.length; i++) {
        const cls = otherBinaryClassesWithCount[i];
        const classCount = parseInt(cls.count);
        if (
          classCount >
          input_data.find((data) => data.name === cls.className).count
        ) {
          ErrorToast(
            isDarkMode,
            "Class count should not be greater than Sample count"
          );
          console.error("Class count should not be greater than Sample count");
          return;
        }
      }

      try {
        const class_configs = [
          {
            class_name: binaryMainClassName,
            class_count: mainBinaryClassCount,
            type: "main",
          },
          ...otherBinaryClassesWithCount.map((cls) => ({
            class_name: cls.className,
            class_count: cls.count,
            type: "other",
          })),
        ];

        const data = {
          job_id: job.job_id,
          class_configs,
          instance_type: instanceType,
          instance_count: instanceCount,
          preprocess_date: `${formattedDate} (UTC${utcOffset})`,
        };

        const response = await admin_axios.patch(
          "api/preprocess/add-classes",
          data
        );
        if (response.status == 200) {
          SuccessToast(isDarkMode, response.data.message);
          console.log(response.data);
          reset_job_settings();
          dispatch({ type: "ADD_CLASSES", payload: data });
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        ErrorToast(isDarkMode, error.response?.data?.message || error.message);
      }
    }
    // For multi class
    if (job.job_type === "multi") {
      const emptyMainClasses = mainMultiClassNamesWithCount.filter(
        (cls) => cls.className === "" || cls.count === ""
      );
      if (emptyMainClasses.length > 0) {
        ErrorToast(isDarkMode, "Please fill all fields in main classes");
        console.error("Please fill all fields!");
        return;
      }

      const emptyOtherClasses = otherMultiClassNamesWithCount.filter(
        (cls) => cls.className === "" || cls.count === ""
      );
      if (emptyOtherClasses.length > 0) {
        ErrorToast(isDarkMode, "Please fill all fields in other classes");
        console.error("Please fill all fields!");
        return;
      }

      if (instanceCount < 1) {
        ErrorToast(isDarkMode, "Instance count must be greater than 0");
        console.error("Instance count must be greater than 0");
        return;
      }

      // if same class name is entered in main and other classes
      if (
        otherMultiClassNamesWithCount.some(
          (cls) => cls.className === mainMultiClassNamesWithCount[0].className
        )
      ) {
        ErrorToast(isDarkMode, "Main class name should not be repeated");
        console.error("Main class name should not be repeated");
        return;
      }
      // if only one class contain in main classes this is not multi so give a error

      if (mainMultiClassNamesWithCount.length === 1) {
        ErrorToast(isDarkMode, "Main class should have more than one class");
        console.error("Main class should have more than one class");
        return;
      }

      console.log("hit");
      //same classnames are should not be in other classes as well
      const otherClasses = otherMultiClassNamesWithCount.map(
        (cls) => cls.className
      );
      const uniqueOtherClasses = [...new Set(otherClasses)];
      if (uniqueOtherClasses.length !== otherClasses.length) {
        ErrorToast(
          isDarkMode,
          "Other classes should not have same class names"
        );
        console.error("Other classes should not have same class names");
        return;
      }

      // class count should not be grater that Sample count
      const classCount = parseInt(mainMultiClassNamesWithCount[0].count);
      if (
        classCount >
        input_data.find(
          (data) => data.name === mainMultiClassNamesWithCount[0].className
        ).count
      ) {
        ErrorToast(
          isDarkMode,
          "Class count should not be greater than Sample count"
        );
        console.error("Class count should not be greater than Sample count");
        return;
      }

      // class count should not be grater that Sample count in other classes
      for (let i = 0; i < otherMultiClassNamesWithCount.length; i++) {
        const cls = otherMultiClassNamesWithCount[i];
        const classCount = parseInt(cls.count);
        if (
          classCount >
          input_data.find((data) => data.name === cls.className).count
        ) {
          ErrorToast(
            isDarkMode,
            "Class count should not be greater than Sample count"
          );
          console.error("Class count should not be greater than Sample count");
          return;
        }
      }
      try {
        const class_configs = [
          ...mainMultiClassNamesWithCount.map((cls) => ({
            class_name: cls.className,
            class_count: cls.count,
            type: "main",
          })),

          ...otherMultiClassNamesWithCount.map((cls) => ({
            class_name: cls.className,
            class_count: cls.count,
            type: "other",
          })),
        ];

        const data = {
          job_id: job.job_id,
          class_configs,
          instance_type: instanceType,
          instance_count: instanceCount,
          preprocess_date: `${formattedDate} (UTC${utcOffset})`,
        };

        const response = await admin_axios.patch(
          "api/preprocess/add-classes",
          data
        );
        if (response.status == 200) {
          SuccessToast(isDarkMode, response.data.message);
          console.log(response.data);
          reset_job_settings();
          dispatch({ type: "ADD_CLASSES", payload: data });
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        ErrorToast(isDarkMode, error.response?.data?.message || error.message);
      }
    }
  };

  const reset_job_settings = () => {
    setBinaryMainClassName("");
    setMainBinaryClassCount("");
    setOtherBinaryClassesWithCount([{ className: "", count: "" }]);
    setInstanceType("ml.m5.large");
    setInstanceCount(1);
  };

  return (
    <Box
      topic="Preprocess settings"
      button_1_fun={createPreprocessJob}
      button_1_topic="Create a preprocess job"
      button_1_color="yellow"
      button_2_topic="Reset"
      button_2_fun={reset_job_settings}
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
          {job.job_type === "binary" ? (
            <BinaryClass
              mainClassName={binaryMainClassName}
              setMainClassName={setBinaryMainClassName}
              mainClassCount={mainBinaryClassCount}
              setMainClassCount={setMainBinaryClassCount}
              otherClassesWithCount={otherBinaryClassesWithCount}
              setOtherClassesWithCount={setOtherBinaryClassesWithCount}
              handleAddClass={handleAddBinaryClass}
              handleRemoveClass={handleRemoveBinaryClass}
              input_data={input_data}
            />
          ) : (
            <MultiClass
              mainMultiClassNamesWithCount={mainMultiClassNamesWithCount}
              setMainMultiClassNamesWithCount={setMainMultiClassNamesWithCount}
              otherMultiClassNamesWithCount={otherMultiClassNamesWithCount}
              setOtherMultiClassNamesWithCount={
                setOtherMultiClassNamesWithCount
              }
              handleAddMainClass={handleAddMultiMainClass}
              handleRemoveMainClass={handleRemoveMultiMainClass}
              handleAddOtherClass={handleAddMultiOtherClass}
              handleRemoveOtherClass={handleRemoveMultiOtherClass}
              input_data={input_data}
            />
          )}
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

export default PreprocessCreate;
