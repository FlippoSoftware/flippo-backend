"use client";

import { SetSchema, TSet } from "@schemas/index";
import { z } from "zod";
import { getSurreal } from "@shared/utils/surreal/surreal.utils";
import { record } from "@lib/schemas/db/record";

async function fetchSets() {
  const sets = await getSurreal().select<TSet>("set");
  return z.array(SetSchema).parse(sets);
}

async function fetchSet(id: TSet["id"]) {
  id = record("set").parse(id);

  const set = await getSurreal().select<TSet>(id);
  return await SetSchema.parseAsync(set).catch(() => undefined);
}

async function createSet({
  name,
  description,
  cards,
  publication
}: Pick<TSet, "name"> & Partial<Pick<TSet, "description" | "cards" | "publication">>) {
  name = z.string().parse(name);
  description = z.string().optional().parse(description);
  cards = z.array(record("card")).optional().parse(cards);
  publication = record("publication").optional().parse(publication);

  const [result] = await getSurreal().create<
    TSet,
    Pick<TSet, "name"> & Partial<Pick<TSet, "description" | "cards" | "publication">>
  >("set", { name, description, cards, publication });
  return await SetSchema.parseAsync(result).catch(() => undefined);
}

async function updateSet(
  id: TSet["id"],
  {
    name,
    description,
    cards,
    publication
  }: Partial<Pick<TSet, "name" | "description" | "cards" | "publication">>
) {
  id = record("set").parse(id);
  name = z.string().optional().parse(name);
  description = z.string().optional().parse(description);
  cards = z.array(record("card")).optional().parse(cards);
  publication = record("publication").optional().parse(publication);

  const [result] = await getSurreal().merge<
    TSet,
    Partial<Pick<TSet, "name" | "description" | "cards" | "publication">>
  >(id, { name, description, cards, publication });
  return await SetSchema.parseAsync(result).catch(() => undefined);
}

async function deleteSet(id: TSet["id"]) {
  id = record("set").parse(id);

  const [result] = await getSurreal().delete<TSet>(id);
  return await SetSchema.parseAsync(result).catch(() => undefined);
}

export { fetchSets, fetchSet, createSet, updateSet, deleteSet };
