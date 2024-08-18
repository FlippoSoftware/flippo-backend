"use client";

import { RepetitionSchema, TRepetition } from "@schema/validation-schemes";
import { z } from "zod";
import { getSurreal } from "@lib/surreal";
import { record } from "@lib/zod";

async function fetchRepetitions() {
  const repetitions = await getSurreal().select<TRepetition>("repetition");
  return z.array(RepetitionSchema).parse(repetitions);
}

async function fetchRepetition(id: TRepetition["id"]) {
  id = record("repetition").parse(id);

  const publication = await getSurreal().select<TRepetition>(id);
  return await RepetitionSchema.parseAsync(publication).catch(() => undefined);
}

async function createRepetition() {
  const [result] = await getSurreal().create<TRepetition>("repetition");
  return await RepetitionSchema.parseAsync(result).catch(() => undefined);
}

async function updateRepetition(
  id: TRepetition["id"],
  { cards }: Partial<Pick<TRepetition, "cards">>
) {
  id = record("repetition").parse(id);
  cards = z.array(record("card")).optional().parse(cards);

  const [result] = await getSurreal().merge<TRepetition, Partial<Pick<TRepetition, "cards">>>(id, {
    cards
  });
  return await RepetitionSchema.parseAsync(result).catch(() => undefined);
}

async function deleteRepetition(id: TRepetition["id"]) {
  id = record("repetition").parse(id);

  const [result] = await getSurreal().delete<TRepetition>(id);
  return await RepetitionSchema.parseAsync(result).catch(() => undefined);
}

export { fetchRepetitions, fetchRepetition, createRepetition, updateRepetition, deleteRepetition };
