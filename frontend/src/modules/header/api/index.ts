import { FolderSchema, record, SetSchema, type TFolder, type TSet } from '@shared/schemas';
//import { getDb } from '@settings/surreal';
import { z } from 'zod';

export async function fetchUserFolders(userId: string) {
  userId = record('user').parse(userId);

  // const db = await getDb();
  // const [result] = await db.query<[Pick<TFolder, 'id' | 'name'>[]]>(
  //   /* surql */ `
  //   SELECT id, name FROM folder WHERE author = $userId LIMIT 20;
  //   `,
  //   {
  //     userId
  //   }
  // );
  const result = [{ id: 'folder:jandlwnfregergalkm', name: 'My folder' }];

  return z.array(FolderSchema.pick({ id: true, name: true })).parse(result);
}

export async function fetchUserRecent(userId: string) {
  userId = record('user').parse(userId);

  // const db = await getDb();
  // const [result] = await db.query<[Pick<TSet, 'id' | 'name'>[]]>(
  //   /* surql */ `
  //   SELECT id, name FROM set WHERE author = $userId ORDER BY updated DESC LIMIT 20;
  //   `,
  //   {
  //     userId
  //   }
  // );
  const result = [{ id: 'set:jandlwnadwalkm', name: 'My set' }];

  return z.array(SetSchema.pick({ id: true, name: true })).parse(result);
}
