import { z } from "zod";

import { record } from "./record.schema";

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
  listIndex: z.number().int().positive(),
  repetitionIndex: z.number().int().positive(),
  randomList: z.array(record("card"))
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
