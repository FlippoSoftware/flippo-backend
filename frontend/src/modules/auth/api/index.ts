import { type TSession } from '@settings/session';
import { requestFx } from '@shared/api';
import { createEffect } from 'effector';

export const requestVerificationCodeFx = createEffect<string, void, string>((email: string) => {
  return requestFx({
    body: { email: email },
    method: 'POST',
    options: {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    },
    url: `/generate_verification_code`
  });
});

export type TPkceResponse = {
  codeChallenge: string;
};

export const requestPkceFx = createEffect<void, TPkceResponse, string>(() => {
  return requestFx({
    method: 'GET',
    options: {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true
    },
    url: `/pkce`
  });
});

export const checkVerificationCodeFx = createEffect<{ code: string; email: string }, void, string>(
  ({ code, email }) => {
    return requestFx({
      body: { code, email },
      method: 'POST',
      options: {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      },
      url: `/check_verification_code`
    });
  }
);

export const signInWithEmailFx = createEffect<string, TSession, string>((email) => {
  return requestFx({
    body: { email },
    method: 'POST',
    options: {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    },
    url: `/sign_in_with_email`
  });
});

export const signUpWithEmailFx = createEffect<{ email: string; username: string }, TSession, string>(
  ({ email, username }) => {
    return requestFx({
      body: { email, username },
      method: 'POST',
      options: {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      },
      url: `/sign_up_with_email`
    });
  }
);
