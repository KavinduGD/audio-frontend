import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import DataSet from "./pages/data";
import { useDarkModeContext } from "./hooks/use_dark_mode_context";
import Job from "./pages/create-jobs";
import JobsTable from "./pages/jobs";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <div className=" text-black dark:bg-[#16191F] dark:text-white font-amazon_ember">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex ">
        <Sidebar />
        <div className="flex-1 bg-[#F2F3F3] dark:bg-[#16191F] px-[50px] pt-[20px] min-h-screen overflow-y-scroll">
          <Routes>
            <Route path="/data" element={<DataSet />} />
            <Route path="/create-jobs" element={<Job />} />
            <Route path="/jobs" element={<JobsTable />} />
            <Route path="/train" element={<div>Train</div>} />
            <Route path="/deploy" element={<div>Deploy</div>} />
            <Route path="/mobile" element={<div>Mobile</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
