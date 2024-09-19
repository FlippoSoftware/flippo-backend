import { record } from "@lib/schemas/db/record";
import { z } from "zod";

const RepetitionSchema = z.object({
  id: record("repetition"),
  in: record("user"),
  out: record("set"),
  cards: z.array(record("card"))
});

type TRepetition = z.infer<typeof RepetitionSchema>;

export { RepetitionSchema, type TRepetition };
