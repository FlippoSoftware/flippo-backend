import crypto from "crypto";

import { ENV } from "@schemas/index.ts";

const PrivateKeyObject = crypto.createPrivateKey({
  key: Buffer.from(ENV.AUTH_PRIVATE_KEY.replace(/\\n/g, "\n")),
  format: "pem",
  type: "pkcs8"
});

export { PrivateKeyObject };
