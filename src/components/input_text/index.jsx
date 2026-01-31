import { InputBase } from "@mui/material";
import { useDarkModeContext } from "../../hooks/use_dark_mode_context";

function InputText({
  placeholder,
  name,
  top,
  bottom,
  input_fun,
  value,
  type = "text",
}) {
  const { isDarkMode } = useDarkModeContext();
  return (
    <div className="flex flex-col w-full gap-[5px]">
      <div className="flex flex-col">
        <p className="text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
          {name}
        </p>
        {top && (
          <p className="text-[12px] text-[#687078] dark:text-dark_grey leading-3 ">
            {top}
          </p>
        )}
      </div>
      <div>
        <InputBase
          type={type}
          sx={{
            p: "8px 12px",
            alignItems: "center",
            justifyContent: "space-between",
            height: "35px",
            width: "100%",
            backgroundColor: isDarkMode ? "#1A2029" : "#fff",
            borderRadius: "2px",
            border: isDarkMode ? "1px solid #4b4949" : "1px solid #879596",
            "&:focus-within": {
              border: `${isDarkMode ? "1px" : "2px"} solid #00a1c9`,
            },
            fontSize: "14px",
            color: isDarkMode ? "#879596" : "#1A2029",
            fontFamily: "Amazon Ember",
          }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => input_fun(e.target.value)}
        />
        {bottom && (
          <p className="text-[11px] text-[#687078] dark:text-dark_grey leading-3 mt-[2px]">
            {bottom}
          </p>
        )}
      </div>
    </div>
  );
}

export default InputText;
