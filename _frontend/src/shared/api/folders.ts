'use client';

import { FolderSchema, type TFolder } from '@shared/schemas/folder';
import { record } from '@shared/schemas/record';
import { getDb } from '@shared/surreal/surreal.utils';
import { z } from 'zod';

async function fetchFolders() {
  const db = await getDb();
  const folders = await db.select<TFolder>('folder');
  return await z
    .array(FolderSchema)
    .parseAsync(folders)
    .catch(() => undefined);
}

async function fetchFoldersName() {
  const db = await getDb();
  const folders = await db.query<[Pick<TFolder, 'id' | 'name'>[]]>(/* surrealql */ `
      SELECT id, name FROM folder;
    `);
  return await z
    .array(FolderSchema.pick({ id: true, name: true }))
    .parseAsync(folders)
    .catch(() => undefined);
}

async function fetchFolder(id: TFolder['id']) {
  id = record('folder').parse(id);

  const db = await getDb();
  const folder = await db.select<TFolder>(id);
  return await FolderSchema.parseAsync(folder).catch(() => undefined);
}

async function createFolder({ name }: Pick<TFolder, 'name'>) {
  name = z.string().parse(name);

  const db = await getDb();
  const [result] = await db.create<TFolder, Pick<TFolder, 'name'>>('folder', { name });
  return await FolderSchema.parseAsync(result).catch(() => undefined);
}

async function updateFolder(id: TFolder['id'], { name }: Partial<Pick<TFolder, 'name'>>) {
  id = record('folder').parse(id);
  name = z.string().optional().parse(name);

  const db = await getDb();
  const [result] = await db.merge<TFolder, Partial<Pick<TFolder, 'name'>>>(id, {
    name
  });
  return await FolderSchema.parseAsync(result).catch(() => undefined);
}

async function deleteFolder(id: TFolder['id']) {
  id = record('folder').parse(id);

  const db = await getDb();
  const [result] = await db.delete<TFolder>(id);
  return await FolderSchema.parseAsync(result).catch(() => undefined);
}
export { createFolder, deleteFolder, fetchFolder, fetchFolders, fetchFoldersName, updateFolder };
