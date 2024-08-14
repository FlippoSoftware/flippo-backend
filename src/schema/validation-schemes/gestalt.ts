import { record } from "@lib/zod";
import { z } from "zod";

const GestaltSchema = z.object({
  id: record("gestalt"),
  owner: record("user"),
  type: z.enum(["list", "random"]),
  state: z.enum(["list", "repetition"]),
  list_index: z.number().int().positive(),
  repetition_index: z.number().int().positive(),
  random_list: z.array(record("card")).optional()
});

type TGestalt = z.infer<typeof GestaltSchema>;

export { GestaltSchema, type TGestalt };
