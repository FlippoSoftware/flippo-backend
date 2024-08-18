import { record } from "@lib/zod";
import { z } from "zod";

const GestaltType = z.union([z.literal("list"), z.literal("random")]);
type TGestaltType = z.infer<typeof GestaltType>;

const GestaltState = z.union([z.literal("list"), z.literal("repetition")]);
type TGestaltState = z.infer<typeof GestaltType>;

const GestaltSchema = z.object({
  id: record("gestalt"),
  in: record("user"),
  out: record("set"),
  type: GestaltType,
  state: GestaltState,
  list_index: z.number().int().positive(),
  repetition_index: z.number().int().positive(),
  random_list: z.array(record("card"))
});

type TGestalt = z.infer<typeof GestaltSchema>;

export {
  GestaltType,
  type TGestaltType,
  GestaltState,
  type TGestaltState,
  GestaltSchema,
  type TGestalt
};
