import axios from "axios";

const admin_axios = axios.create({
  baseURL: "https://audio-backend.kavindu-gihan.livee/",
});

// http://127.0.0.1:5000/
export default admin_axios;
