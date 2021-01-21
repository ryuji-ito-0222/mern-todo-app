import axios from 'axios';

const instance = axios.create({
  baseURL: "your base URL",
});

export default instance;
