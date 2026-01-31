import { Paper, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDarkModeContext } from "../../hooks/use_dark_mode_context";

function SearchBar({
  width = "55%",
  height = 32,
  placeholder = "Search",
  setSearchText,
}) {
  const { isDarkMode } = useDarkModeContext();
  return (
    <Paper
      elevation={0}
      component="form"
      sx={{
        p: "2px 5px 0px 5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: { width },
        height: { height },
        backgroundColor: isDarkMode ? "#1A2029" : "#fff",
        borderRadius: "2px",
        border: isDarkMode ? "1px solid #4b4949" : "1px solid #879596",
        "&:focus-within": {
          border: `${isDarkMode ? "1px" : "2px"} solid #00a1c9`,
        },
      }}
    >
      <div className="flex items-center flex-1">
        <IconButton sx={{ cursor: "default" }} aria-label="menu" disableRipple>
          <SearchIcon
            className="text-[#687078] text-sm font-normal"
            sx={{ fontSize: 20 }}
          />
        </IconButton>
        <InputBase
          sx={{
            ml: "5px",
            flex: 1,
            fontSize: "14px",
            color: isDarkMode ? "#879596" : "#1A2029",
            fontStyle: "italic",
          }}
          placeholder={placeholder}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </Paper>
  );
}

export default SearchBar;
