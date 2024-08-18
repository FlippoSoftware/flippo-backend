"use client";

import { AccessSchema, PermissionType, TAccess } from "@schema/validation-schemes";
import { z } from "zod";
import { getSurreal } from "@lib/surreal";
import { record } from "@lib/zod";

async function fetchAccesses() {
  const accesses = await getSurreal().select<TAccess>("access");
  return z.array(AccessSchema).parse(accesses);
}

async function fetchAccess(id: TAccess["id"]) {
  id = record("access").parse(id);

  const access = await getSurreal().select<TAccess>(id);
  return await AccessSchema.parseAsync(access).catch(() => undefined);
}

async function createAccess({
  user,
  permission,
  resource
}: Pick<TAccess, "user" | "permission" | "resource">) {
  user = record("user").parse(user);
  permission = PermissionType.parse(permission);
  resource = z.union([record("set"), record("folder")]).parse(resource);

  const [result] = await getSurreal().create<
    TAccess,
    Pick<TAccess, "user" | "permission" | "resource">
  >("access", { user, permission, resource });
  return await AccessSchema.parseAsync(result).catch(() => undefined);
}

async function updateAccess(
  id: TAccess["id"],
  { permission }: Partial<Pick<TAccess, "user" | "permission" | "resource">>
) {
  id = record("access").parse(id);
  permission = PermissionType.optional().parse(permission);

  const [result] = await getSurreal().merge<TAccess, Partial<Pick<TAccess, "permission">>>(id, {
    permission
  });
  return await AccessSchema.parseAsync(result).catch(() => undefined);
}

async function deleteAccess(id: TAccess["id"]) {
  id = record("access").parse(id);

  const [result] = await getSurreal().delete<TAccess>(id);
  return await AccessSchema.parseAsync(result).catch(() => undefined);
}

export { fetchAccesses, fetchAccess, createAccess, updateAccess, deleteAccess };
