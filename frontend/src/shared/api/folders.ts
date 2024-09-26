"use client";

import { FolderSchema, TFolder } from "@schemas/index";
import { z } from "zod";
import { getSurreal } from "@shared/utils/surreal/surreal.utils";
import { record } from "@lib/schemas/db/record";

async function fetchFolders() {
  const folders = await getSurreal().select<TFolder>("folder");
  return await z.array(FolderSchema).parse(folders);
}

async function fetchFoldersName() {
  const folders = await getSurreal().query<[Pick<TFolder, "id" | "name">[]]>(/* surrealql */ `
      SELECT id, name FROM folder;
    `);
  return await z.array(FolderSchema.pick({ id: true, name: true })).parse(folders);
}

async function fetchFolder(id: TFolder["id"]) {
  id = record("folder").parse(id);

  const folder = await getSurreal().select<TFolder>(id);
  return await FolderSchema.parseAsync(folder).catch(() => undefined);
}

async function createFolder({ name }: Pick<TFolder, "name">) {
  name = z.string().parse(name);

  const [result] = await getSurreal().create<TFolder, Pick<TFolder, "name">>("folder", { name });
  return await FolderSchema.parseAsync(result).catch(() => undefined);
}

async function updateFolder(id: TFolder["id"], { name }: Partial<Pick<TFolder, "name">>) {
  id = record("folder").parse(id);
  name = z.string().optional().parse(name);

  const [result] = await getSurreal().merge<TFolder, Partial<Pick<TFolder, "name">>>(id, {
    name
  });
  return await FolderSchema.parseAsync(result).catch(() => undefined);
}

async function deleteFolder(id: TFolder["id"]) {
  id = record("folder").parse(id);

  const [result] = await getSurreal().delete<TFolder>(id);
  return await FolderSchema.parseAsync(result).catch(() => undefined);
}
export { fetchFolders, fetchFoldersName, fetchFolder, createFolder, updateFolder, deleteFolder };
