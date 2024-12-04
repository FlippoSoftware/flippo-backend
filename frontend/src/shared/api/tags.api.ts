import { record, TagSchema, type TTag } from '@shared/schemas';
import { getDb } from '@shared/surreal';
import { z } from 'zod';

async function fetchTags() {
  const db = await getDb();
  const tags = await db.select<TTag>('tag');
  return z.array(TagSchema).parse(tags);
}

async function fetchTag(id: TTag['id']) {
  id = record('tag').parse(id);

  const db = await getDb();
  const tag = await db.select<TTag>(id);
  return await TagSchema.parseAsync(tag).catch(() => undefined);
}

async function createTag({ name }: Pick<TTag, 'name'>) {
  name = z.string().parse(name);

  const db = await getDb();
  const [result] = await db.create<TTag, Pick<TTag, 'name'>>('tag', { name });
  return await TagSchema.parseAsync(result).catch(() => undefined);
}

async function updateTag(id: TTag['id'], { name }: Partial<Pick<TTag, 'name'>>) {
  id = record('tag').parse(id);
  name = z.string().optional().parse(name);

  const db = await getDb();
  const [result] = await db.merge<TTag, Partial<Pick<TTag, 'name'>>>(id, {
    name
  });

  return await TagSchema.parseAsync(result).catch(() => undefined);
}

async function deleteTag(id: TTag['id']) {
  id = record('tag').parse(id);

  const db = await getDb();
  const [result] = await db.delete<TTag>(id);
  return await TagSchema.parseAsync(result).catch(() => undefined);
}

export { createTag, deleteTag, fetchTag, fetchTags, updateTag };
