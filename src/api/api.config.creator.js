import axios from 'axios';

export const instance = axios.create({
  baseURL: `https://book-crud-app-default-rtdb.firebaseio.com/`,
  headers: {
    'Content-Type': 'application/json',
  },
});