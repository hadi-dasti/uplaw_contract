import axios from "axios";

const url = "http://localhost:3000/api/v1";

axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  get: axios.get,
  post: axios.post,
  url,
};
