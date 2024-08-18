import { record } from "@lib/zod";
import { z } from "zod";

const FolderAssign = z.union([record("set"), record("access"), record("publication")]);
type TFolderAssign = z.infer<typeof FolderAssign>;

const FolderToSchema = z.object({
  id: record("folder_to"),
  in: record("folder"),
  out: FolderAssign
});

type TFolderTo = z.infer<typeof FolderToSchema>;

export { FolderAssign, type TFolderAssign, FolderToSchema, type TFolderTo };
