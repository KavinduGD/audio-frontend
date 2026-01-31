import GridViewIcon from "@mui/icons-material/GridView";
import ButtonGrey from "../button_grey";
import ButtonYellow from "../button_yellow";

const Box = ({
  children,
  topic,
  bottom,
  button_1_topic,
  button_1_fun,
  button_1_color = "grey",
  button_1_disabled = false,
  button_2_topic,
  button_2_fun,
  button_2_color = "grey",
  button_2_disabled = false,
  button_3_topic,
  button_3_fun,
  button_3_color = "grey",
  button_3_disabled = false,
  button_4_topic,
  button_4_fun,
  button_4_color = "grey",
  button_4_disabled = false,
  button_set_gap = 10,
  optional_display = false,

  optional = () => {
    return <h1>Optional</h1>;
  },
}) => {
  return (
    <div
      className="bg-white w-full  border-gray-300 border-b-[2px] border-r-[1px] border-l-[1px] border-t-0 dark:border-0"
      style={{ borderBottomColor: "#b0b2b5" }}
    >
      {/* top */}
      <div className="bg-[#FAFAFA] dark:bg-[#21252C]  h-[80px] flex items-center justify-between px-[20px] border-b-[1px] border-gray-200 dark:border-[#4b4949]">
        <div className="flex gap-[10px] items-center">
          <GridViewIcon
            className="text-[#545B64] dark:text-[#D5DBDB]"
            sx={{ fontSize: "20px" }}
          />
          <div className="flex items-end gap-[10px]">
            <p className="text-lg font-bold text-[#16191f] dark:text-[#EAEDED] ">
              {topic}
            </p>
            <p className="text-xs text-[#0073BB] font-bold pb-[3px]">info</p>
          </div>
        </div>
        <div className={`flex gap-[${button_set_gap}px]`}>
          {optional_display && optional()}
          {button_4_topic && button_4_color === "grey" && (
            <ButtonGrey
              button_fun={button_4_fun}
              topic={button_4_topic}
              disabled={button_4_disabled}
            />
          )}
          {button_4_topic && button_4_color === "yellow" && (
            <ButtonYellow
              button_fun={button_4_fun}
              topic={button_4_topic}
              disabled={button_4_disabled}
            />
          )}
          {button_3_topic && button_3_color === "grey" && (
            <ButtonGrey
              button_fun={button_3_fun}
              topic={button_3_topic}
              disabled={button_3_disabled}
            />
          )}
          {button_3_topic && button_3_color === "yellow" && (
            <ButtonYellow
              button_fun={button_3_fun}
              topic={button_3_topic}
              disabled={button_3_disabled}
            />
          )}
          {button_2_topic && button_2_color === "grey" && (
            <ButtonGrey
              button_fun={button_2_fun}
              topic={button_2_topic}
              disabled={button_2_disabled}
            />
          )}
          {button_2_topic && button_2_color === "yellow" && (
            <ButtonYellow
              button_fun={button_2_fun}
              topic={button_2_topic}
              disabled={button_2_disabled}
            />
          )}

          {button_1_topic && button_1_color === "grey" && (
            <ButtonGrey
              button_fun={button_1_fun}
              topic={button_1_topic}
              disabled={button_1_disabled}
            />
          )}
          {button_1_topic && button_1_color === "yellow" && (
            <ButtonYellow
              button_fun={button_1_fun}
              topic={button_1_topic}
              disabled={button_1_disabled}
            />
          )}
        </div>
      </div>
      {/* middle */}
      <div className="bg-white dark:bg-[#2A2E33]">{children}</div>
      {/* bottom */}
      <div className="w-full h-[50px] border-t-[1px] border-gray-200 dark:border-[#4b4949] justify-center flex items-center dark:bg-[#2A2E33]">
        <p className="font-normal text-[14px] text-[#0073C1]">{bottom}</p>
      </div>
    </div>
  );
};

export default Box;
