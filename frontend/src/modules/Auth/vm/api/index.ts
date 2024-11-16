import { createEffect } from "effector";
import { requestFx } from "@shared/api/request.api";
import { type TSession } from "@shared/models/session.store";

export const requestVerificationCodeFx = createEffect<string, void, string>((email: string) => {
  return requestFx({
    url: `/generate_verification_code`,
    method: "POST",
    body: { email: email },
    options: {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    }
  });
});

export type TPkceResponse = {
  codeChallenge: string;
};

export const requestPkceFx = createEffect<void, TPkceResponse, string>(() => {
  return requestFx({
    url: `/pkce`,
    method: "GET",
    options: {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true
    }
  });
});

export const checkVerificationCodeFx = createEffect<{ code: string; email: string }, void, string>(
  ({ code, email }) => {
    return requestFx({
      url: `/check_verification_code`,
      method: "POST",
      body: { code, email },
      options: {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      }
    });
  }
);

export const signInWithEmailFx = createEffect<string, TSession, string>((email) => {
  return requestFx({
    url: `/sign_in_with_email`,
    method: "POST",
    body: { email },
    options: {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    }
  });
});

export const signUpWithEmailFx = createEffect<
  { username: string; email: string },
  TSession,
  string
>(({ username, email }) => {
  return requestFx({
    url: `/sign_up_with_email`,
    method: "POST",
    body: { username, email },
    options: {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    }
  });
});
