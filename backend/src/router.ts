import { UserController } from "@controller/user.controller.ts";
import { Express } from "express";

function routes(app: Express) {
  app.get("/api/auth/google", UserController.oauthGoogle);
  app.get("/api/auth/vkontakte");
  app.get("/api/auth/email");

  app.get("/api/refresh");
}

export default routes;
