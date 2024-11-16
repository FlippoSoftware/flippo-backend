"use client";

import { z } from "zod";
import { GestaltType, GestaltState, GestaltSchema, type TGestalt } from "@shared/schemas/gestalt";
import { record } from "@shared/schemas/record";
import { getSurreal } from "@shared/surreal/surreal.utils";

async function fetchGestalts() {
  const gestalts = await getSurreal().select<TGestalt>("repetition");
  return z.array(GestaltSchema).parse(gestalts);
}

async function fetchGestalt(id: TGestalt["id"]) {
  id = record("gestalt").parse(id);

  const gestalt = await getSurreal().select<TGestalt>(id);
  return await GestaltSchema.parseAsync(gestalt).catch(() => undefined);
}

async function createGestalt({
  type,
  state,
  listIndex,
  repetitionIndex,
  randomList
}: Partial<Pick<TGestalt, "type" | "state" | "listIndex" | "repetitionIndex" | "randomList">>) {
  type = GestaltType.parse(type);
  state = GestaltState.parse(state);
  listIndex = z.number().int().positive().parse(listIndex);
  repetitionIndex = z.number().int().positive().parse(repetitionIndex);
  randomList = z.array(record("card")).parse(randomList);

  const [result] = await getSurreal().create<
    TGestalt,
    Partial<Pick<TGestalt, "type" | "state" | "listIndex" | "repetitionIndex" | "randomList">>
  >("gestalt", { type, state, listIndex, repetitionIndex, randomList });
  return await GestaltSchema.parseAsync(result).catch(() => undefined);
}

async function updateGestalt(
  id: TGestalt["id"],
  {
    type,
    state,
    listIndex,
    repetitionIndex,
    randomList
  }: Partial<Pick<TGestalt, "type" | "state" | "listIndex" | "repetitionIndex" | "randomList">>
) {
  id = record("gestalt").parse(id);
  type = GestaltType.parse(type);
  state = GestaltState.parse(state);
  listIndex = z.number().int().positive().parse(listIndex);
  repetitionIndex = z.number().int().positive().parse(repetitionIndex);
  randomList = z.array(record("card")).parse(randomList);

  const [result] = await getSurreal().merge<
    TGestalt,
    Partial<Pick<TGestalt, "type" | "state" | "listIndex" | "repetitionIndex" | "randomList">>
  >(id, { type, state, listIndex, repetitionIndex, randomList });
  return await GestaltSchema.parseAsync(result).catch(() => undefined);
}

async function deleteGestalt(id: TGestalt["id"]) {
  id = record("gestalt").parse(id);

  const [result] = await getSurreal().delete<TGestalt>(id);
  return await GestaltSchema.parseAsync(result).catch(() => undefined);
}

export { fetchGestalts, fetchGestalt, createGestalt, updateGestalt, deleteGestalt };
