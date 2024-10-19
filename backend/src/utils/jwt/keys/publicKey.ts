import crypto from "crypto";

import { ENV } from "@schemas/index.ts";

const PublicKeyObject = crypto.createPublicKey({
  key: ENV.AUTH_PUBLIC_KEY.replace(/\\n/g, "\n"),
  format: "pem"
});

export { PublicKeyObject };
