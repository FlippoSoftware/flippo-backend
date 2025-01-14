import { type ZodSchema } from "zod";

export const parseConfig = (configObj: Record<string, unknown>, configSchema: ZodSchema) => {
  const parseResult = configSchema.safeParse(configObj);

  if (!parseResult.success) throw parseResult.error;

  return parseResult.data;
};
