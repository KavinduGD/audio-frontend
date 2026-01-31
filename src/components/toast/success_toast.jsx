import { green } from "@mui/material/colors";
import { toast } from "react-toastify";

const SuccessToastLight = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
    bodyStyle: {
      fontSize: "16px",
      color: "#fff",
      fontWeight: "bold",
      fontFamily: "Amazon Ember",
    },
  });
};
const SuccessToastDark = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "light",
    bodyStyle: {
      fontSize: "16px",
      color: "#000",
      fontWeight: "bold",
      fontFamily: "Amazon Ember",
    },
    progressStyle: {
      background: "#09930D",
    },
  });
};

const SuccessToast = (mode, message) => {
  if (!mode) {
    SuccessToastLight(message);
  } else {
    SuccessToastDark(message);
  }
};
export default SuccessToast;
