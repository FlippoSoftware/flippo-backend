import { ENV } from '@env/app.env';
import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { createEffect } from 'effector';

const api = axios.create({
  baseURL: `${ENV.API_BASE_URL}`,
  timeout: 1000,
  validateStatus: (status) => status >= 200 && status < 300
});

type Request = {
  body?: unknown;
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
  options?: AxiosRequestConfig;
  url: string;
};

export const requestFx = createEffect<Request, any, string>((request) => {
  return (
    api({
      data: request.body,
      method: request.method,
      url: request.url,
      ...request.options
    })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then((response: AxiosResponse) => response.data)
      .catch((error: AxiosError) => {
        let status: string = '';
        if (error.response) {
          status = error.response.status.toString();
        } else if (error.request) {
          status = (error.request as { [key: string]: unknown; status: number }).status.toString();
        } else if (error.status) {
          status = error.status.toString();
        }

        return Promise.reject<string>(status);
      })
  );
});
