import { Surreal } from "surrealdb.js";
import { env } from "@schema/validation-schemes/env";

const endpoint: string = env.SURREALDB_ENDPOINT;
const namespace: string = env.SURREALDB_NS;
const database: string = env.SURREALDB_DB;

let surreal: Surreal;

const initSurreal = async (
  endpoint: string,
  namespace: string,
  database: string
): Promise<void> => {
  surreal = new Surreal();

  await surreal.connect(endpoint);
  await surreal.use({ namespace, database });

  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token");
    if (token)
      await surreal.authenticate(token).catch((e: unknown) => {
        console.warn(`Failed to authenticate: ${e}`);
      });
  }
};

const getSurreal = (): Surreal => {
  if (!surreal) {
    initSurreal(endpoint, namespace, database);
  }

  return surreal;
};

export { getSurreal };
