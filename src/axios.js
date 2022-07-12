import axios from "axios";
const instance = axios.create({
  baseURL: "https://www.omdbapi.com/?apikey=28fd471d&s=",
});

export default instance;