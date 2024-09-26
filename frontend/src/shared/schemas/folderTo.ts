import { record } from "./record.schema";
import { z } from "zod";

const FolderToSchema = z.object({
  id: record("folderTo"),
  in: record("folder"),
  out: record("set")
});

type TFolderTo = z.infer<typeof FolderToSchema>;

export { FolderToSchema, type TFolderTo };
