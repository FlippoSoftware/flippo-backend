import axios, { type AxiosRequestConfig } from "axios";
import { createEffect } from "effector";
import { ENV } from "@env/app.env";

const api = axios.create({
  baseURL: `${ENV.API_BASE_URL}`,
  timeout: 1000,
  validateStatus: (status) => status >= 200 && status < 300
});

type Request = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  options?: AxiosRequestConfig;
};

export const requestFx = createEffect<Request, any, string>((request) => {
  return api({
    method: request.method,
    url: request.url,
    data: request.body,
    ...request.options
  })
    .then((response) => response.data)
    .catch((response) => {
      return Promise.reject(response.request.status.toString());
    });
});
