import { AuthEnv } from "@schemas/index.ts";
import crypto from "crypto";

const PublicKeyObject = crypto.createPublicKey({
  key: AuthEnv.AUTH_PUBLIC_KEY.replace(/\\n/g, "\n"),
  format: "pem"
});

export { PublicKeyObject };
