import { record } from "@lib/zod";
import { z } from "zod";

const CardSchema = z.object({
  id: record("card"),
  owner: record("set"),
  question: z.string(),
  answer: z.string(),
  extended_answer: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
  state: z.enum(["none", "reserved", "process", "ready"]),
  editors: z.set(record("user"))
});

type TCard = z.infer<typeof CardSchema>;

export { CardSchema, type TCard };
