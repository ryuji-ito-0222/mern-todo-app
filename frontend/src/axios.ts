import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mern-todo-0122.herokuapp.com',
});

export default instance;
