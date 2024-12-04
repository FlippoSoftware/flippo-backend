import { CardSchema, record, type TCard } from '@shared/schemas';
import { getDb } from '@shared/surreal';
import { z } from 'zod';

async function fetchCards() {
  const db = await getDb();
  const cards = await db.select<TCard>('card');
  return z.array(CardSchema).parse(cards);
}

async function fetchCard(id: TCard['id']) {
  id = record('card').parse(id);

  const db = await getDb();
  const card = await db.select<TCard>(id);
  return await CardSchema.parseAsync(card).catch(() => undefined);
}

async function createCard({
  answer,
  extendedAnswer,
  question,
  set
}: Partial<Pick<TCard, 'answer' | 'extendedAnswer' | 'question'>> & Pick<TCard, 'set'>) {
  set = record('set').parse(set);
  question = z.string().optional().parse(question);
  answer = z.string().optional().parse(answer);
  extendedAnswer = z.string().optional().parse(extendedAnswer);

  const db = await getDb();
  const [result] = await db.create<
    TCard,
    Partial<Pick<TCard, 'answer' | 'extendedAnswer' | 'question'>> & Pick<TCard, 'set'>
  >('card', {
    answer,
    extendedAnswer,
    question,
    set
  });
  return await CardSchema.parseAsync(result).catch(() => undefined);
}

async function updateCard(
  id: TCard['id'],
  { answer, extendedAnswer, question }: Partial<Pick<TCard, 'answer' | 'extendedAnswer' | 'question'>>
) {
  id = record('card').parse(id);
  question = z.string().optional().parse(question);
  answer = z.string().optional().parse(answer);
  extendedAnswer = z.string().optional().parse(extendedAnswer);

  const db = await getDb();
  const [result] = await db.merge<TCard, Partial<Pick<TCard, 'answer' | 'extendedAnswer' | 'question'>>>(id, {
    answer,
    extendedAnswer,
    question
  });
  return await CardSchema.parseAsync(result).catch(() => undefined);
}

async function deleteCard(id: TCard['id']) {
  id = record('card').parse(id);

  const db = await getDb();
  const [result] = await db.delete<TCard>(id);
  return await CardSchema.parseAsync(result).catch(() => undefined);
}

export { createCard, deleteCard, fetchCard, fetchCards, updateCard };
