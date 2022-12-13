import axios from 'axios';
// import { API_URL } from '../../constants';

let BackendAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL+'/api/v1',
    timeout: 10000,
});

let IMDBAPI = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 10000
})
let token;

export const setClientToken = token => {
  if (token?.length > 0) {
    APIKit.interceptors.request.use(function(config) {
    config.headers.Authorization = `Token ${token}`;
    return config;
    });
  }
};

export {BackendAPI, IMDBAPI};