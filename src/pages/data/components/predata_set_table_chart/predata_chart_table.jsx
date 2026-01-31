import { useState } from "react";
import PreDataChart from "./pre_data_chart";
import PreDataTable from "./pre_data_table";
import Box from "../../../../components/box";

function Pre_data_chart_table() {
  const [pre_data_chart_mode, setPreDataChartMode] = useState(true);

  return (
    <Box
      topic="Pre Dataset"
      bottom="View All"
      button_1_topic={
        pre_data_chart_mode ? "Change to Table View" : "Change to Chart View"
      }
      button_1_fun={() => setPreDataChartMode(!pre_data_chart_mode)}
    >
      <div>{pre_data_chart_mode ? <PreDataChart /> : <PreDataTable />}</div>
    </Box>
  );
}

export default Pre_data_chart_table;
