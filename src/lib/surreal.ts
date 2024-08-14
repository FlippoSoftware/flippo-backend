import { Surreal } from "surrealdb.js";
import { env } from "@schema/validation-schemes/env";

const endpoint: string = env.SURREALDB_ENDPOINT;
const namespace: string = env.SURREALDB_NS;
const database: string = env.SURREALDB_DB;

let surreal: Surreal | undefined;

const initSurreal = async (
  endpoint: string,
  namespace: string,
  database: string
): Promise<void> => {
  surreal = new Surreal();

  try {
    await surreal.connect(endpoint);
    await surreal.use({ namespace, database });

    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("token");
      if (token)
        await surreal.authenticate(token).catch((error: unknown) => {
          console.warn(`Failed to authenticate: ${error}`);
        });
    }
  } catch (error: unknown) {
    console.error("Failed to connect to SurrealDB:", error);
  }
};

const closeSurreal = async (): Promise<void> => {
  if (!surreal) return;
  await surreal.close();
  surreal = undefined;
};

const getSurreal = (): Surreal | undefined => {
  if (!surreal) {
    initSurreal(endpoint, namespace, database);
  }

  return surreal;
};

export { getSurreal, closeSurreal, endpoint, namespace, database };
