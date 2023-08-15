import axios from "axios";
import { translateErrors } from "../helpers";

import {
  StatusCodes,
} from 'http-status-codes';

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "Application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  if (
    token &&
    (!config.headers.non_auth || config.headers.non_auth === "false")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  delete config.headers.non_auth;
  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;
    const { status } = response;
    if (status >= StatusCodes.INTERNAL_SERVER_ERROR) {
      alert("Unknown error, Something went wrong!");
    }
    if (status === 401 && error.config.url === "auth/refresh") {
      localStorage.removeItem("accessToken");
      // localStorage.removeItem('verificationIsAuth');
      window.location.href = "/login";
    }
    if (status === StatusCodes.UNPROCESSABLE_ENTITY) {
      const { errors } = response.data;
      response.data.errors = translateErrors(errors);
    }
    if (status === StatusCodes.BAD_REQUEST) {
      const { message } = response.data;
      response.data.errors = translateErrors([{ message }]);
    }
    throw error;
  }
);

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};
const refreshToken = () => {
  return api
    .post("auth/refresh", {
      refresh_token: localStorage.getItem("refreshToken"),
    })
    .then(({ data }) => {
      const { data: response } = data;
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("accessToken", response.accessToken);
      return {
        accessToken: response.accessToken,
      };
    });
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({
            resolve,
            reject,
          });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      return refreshToken()
        .then((data) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + data.accessToken;
          originalRequest.headers["Authorization"] =
            "Bearer " + data.accessToken;
          processQueue(null, data.accessToken);
          isRefreshing = false;
          return axios(originalRequest);
        })
        .catch((err) => {
          processQueue(err, null);
          localStorage.removeItem("accessToken");
          // localStorage.removeItem('verificationIsAuth');
          window.location.href = "/login";
          isRefreshing = false;
        });
    }

    return Promise.reject(err);
  }
);