"use client";

import { z } from "zod";
import { PublicationSchema, type TPublication } from "@shared/schemas/publication";
import { SourceType } from "@shared/schemas/source";
import { record } from "@shared/schemas/record";
import { getSurreal } from "@shared/surreal/surreal.utils";

async function fetchPublications() {
  const publications = await getSurreal().select<TPublication>("publication");
  return z.array(PublicationSchema).parse(publications);
}

async function fetchPublication(id: TPublication["id"]) {
  id = record("publication").parse(id);

  const publication = await getSurreal().select<TPublication>(id);
  return await PublicationSchema.parseAsync(publication).catch(() => undefined);
}

async function createPublication({ in: user, out: source }: Pick<TPublication, "in" | "out">) {
  user = record("user").parse(user);
  source = SourceType.parse(source);

  const [result] = await getSurreal().query<[TPublication[]]>(
    /* surrealql */ `
      RELATE $user->publication->$source
    `,
    { user, source }
  );
  return await PublicationSchema.parseAsync(result).catch(() => undefined);
}

async function deletePublication(id: TPublication["id"]) {
  id = record("publication").parse(id);

  const [result] = await getSurreal().delete<TPublication>(id);
  return await PublicationSchema.parseAsync(result).catch(() => undefined);
}

export { fetchPublications, fetchPublication, createPublication, deletePublication };
