import { record } from "./record.schema";
import { z } from "zod";

const SetSchema = z.object({
  id: record("set"),
  author: record("user"),
  name: z.string(),
  description: z.string(),
  countCards: z.number().int().positive(),
  cards: z.array(record("card")),
  publication: record("publication"),
  created: z.coerce.date(),
  updated: z.coerce.date()
});

type TSet = z.infer<typeof SetSchema>;

export { SetSchema, type TSet };
