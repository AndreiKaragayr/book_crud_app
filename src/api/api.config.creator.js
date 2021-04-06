import axios from 'axios';

export const instance = axios.create({
  baseURL: `https://r-books-library-default-rtdb.firebaseio.com/`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': true,
  },
});