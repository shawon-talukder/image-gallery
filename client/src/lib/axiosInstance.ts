import axios from "axios";

const instance = axios.create({
  baseURL: "https://image-gallery-api-f02d.onrender.com/api/v1/image",
  timeout: 1000,
});

export default instance;
