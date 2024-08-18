import { record } from "@lib/zod";
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
  extended_answer: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
  state: StateType,
  editors: z.set(record("user"))
});

type TCard = z.infer<typeof CardSchema>;

export { StateType, type TStateType, CardSchema, type TCard };
