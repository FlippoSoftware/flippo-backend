import { record } from "@lib/schemas/db/record";
import { z } from "zod";
import { SourceType } from "./source";

const PublicationSchema = z.object({
  id: record("publication"),
  in: record("user"),
  out: SourceType,
  author: record("user"),
  created: z.coerce.date(),
  updated: z.coerce.date()
});

type TPublication = z.infer<typeof PublicationSchema>;

export { PublicationSchema, type TPublication };
