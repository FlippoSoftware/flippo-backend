import { record, RepetitionSchema, type TRepetition } from '@shared/schemas';
import { getDb } from '@shared/surreal';
import { z } from 'zod';

async function fetchRepetitions() {
  const db = await getDb();
  const repetitions = await db.select<TRepetition>('repetition');
  return z.array(RepetitionSchema).parse(repetitions);
}

async function fetchRepetition(id: TRepetition['id']) {
  id = record('repetition').parse(id);

  const db = await getDb();
  const publication = await db.select<TRepetition>(id);
  return await RepetitionSchema.parseAsync(publication).catch(() => undefined);
}

async function createRepetition() {
  const db = await getDb();
  const [result] = await db.create<TRepetition>('repetition');
  return await RepetitionSchema.parseAsync(result).catch(() => undefined);
}

async function updateRepetition(id: TRepetition['id'], { cards }: Partial<Pick<TRepetition, 'cards'>>) {
  id = record('repetition').parse(id);
  cards = z.array(record('card')).optional().parse(cards);

  const db = await getDb();
  const [result] = await db.merge<TRepetition, Partial<Pick<TRepetition, 'cards'>>>(id, {
    cards
  });
  return await RepetitionSchema.parseAsync(result).catch(() => undefined);
}

async function deleteRepetition(id: TRepetition['id']) {
  id = record('repetition').parse(id);

  const db = await getDb();
  const [result] = await db.delete<TRepetition>(id);
  return await RepetitionSchema.parseAsync(result).catch(() => undefined);
}

export { createRepetition, deleteRepetition, fetchRepetition, fetchRepetitions, updateRepetition };
