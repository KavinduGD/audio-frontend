import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useDarkModeContext } from "../../hooks/use_dark_mode_context";

function Sidebar() {
  const { isDarkMode } = useDarkModeContext();
  const [side_bar_width, setSideBarWidth] = useState(250);
  return (
    <div
      style={{ width: `${side_bar_width}px` }}
      className="dark:bg-[#2A2E33] border-r-[1px] border-[#C5CACC] dark:border-none"
    >
      {side_bar_width == 250 ? (
        <div className="flex-col">
          <div className="flex justify-between border-b-[1px] border-[#C5CACC] pr-[20px] pl-[30px] py-[20px] dark:border-[#414750]">
            <Link to="/">
              <p className="text-[18px] hover:text-text_blue font-bold cursor-pointer">
                Console Home
              </p>
            </Link>
            <CloseSharpIcon
              sx={{
                fontSize: "22px",

                cursor: "pointer",
                iconColor: isDarkMode ? "#D5DBDB" : "#1f2937",
              }}
              onClick={() => {
                setSideBarWidth(side_bar_width === 250 ? 40 : 250);
              }}
            />
          </div>

          <div className="w-full pl-[30px] flex flex-col gap-[3px] mt-[10px]">
            <NavLink to="/data">
              <p className="text-[14px] hover:text-text_blue text-light_grey dark:text-dark_grey">
                Data management
              </p>
            </NavLink>
            <NavLink to="/create-jobs">
              <p className="text-[14px] hover:text-text_blue text-light_grey dark:text-dark_grey">
                Create Jobs
              </p>
            </NavLink>
            <NavLink to="/jobs">
              <p className="text-[14px] hover:text-text_blue text-light_grey dark:text-dark_grey">
                Jobs management
              </p>
            </NavLink>
            <NavLink to="/train">
              <p className="text-[14px] hover:text-text_blue text-light_grey dark:text-dark_grey">
                Train model
              </p>
            </NavLink>
            <NavLink to="/deploy">
              <p className="text-[14px] hover:text-text_blue text-light_grey dark:text-dark_grey">
                Deploy model
              </p>
            </NavLink>
            <NavLink to="/mobile">
              <p className="text-[14px] hover:text-text_blue text-light_grey dark:text-dark_grey">
                Mobile management
              </p>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-[7px]">
          <MenuIcon
            sx={{
              fontSize: "22px",
              cursor: "pointer",
              color: isDarkMode ? "#D5DBDB" : "#1f2937",
            }}
            onClick={() => {
              setSideBarWidth(side_bar_width === 250 ? 40 : 250);
            }}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
