import { record } from "@lib/zod";
import { z } from "zod";

const RepetitionSchema = z.object({
  id: record("repetition"),
  owner: record("user"),
  cards: z.array(record("card"))
});

type TRepetition = z.infer<typeof RepetitionSchema>;

export { RepetitionSchema, type TRepetition };
