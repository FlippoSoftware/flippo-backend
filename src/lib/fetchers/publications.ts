"use client";

import { PublicationSchema, TPublication } from "@schema/validation-schemes";
import { z } from "zod";
import { getSurreal } from "@lib/surreal";
import { record } from "@lib/zod";

async function fetchPublications() {
  const publications = await getSurreal().select<TPublication>("publication");
  return z.array(PublicationSchema).parse(publications);
}

async function fetchPublication(id: TPublication["id"]) {
  id = record("publication").parse(id);

  const publication = await getSurreal().select<TPublication>(id);
  return await PublicationSchema.parseAsync(publication).catch(() => undefined);
}

async function createPublication({ source }: Pick<TPublication, "source">) {
  source = z.union([record("folder"), record("set")]).parse(source);

  const [result] = await getSurreal().create<TPublication, Pick<TPublication, "source">>(
    "publication",
    { source }
  );
  return await PublicationSchema.parseAsync(result).catch(() => undefined);
}

async function deletePublication(id: TPublication["id"]) {
  id = record("publication").parse(id);

  const [result] = await getSurreal().delete<TPublication>(id);
  return await PublicationSchema.parseAsync(result).catch(() => undefined);
}

export { fetchPublications, fetchPublication, createPublication, deletePublication };
