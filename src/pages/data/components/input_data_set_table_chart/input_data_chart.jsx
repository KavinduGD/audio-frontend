import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useDarkModeContext } from "../../../../hooks/use_dark_mode_context";
import { useInputDataContext } from "../../../../hooks/use_input_data_context";

function InputDataChart() {
  const { isDarkMode } = useDarkModeContext();
  const { input_data: data } = useInputDataContext();

  const renderCustomLegend = () => {
    return (
      <ul
        style={{ listStyleType: "none", padding: 0 }}
        className="flex gap-[15px] flex-wrap  gap-y-[2px]"
      >
        {data.map((entry, index) => (
          <li
            key={`item-${index}`}
            className="flex items-center  text-[#16191f] dark:text-[#D5DBDB] x]"
          >
            <span
              style={{
                display: "inline-block",
                width: "15px",
                height: "15px",
                backgroundColor: entry.fill,
                marginRight: "5px",
              }}
            />
            {entry.name}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="p-5">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            horizontal={true}
            vertical={false}
            strokeWidth={isDarkMode ? 0.2 : 1}
          />
          <XAxis
            dataKey="name"
            tick={{
              fill: isDarkMode ? "#D5DBDB" : "#16191f",
              fontSize: 13,
            }}
          />
          <YAxis
            domain={[0, Math.max(...data.map((item) => item.count)) + 100]}
            label={{
              value: "Sample Count",
              angle: -90,
              position: "insideLeft",
              dy: 50,
              fontSize: 18,
              fill: isDarkMode ? "#D5DBDB" : "#16191f",
            }}
          />

          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="count" name="Classes">
            {data.map((item, index) => (
              <Cell key={index} fill={item.fill} />
            ))}
            <LabelList
              dataKey="count"
              position="top"
              fontSize={12}
              fontWeight={500}
              fill={isDarkMode ? "#D5DBDB" : "#16191f"}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-[10px] px-[30px]">
        {renderCustomLegend()}
      </div>
    </div>
  );
}

export default InputDataChart;
