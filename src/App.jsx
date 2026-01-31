import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import DataSet from "./pages/data";
import { useDarkModeContext } from "./hooks/use_dark_mode_context";
import Job from "./pages/create-jobs";
import JobsTable from "./pages/jobs";
import Login from "./pages/login";
import ProtectedRoute from "./components/protected_route";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className=" text-black dark:bg-[#16191F] dark:text-white font-amazon_ember">
      {!isLoginPage && (
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      )}
      <div className={!isLoginPage ? "flex" : ""}>
        {!isLoginPage && <Sidebar />}
        <div
          className={
            !isLoginPage
              ? "flex-1 bg-[#F2F3F3] dark:bg-[#16191F] px-[50px] pt-[20px] min-h-screen overflow-y-scroll"
              : ""
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/data" element={<DataSet />} />
              <Route path="/create-jobs" element={<Job />} />
              <Route path="/jobs" element={<JobsTable />} />
              <Route path="/" element={<div>Under Development</div>} />
              <Route path="/train" element={<div>Under Development</div>} />
              <Route path="/deploy" element={<div>Under Development</div>} />
              <Route path="/mobile" element={<div>Under Development</div>} />
            </Route>
           <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
