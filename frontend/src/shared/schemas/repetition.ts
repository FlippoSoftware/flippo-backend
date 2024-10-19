import { z } from "zod";

import { record } from "./record.schema";

const RepetitionSchema = z.object({
  id: record("repetition"),
  in: record("user"),
  out: record("set"),
  cards: z.array(record("card"))
});

type TRepetition = z.infer<typeof RepetitionSchema>;

export { RepetitionSchema, type TRepetition };
