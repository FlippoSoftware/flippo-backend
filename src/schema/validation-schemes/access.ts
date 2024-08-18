import { record } from "@lib/zod";
import { z } from "zod";

const PermissionType = z.union([z.literal("view"), z.literal("edit")]);
type TPermissionType = z.infer<typeof PermissionType>;

const ResourceType = z.union([record("set"), record("folder")]);
type TResourceType = z.infer<typeof ResourceType>;

const AccessSchema = z.object({
  id: record("access"),
  user: record("user"),
  permission: PermissionType,
  resource: ResourceType
});

type TAccess = z.infer<typeof AccessSchema>;

export {
  ResourceType,
  type TResourceType,
  PermissionType,
  type TPermissionType,
  AccessSchema,
  type TAccess
};
