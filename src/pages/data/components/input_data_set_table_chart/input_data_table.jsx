import { useEffect, useState } from "react";
import SingleTable from "./single_table";
import SearchBar from "../../../../components/search_bar";
import ButtonGrey from "../../../../components/button_grey";
import { useInputDataContext } from "../../../../hooks/use_input_data_context";
import SuccessToast from "../../../../components/toast/success_toast";
import ErrorToast from "../../../../components/toast/error_toast";
import admin_axios from "../../../../base_url";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";

function InputDataTable() {
  const { isDarkMode } = useDarkModeContext();
  const { input_data: data, dispatch } = useInputDataContext();

  const [class_data, setClassData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isCheckedList, setIsCheckedList] = useState([]);

  // Function to split data into chunks
  useEffect(() => {
    const splitDataIntoChunks = (data, chunkSize) => {
      const chunks = [];
      for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
      }
      return chunks;
    };

    if (searchText === "") {
      setClassData(splitDataIntoChunks(data, 5));
      return;
    }

    const filteredData = data.filter((row) =>
      row.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const dataChunks = splitDataIntoChunks(filteredData, 5);
    setClassData(dataChunks);
    setIsCheckedList([]);
  }, [data, searchText]);

  const click_delete = async () => {
    try {
      const response = await admin_axios.delete(
        "api/input-data/delete-all-audios-from-set-of-classes",
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            class_names: isCheckedList,
          },
        }
      );

      if (response.status === 200) {
        SuccessToast(isDarkMode, "Data deleted successfully");
        dispatch({ type: "DELETE_INPUT_DATA", payload: isCheckedList });
        setIsCheckedList([]);
      }
    } catch (e) {
      ErrorToast(isDarkMode, e.response.data.message);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between pb-[20px] bg-[#FAFAFA] dark:bg-[#21252C] p-5  border-b-[1px] border-gray-200 dark:border-[#4b4949]">
        <SearchBar setSearchText={setSearchText} placeholder="Search Dataset" />
        <ButtonGrey
          topic="Delete"
          disabled={isCheckedList.length === 0}
          button_fun={click_delete}
        />
      </div>

      <div className={`flex gap-[40px] p-5 ${searchText ? "w-[34%]" : ""}`}>
        {class_data.map((chunk, index) => (
          <SingleTable
            key={index}
            data={chunk}
            setIsCheckedList={setIsCheckedList}
          />
        ))}
      </div>
    </div>
  );
}

export default InputDataTable;
