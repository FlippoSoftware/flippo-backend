"use client";

import { z } from "zod";
import { RepetitionSchema, type TRepetition } from "@shared/schemas/repetition";
import { record } from "@shared/schemas/record";
import { getSurreal } from "@shared/surreal/surreal.utils";

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
