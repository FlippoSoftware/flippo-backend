import { type Express } from "express";
import errorOauth from "@middleware/errorOauth.middleware.ts";
import errorRequest from "@middleware/errorRequest.middelware.ts";
import auth from "@middleware/auth.middleware.ts";
import { UserController } from "@controller/user.controller.ts";
import { EmailController } from "@controller/email.controller.ts";
import { TokenController } from "@controller/token.controller.ts";
import { PkceController } from "@controller/pkce.controller.ts";

function routes(app: Express) {
  app.get("/auth", auth, TokenController.auth, errorRequest);
  app.post("/auth/refresh_token/signout", UserController.signOut, errorRequest);
  app.get("/auth/refresh_token/refresh", TokenController.refresh, errorRequest);
  app.get("/auth/token_db", auth, TokenController.getDbToken, errorRequest);

  app.get("/oauth/google", UserController.oauthGoogle, errorOauth);
  app.get("/oauth/vkontakte", UserController.oauthVkontakte, errorOauth);
  app.get("/oauth/yandexID", UserController.oauthYandex, errorOauth);

  app.post("/sign_in_with_email", UserController.signInWitEmail, errorRequest);
  app.post("/sign_up_with_email", UserController.signUpWithEmail, errorRequest);

  app.get("/pkce", PkceController.generatePkce, errorRequest);
  app.post("/generate_verification_code", EmailController.generateVerificationCode, errorRequest);
  app.post("/check_verification_code", EmailController.verifyCode, errorRequest);
}

export default routes;
