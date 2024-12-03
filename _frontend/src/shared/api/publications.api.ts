import { PublicationSchema, record, SourceType, type TPublication } from '@shared/schemas';
import { getDb } from '@shared/surreal';
import { z } from 'zod';

async function fetchPublications() {
  const db = await getDb();
  const publications = await db.select<TPublication>('publication');
  return z.array(PublicationSchema).parse(publications);
}

async function fetchPublication(id: TPublication['id']) {
  id = record('publication').parse(id);

  const db = await getDb();
  const publication = await db.select<TPublication>(id);
  return await PublicationSchema.parseAsync(publication).catch(() => undefined);
}

async function createPublication({ in: user, out: source }: Pick<TPublication, 'in' | 'out'>) {
  user = record('user').parse(user);
  source = SourceType.parse(source);

  const db = await getDb();
  const [result] = await db.query<[TPublication[]]>(
    /* surrealql */ `
      RELATE $user->publication->$source
    `,
    { source, user }
  );
  return await PublicationSchema.parseAsync(result).catch(() => undefined);
}

async function deletePublication(id: TPublication['id']) {
  id = record('publication').parse(id);

  const db = await getDb();
  const [result] = await db.delete<TPublication>(id);
  return await PublicationSchema.parseAsync(result).catch(() => undefined);
}

export { createPublication, deletePublication, fetchPublication, fetchPublications };
