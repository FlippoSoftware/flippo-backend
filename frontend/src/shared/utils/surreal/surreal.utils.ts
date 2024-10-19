import { Surreal } from "surrealdb";

const ENDPOINT: string = "http://localhost:3031/rpc";
const NAMESPACE: string = "flippo";
const DATABASE: string = "flippo";

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
    const token: string | null = localStorage.getItem("token");
    if (token)
      await surreal.authenticate(token).catch((e: unknown) => {
        console.warn(`Failed to authenticate: ${e}`);
      });
  }
};

const getSurreal = (): Surreal => {
  if (!surreal) {
    initSurreal(ENDPOINT, NAMESPACE, DATABASE);
  }

  return surreal;
};

export { getSurreal };
