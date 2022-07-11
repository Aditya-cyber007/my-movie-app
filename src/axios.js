import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/search/movie?api_key=b4290f0d5e2c74d8fd3bf4f705346779&query=",
});

export default instance;
