import * as VKID from "@vkid/sdk";

/** https://id.vk.com/about/business/go/docs/ru/vkid/latest/vk-id/connection/start-integration/web/setup 
 *  app: - Идентификатор приложения.
    redirectUrl - Адрес для перехода после авторизации.
    state - Произвольная строка состояния приложения.
    codeVerifier - Верификатор в виде случайной строки. Обеспечивает защиту передаваемых данных.
    scope - Список прав доступа, которые нужны приложению.
    mode - формат авторизации.
*/
VKID.Config.init({
  app: 52262175,
  redirectUrl: "http://localhost:3030/api/auth",
  state: "dj29fnsadjsd82",
  codeVerifier: "FGH767Gd65",
  scope: "vkid.personal_info email",
  mode: VKID.ConfigAuthMode.Redirect
});

const vkLogin = () => {
  VKID.Auth.login();
};

export { vkLogin };
