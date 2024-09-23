import { z } from "zod";

const providerId = <Provider extends string>(provider: Provider) =>
  z.custom<`${Provider}:${string}`>(
    (val) => {
      return typeof val === "string" && provider ? val.startsWith(provider + ":") : false;
    },
    {
      message: `Provider must be: "${provider}"`
    }
  );

export { providerId };
