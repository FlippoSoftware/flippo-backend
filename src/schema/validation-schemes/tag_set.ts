import { record } from "@lib/zod";
import { z } from "zod";

const TagSetSchema = z.object({
  id: record("tag_set"),
  in: record("tag"),
  out: record("set")
});

type TTagSet = z.infer<typeof TagSetSchema>;

export { TagSetSchema, type TTagSet };
