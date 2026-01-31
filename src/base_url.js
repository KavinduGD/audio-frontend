import axios from "axios";

const admin_axios = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

export default admin_axios;
