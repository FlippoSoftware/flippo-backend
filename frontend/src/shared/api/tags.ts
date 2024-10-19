"use client";

import { z } from "zod";

import { TagSchema, type TTag } from "@shared/schemas/tag";
import { record } from "@shared/schemas/record";
import { getSurreal } from "@shared/utils/surreal/surreal.utils";

async function fetchTags() {
  const tags = await getSurreal()?.select<TTag>("tag");
  return z.array(TagSchema).parse(tags);
}

async function fetchTag(id: TTag["id"]) {
  id = record("tag").parse(id);

  const tag = await getSurreal().select<TTag>(id);
  return await TagSchema.parseAsync(tag).catch(() => undefined);
}

async function createTag({ name }: Pick<TTag, "name">) {
  name = z.string().parse(name);

  const [result] = await getSurreal().create<TTag, Pick<TTag, "name">>("tag", { name });
  return await TagSchema.parseAsync(result).catch(() => undefined);
}

async function updateTag(id: TTag["id"], { name }: Partial<Pick<TTag, "name">>) {
  id = record("tag").parse(id);
  name = z.string().optional().parse(name);

  const [result] = await getSurreal().merge<TTag, Partial<Pick<TTag, "name">>>(id, {
    name
  });

  return await TagSchema.parseAsync(result).catch(() => undefined);
}

async function deleteTag(id: TTag["id"]) {
  id = record("tag").parse(id);

  const [result] = await getSurreal().delete<TTag>(id);
  return await TagSchema.parseAsync(result).catch(() => undefined);
}

export { fetchTags, fetchTag, createTag, updateTag, deleteTag };
