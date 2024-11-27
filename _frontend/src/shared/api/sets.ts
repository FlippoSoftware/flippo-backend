'use client';

import { record } from '@shared/schemas/record';
import { SetSchema, type TSet } from '@shared/schemas/set';
import { getDb } from '@shared/surreal/surreal.utils';
import { z } from 'zod';

async function fetchSets() {
  const db = await getDb();
  const sets = await db.select<TSet>('set');
  return z.array(SetSchema).parse(sets);
}

async function fetchSet(id: TSet['id']) {
  id = record('set').parse(id);

  const db = await getDb();
  const set = await db.select<TSet>(id);
  return await SetSchema.parseAsync(set).catch(() => undefined);
}

async function createSet({
  cards,
  description,
  name,
  publication
}: Partial<Pick<TSet, 'cards' | 'description' | 'publication'>> & Pick<TSet, 'name'>) {
  name = z.string().parse(name);
  description = z.string().optional().parse(description);
  cards = z.array(record('card')).optional().parse(cards);
  publication = record('publication').optional().parse(publication);

  const db = await getDb();
  const [result] = await db.create<
    TSet,
    Partial<Pick<TSet, 'cards' | 'description' | 'publication'>> & Pick<TSet, 'name'>
  >('set', { cards, description, name, publication });
  return await SetSchema.parseAsync(result).catch(() => undefined);
}

async function updateSet(
  id: TSet['id'],
  { cards, description, name, publication }: Partial<Pick<TSet, 'cards' | 'description' | 'name' | 'publication'>>
) {
  id = record('set').parse(id);
  name = z.string().optional().parse(name);
  description = z.string().optional().parse(description);
  cards = z.array(record('card')).optional().parse(cards);
  publication = record('publication').optional().parse(publication);

  const db = await getDb();
  const [result] = await db.merge<TSet, Partial<Pick<TSet, 'cards' | 'description' | 'name' | 'publication'>>>(id, {
    cards,
    description,
    name,
    publication
  });
  return await SetSchema.parseAsync(result).catch(() => undefined);
}

async function deleteSet(id: TSet['id']) {
  id = record('set').parse(id);

  const db = await getDb();
  const [result] = await db.delete<TSet>(id);
  return await SetSchema.parseAsync(result).catch(() => undefined);
}

export { createSet, deleteSet, fetchSet, fetchSets, updateSet };
