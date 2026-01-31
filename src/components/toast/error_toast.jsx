import { toast } from "react-toastify";

const ErrorToastLight = (message) => {
  toast.error(message, {
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
const ErrorToastDark = (message) => {
  toast.error(message, {
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
      background: "#B43E32",
    },
  });
};

const ErrorToast = (mode, message) => {
  if (!mode) {
    ErrorToastLight(message);
  } else {
    ErrorToastDark(message);
  }
};

export default ErrorToast;
