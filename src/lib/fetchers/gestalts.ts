"use client";

import { GestaltType, GestaltState, GestaltSchema, TGestalt } from "@schema/validation-schemes";
import { z } from "zod";
import { getSurreal } from "@lib/surreal";
import { record } from "@lib/zod";

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
  list_index,
  repetition_index,
  random_list
}: Partial<Pick<TGestalt, "type" | "state" | "list_index" | "repetition_index" | "random_list">>) {
  type = GestaltType.parse(type);
  state = GestaltState.parse(state);
  list_index = z.number().int().positive().parse(list_index);
  repetition_index = z.number().int().positive().parse(repetition_index);
  random_list = z.array(record("card")).parse(random_list);

  const [result] = await getSurreal().create<
    TGestalt,
    Partial<Pick<TGestalt, "type" | "state" | "list_index" | "repetition_index" | "random_list">>
  >("gestalt", { type, state, list_index, repetition_index, random_list });
  return await GestaltSchema.parseAsync(result).catch(() => undefined);
}

async function updateGestalt(
  id: TGestalt["id"],
  {
    type,
    state,
    list_index,
    repetition_index,
    random_list
  }: Partial<Pick<TGestalt, "type" | "state" | "list_index" | "repetition_index" | "random_list">>
) {
  id = record("gestalt").parse(id);
  type = GestaltType.parse(type);
  state = GestaltState.parse(state);
  list_index = z.number().int().positive().parse(list_index);
  repetition_index = z.number().int().positive().parse(repetition_index);
  random_list = z.array(record("card")).parse(random_list);

  const [result] = await getSurreal().merge<
    TGestalt,
    Partial<Pick<TGestalt, "type" | "state" | "list_index" | "repetition_index" | "random_list">>
  >(id, { type, state, list_index, repetition_index, random_list });
  return await GestaltSchema.parseAsync(result).catch(() => undefined);
}

async function deleteGestalt(id: TGestalt["id"]) {
  id = record("gestalt").parse(id);

  const [result] = await getSurreal().delete<TGestalt>(id);
  return await GestaltSchema.parseAsync(result).catch(() => undefined);
}

export { fetchGestalts, fetchGestalt, createGestalt, updateGestalt, deleteGestalt };
