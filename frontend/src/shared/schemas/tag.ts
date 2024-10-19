import { z } from "zod";

import { record } from "./record.schema";

const TagSchema = z.object({
  id: record("tag"),
  name: z.string(),
  owner: record("user"),
  created: z.coerce.date(),
  updated: z.coerce.date()
});

type TTag = z.infer<typeof TagSchema>;

export { TagSchema, type TTag };
