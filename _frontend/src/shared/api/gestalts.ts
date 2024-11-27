'use client';

import { GestaltSchema, GestaltState, GestaltType, type TGestalt } from '@shared/schemas/gestalt';
import { record } from '@shared/schemas/record';
import { getDb } from '@shared/surreal/surreal.utils';
import { z } from 'zod';

async function fetchGestalts() {
  const db = await getDb();
  const gestalts = await db.select<TGestalt>('repetition');
  return z.array(GestaltSchema).parse(gestalts);
}

async function fetchGestalt(id: TGestalt['id']) {
  id = record('gestalt').parse(id);

  const db = await getDb();
  const gestalt = await db.select<TGestalt>(id);
  return await GestaltSchema.parseAsync(gestalt).catch(() => undefined);
}

async function createGestalt({
  listIndex,
  randomList,
  repetitionIndex,
  state,
  type
}: Partial<Pick<TGestalt, 'listIndex' | 'randomList' | 'repetitionIndex' | 'state' | 'type'>>) {
  type = GestaltType.parse(type);
  state = GestaltState.parse(state);
  listIndex = z.number().int().positive().parse(listIndex);
  repetitionIndex = z.number().int().positive().parse(repetitionIndex);
  randomList = z.array(record('card')).parse(randomList);

  const db = await getDb();
  const [result] = await db.create<
    TGestalt,
    Partial<Pick<TGestalt, 'listIndex' | 'randomList' | 'repetitionIndex' | 'state' | 'type'>>
  >('gestalt', { listIndex, randomList, repetitionIndex, state, type });
  return await GestaltSchema.parseAsync(result).catch(() => undefined);
}

async function updateGestalt(
  id: TGestalt['id'],
  {
    listIndex,
    randomList,
    repetitionIndex,
    state,
    type
  }: Partial<Pick<TGestalt, 'listIndex' | 'randomList' | 'repetitionIndex' | 'state' | 'type'>>
) {
  id = record('gestalt').parse(id);
  type = GestaltType.parse(type);
  state = GestaltState.parse(state);
  listIndex = z.number().int().positive().parse(listIndex);
  repetitionIndex = z.number().int().positive().parse(repetitionIndex);
  randomList = z.array(record('card')).parse(randomList);

  const db = await getDb();
  const [result] = await db.merge<
    TGestalt,
    Partial<Pick<TGestalt, 'listIndex' | 'randomList' | 'repetitionIndex' | 'state' | 'type'>>
  >(id, { listIndex, randomList, repetitionIndex, state, type });
  return await GestaltSchema.parseAsync(result).catch(() => undefined);
}

async function deleteGestalt(id: TGestalt['id']) {
  id = record('gestalt').parse(id);

  const db = await getDb();
  const [result] = await db.delete<TGestalt>(id);
  return await GestaltSchema.parseAsync(result).catch(() => undefined);
}

export { createGestalt, deleteGestalt, fetchGestalt, fetchGestalts, updateGestalt };
