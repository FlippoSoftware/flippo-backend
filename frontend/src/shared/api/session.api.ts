import { createEffect } from "effector";
import { type TSession } from "@shared/models/session.store";

import { requestFx } from "./request.api";

export const sessionAuthFx = createEffect<void, TSession, string>(() => {
  return requestFx({
    url: "/auth",
    method: "GET",
    options: {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    }
  });
});

export const sessionRefreshFx = createEffect<void, void, string>(() => {
  return requestFx({
    url: "/auth/refresh_token/refresh",
    method: "GET",
    options: {
      withCredentials: true
    }
  });
});

export const sessionSignOutFx = createEffect<void, void, string>(() => {
  return requestFx({
    url: "/auth/refresh_token/signout",
    method: "POST",
    options: {
      withCredentials: true
    }
  });
});

export const requestDbTokenFx = createEffect<void, void, string>(() => {
  return requestFx({
    url: "/auth/token_db",
    method: "GET",
    options: {
      withCredentials: true
    }
  });
});
