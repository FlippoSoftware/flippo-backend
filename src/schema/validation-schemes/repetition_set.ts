import { record } from "@lib/zod";
import { z } from "zod";

const RepetitionSetSchema = z.object({
  id: record("repetition_set"),
  in: record("repetition"),
  out: record("set")
});

type TRepetitionSet = z.infer<typeof RepetitionSetSchema>;

export { RepetitionSetSchema, type TRepetitionSet };
