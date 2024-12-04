import Cookies from 'js-cookie';

const AUTH_COOKIE_NAME = 'dbToken';

export function getDbTokenCookie(): string | undefined {
  return Cookies.get(AUTH_COOKIE_NAME);
}

export function removeDbTokenCookie(): void {
  Cookies.remove(AUTH_COOKIE_NAME);
}
