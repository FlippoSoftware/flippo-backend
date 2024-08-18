import { record } from "@lib/zod";
import { z } from "zod";

const SourceType = z.union([record("folder"), record("set")]);
type TSourceType = z.infer<typeof SourceType>;

const PublicationSchema = z.object({
  id: record("publication"),
  author: record("user"),
  source: SourceType,
  created: z.coerce.date(),
  updated: z.coerce.date()
});

type TPublication = z.infer<typeof PublicationSchema>;

export { SourceType, type TSourceType, PublicationSchema, type TPublication };
