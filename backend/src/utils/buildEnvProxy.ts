export const buildEnvProxy = <T extends Record<string, unknown>>(
  envSources: {
    source: Partial<T>;
    transformKey?: (key: string) => string;
  }[]
) =>
  new Proxy({} as T, {
    get(_, key) {
      return envSources
        .map(({ source, transformKey }) => {
          const keyStr = String(key);
          const envKey = transformKey ? transformKey(keyStr) : keyStr;

          return source[envKey];
        })
        .find((v) => v !== undefined);
    }
  });
