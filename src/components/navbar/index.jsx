import logo from "../../assets/logo.png";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import GiteIcon from "@mui/icons-material/Gite";
import MicIcon from "@mui/icons-material/Mic";
import SourceIcon from "@mui/icons-material/Source";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Navbar({ isDarkMode, toggleDarkMode }) {
  return (
    <div className="h-[40px] bg-[#232F3E]  flex items-center justify-between px-4 text-white dark:border-[1px] dark:border-[#545B64]">
      <div className="right flex items-center gap-[15px]">
        <img src={logo} alt="" className="w-[60px]" />
        <div className="w-[1px] h-6 bg-[#414750]" />
        <div className="flex items-center gap-1.5  cursor-pointer group">
          <LocalAtmIcon className="group-hover:text-[#ec7211]" />
          <p className="font-normal text-sm leading-[14px] pt-[2px] text-[#FFF5F9] group-hover:text-[#ec7211]">
            Finances
          </p>
        </div>
        <div>
          <Paper
            component="form"
            sx={{
              p: "px 2px 2px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 500,
              height: 30,
              backgroundColor: "#16191F",
              borderRadius: "0px",
              border: "1px solid #879596",
              "&:focus-within": {
                border: "1px solid #00a1c9",
              },
            }}
          >
            <div className="flex items-center flex-1">
              <IconButton
                sx={{ cursor: "default" }}
                aria-label="menu"
                disableRipple
              >
                <SearchIcon
                  className="text-[#D5DBDB] text-sm font-normal"
                  sx={{ fontSize: 18 }}
                />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "14px", color: "#D5DBDB" }}
                placeholder="Search"
              />
            </div>
            <div
              style={{
                color: "#5C6064",
                fontSize: "14px",
                paddingRight: "10px",
              }}
            >
              [Alt+S]
            </div>
          </Paper>
        </div>
      </div>

      <div className="left flex items-center gap-[40px]">
        <div className="icons_set flex gap-[15px] items-center">
          <SourceIcon
            style={{ fontSize: "20px" }}
            className="hover:text-[#ec7211] cursor-pointer"
          />
          <div className="w-[1px] h-6 bg-[#414750]" />
          <ModelTrainingIcon
            style={{ fontSize: "22px" }}
            className="hover:text-[#ec7211] cursor-pointer"
          />
          <div className="w-[1px] h-6 bg-[#414750]" />
          <GiteIcon
            style={{ fontSize: "22px" }}
            className="hover:text-[#ec7211] cursor-pointer"
          />

          <div className="w-[1px] h-6 bg-[#414750]" />
          <MicIcon
            style={{ fontSize: "20px" }}
            className="hover:text-[#ec7211] cursor-pointer"
          />
          <div className="w-[1px] h-6 bg-[#414750]" />
          <SettingsIcon
            style={{ fontSize: "20px" }}
            className="hover:text-[#ec7211] cursor-pointer"
          />
          <div className="w-[1px] h-6 bg-[#414750]" />
        </div>
        <div className="flex items-center ">
          {/* <p>Recent- 2024/05/01</p> */}
          <p className="text-[12px] font-medium mt-[5px]">
            kavidu_gihan_90 @ Amin User
          </p>
          <div onClick={toggleDarkMode} className="ml-[10px]">
            {isDarkMode ? (
              <LightModeIcon
                style={{ fontSize: "20px" }}
                className="hover:text-[#ec7211] cursor-pointer"
              />
            ) : (
              <DarkModeIcon
                style={{ fontSize: "20px" }}
                className="hover:text-[#ec7211] cursor-pointer"
              />
            )}
          </div>
          {/* <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="ml-2"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
