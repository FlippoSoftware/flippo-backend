import { AuthEnv } from "@schemas/index.ts";
import crypto from "crypto";

const PrivateKeyObject = crypto.createPrivateKey({
  key: Buffer.from(AuthEnv.AUTH_PRIVATE_KEY.replace(/\\n/g, "\n")),
  format: "pem",
  type: "pkcs8"
});

export { PrivateKeyObject };
