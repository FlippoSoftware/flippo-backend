import { record } from "@lib/zod";
import { z } from "zod";

const FolderToSchema = z.object({
  id: record("folder_to"),
  in: record("folder"),
  out: z.union([record("set"), record("access"), record("publication")])
});

type TFolderTo = z.infer<typeof FolderToSchema>;

export { FolderToSchema, type TFolderTo };
