import axios from "axios";

import { AppEnv } from "@env/app.env";

const api = axios.create({
  baseURL: AppEnv.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        await axios.get(`${AppEnv.NEXT_PUBLIC_API_BASE_URL}/auth/refresh_token/refresh`, {
          withCredentials: true
        });

        return api.request(originalRequest);
      } catch {
        console.log("Unauthorized");
        return;
      }
    }

    return;
  }
);

export { api };
