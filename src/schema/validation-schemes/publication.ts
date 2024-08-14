import { record } from "@lib/zod";
import { z } from "zod";

const PublicationSchema = z.object({
  id: record("publication"),
  author: record("user"),
  source: z.union([record("folder"), record("set")]),
  created: z.coerce.date(),
  updated: z.coerce.date()
});

type TPublication = z.infer<typeof PublicationSchema>;

export { PublicationSchema, type TPublication };
