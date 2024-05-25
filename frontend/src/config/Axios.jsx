import axios from "axios";

// Create a new Axios instance
const Axios = axios.create({
  baseURL: 'http://localhost:4000',
});

export default Axios;
