import LaunchIcon from "@mui/icons-material/Launch";
import { useDarkModeContext } from "../../hooks/use_dark_mode_context";

function Topic1({ topic, margin_bottom = "mb-[20px]", topic_bottom }) {
  const { isDarkMode } = useDarkModeContext();
  return (
    <div className={`flex flex-col ${margin_bottom}`}>
      <div className={`flex gap-[15px] items-end`}>
        <p className="text-[28px] text-[#16191F] dark:text-[#EAEDED]">
          {topic}
        </p>
        <p className="text-xs text-[#0073BB] font-bold pb-[8px]">info</p>
      </div>

      {topic_bottom && (
        <p className="leading-5 text-[#3F4146] dark:text-[#BEC3C4] text-[15px]">
          {topic_bottom}
          <span className="text-[#0C7ABE] font-bold ml-[10px] dark:text-[#3D9EB8]">
            Learn more
            <span>
              <LaunchIcon
                sx={{
                  fontSize: 18,
                  verticalAlign: "middle",
                  marginLeft: "5px",
                  fontWeight: "bold",
                  stroke: isDarkMode ? "#3D9EB8" : "#0C7ABE",
                  strokeWidth: 1,
                }}
              />
            </span>
          </span>
        </p>
      )}
    </div>
  );
}

export default Topic1;
