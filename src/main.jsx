import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { DarkModeProvider } from "./context/dark_mode_context.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PreDataContextProvider } from "./context/pre_data_context.jsx";
import { InputDataContextProvider } from "./context/input_data_context.jsx";
import { JobsContextProvider } from "./context/jobs_context.jsx";
import "react-h5-audio-player/lib/styles.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DarkModeProvider>
      <PreDataContextProvider>
        <InputDataContextProvider>
          <JobsContextProvider>
            <App />
          </JobsContextProvider>
        </InputDataContextProvider>
        <ToastContainer toastStyle={{ borderRadius: "0px" }} />
      </PreDataContextProvider>
    </DarkModeProvider>
  </BrowserRouter>
);
