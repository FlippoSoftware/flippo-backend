import crypto from "crypto";

import { ENV } from "@schemas/index.ts";

const DbPrivateKey = crypto.createPrivateKey({
  key: Buffer.from(ENV.SURREALDB_PRIVATE_KEY.replace(/\\n/g, "\n")),
  format: "pem",
  type: "pkcs8"
});

export { DbPrivateKey };
