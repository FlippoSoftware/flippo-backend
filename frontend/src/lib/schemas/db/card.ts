import { record } from "@lib/schemas/db/record";
import { z } from "zod";

const StateType = z.union([
  z.literal("none"),
  z.literal("reserved"),
  z.literal("process"),
  z.literal("ready")
]);
type TStateType = z.infer<typeof StateType>;

const CardSchema = z.object({
  id: record("card"),
  set: record("set"),
  question: z.string(),
  answer: z.string(),
  extendedAnswer: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
  state: StateType,
  editors: z.array(record("user"))
});

type TCard = z.infer<typeof CardSchema>;

export { StateType, type TStateType, CardSchema, type TCard };
