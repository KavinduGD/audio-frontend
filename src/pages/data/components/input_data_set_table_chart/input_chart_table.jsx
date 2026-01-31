import { useState } from "react";
import InputDataChart from "./input_data_chart";
import InputDataTable from "./input_data_table";
import Box from "../../../../components/box";

function Input_data_chart_table() {
  const [input_data_chart_mode, setInputDataChartMode] = useState(true);

  return (
    <Box
      topic="Input Dataset"
      bottom="View All"
      button_1_topic={
        input_data_chart_mode ? "Change to Table View" : "Change to Chart View"
      }
      button_1_fun={() => setInputDataChartMode(!input_data_chart_mode)}
    >
      <div>
        {input_data_chart_mode ? <InputDataChart /> : <InputDataTable />}
      </div>
    </Box>
  );
}

export default Input_data_chart_table;
