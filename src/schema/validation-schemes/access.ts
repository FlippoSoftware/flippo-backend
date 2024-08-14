import { record } from "@lib/zod";
import { z } from "zod";

const AccessSchema = z.object({
  id: record("access"),
  user: record("user"),
  permission: z.enum(["view", "edit"]),
  resource: z.union([record("set"), record("folders")])
});

type TAccess = z.infer<typeof AccessSchema>;

export { AccessSchema, type TAccess };
