import { record } from "@lib/schemas/db/record";
import { z } from "zod";
import { SourceType } from "./source";

const ViewType = z.union([
  z.literal("like"),
  z.literal("person"),
  z.literal("publication"),
  z.literal("available")
]);
type TViewType = z.infer<typeof ViewType>;

const RoleType = z.union([z.literal("observer"), z.literal("editor"), z.literal("owner")]);
type TRoleType = z.infer<typeof RoleType>;

const RelationshipSchema = z.object({
  id: record("relationship"),
  in: record("user"),
  out: SourceType,
  viewType: ViewType,
  role: RoleType
});

type TRelationship = z.infer<typeof RelationshipSchema>;

export {
  ViewType,
  type TViewType,
  RoleType,
  type TRoleType,
  RelationshipSchema,
  type TRelationship
};
