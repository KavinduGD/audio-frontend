import { MenuItem, Paper, Select } from "@mui/material";
import { useDarkModeContext } from "../../hooks/use_dark_mode_context";

function SelectOptions({ name, top, bottom, input_fun, value, options }) {
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
        <Select
          value={value}
          onChange={(e) => input_fun(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: isDarkMode ? "#1A2029" : "#fff",
                boxShadow: "none",
              },
            },
          }}
          sx={{
            p: "2px 5px 2px 0px",
            alignItems: "center",
            height: "35px",
            width: "100%",
            backgroundColor: isDarkMode ? "#1A2029" : "#fff",
            borderRadius: "2px",
            border: isDarkMode ? "1px solid #4b4949" : "1px solid #879596 ",
            fontSize: "14px",
            color: isDarkMode ? "#879596" : "#1A2029",
            fontFamily: "Amazon Ember",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: `${isDarkMode ? "1px" : "1px"} solid #00a1c9`,
              },
            // icon color
            "& .MuiSelect-icon": {
              color: isDarkMode ? "#879596" : "#545B64",
              fontSize: "30px",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                fontSize: "14px",
                fontFamily: "Amazon Ember",
                color: isDarkMode ? "#879596" : "#1A2029",
                border: "1px solid" + (isDarkMode ? "#4b4949" : "#e5e7eb"),
                "&:hover": {
                  backgroundColor:
                    (isDarkMode ? "#414750" : "#f2f3f3") + "!important",
                  border: "1px solid #9ca3af",
                  color: isDarkMode ? "#EAEDED" : "#000",
                },
              }}
              style={{
                backgroundColor: isDarkMode ? "#1A2029" : "#fff",
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {bottom && (
          <p className="text-[11px] text-[#687078] dark:text-dark_grey leading-3 mt-[2px]">
            {bottom}
          </p>
        )}
      </div>
    </div>
  );
}

export default SelectOptions;
