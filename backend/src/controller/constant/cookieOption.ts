import stringToUnixSeconds from "@utils/jwt/stringToUnixSeconds.ts";
import { type CookieOptions } from "express";

const DOMAIN = "localhost";

const accessTokenCookieOptions: CookieOptions = {
  maxAge: stringToUnixSeconds("15min") * 1000, // 15 mins
  httpOnly: true,
  domain: DOMAIN,
  path: "/auth",
  sameSite: "lax",
  secure: false
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: stringToUnixSeconds("24w") * 1000, //23 weeks
  path: "/auth/refresh_token"
};

const refreshTokenClearCookieOptions: CookieOptions = {
  httpOnly: true,
  domain: DOMAIN,
  path: "/auth/refresh_token"
};

const accessTokenClearCookieOptions = {
  httpOnly: true,
  domain: DOMAIN,
  path: "/auth"
};

const codeVerifierCookieOptions: CookieOptions = {
  maxAge: stringToUnixSeconds("5mins") * 1000, // 5 mins
  httpOnly: true,
  sameSite: "lax"
};

const dbTokenCookieOptions: CookieOptions = {
  maxAge: stringToUnixSeconds("1min") * 1000, // 15 mins
  httpOnly: false,
  domain: DOMAIN,
  sameSite: "lax"
};

const registrationEmailCookieOptions: CookieOptions = {
  maxAge: stringToUnixSeconds("1h") * 1000, // 1 hour
  httpOnly: true,
  domain: DOMAIN,
  path: "/",
  sameSite: "lax"
};

const registrationEmailClearCookieOptions = {
  httpOnly: true,
  domain: DOMAIN,
  path: "/"
};

export {
  accessTokenCookieOptions,
  accessTokenClearCookieOptions,
  refreshTokenCookieOptions,
  refreshTokenClearCookieOptions,
  codeVerifierCookieOptions,
  dbTokenCookieOptions,
  registrationEmailCookieOptions,
  registrationEmailClearCookieOptions
};
