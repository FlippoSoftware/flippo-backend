"use client";

import { CardSchema, TCard } from "@schemas/index";
import { z } from "zod";
import { getSurreal } from "@lib/surreal";
import { record } from "@lib/schemas/db/record";

async function fetchCards() {
  const cards = await getSurreal().select<TCard>("card");
  return z.array(CardSchema).parse(cards);
}

async function fetchCard(id: TCard["id"]) {
  id = record("card").parse(id);

  const card = await getSurreal().select<TCard>(id);
  return await CardSchema.parseAsync(card).catch(() => undefined);
}

async function createCard({
  set,
  question,
  answer,
  extendedAnswer
}: Pick<TCard, "set"> & Partial<Pick<TCard, "question" | "answer" | "extendedAnswer">>) {
  set = record("set").parse(set);
  question = z.string().optional().parse(question);
  answer = z.string().optional().parse(answer);
  extendedAnswer = z.string().optional().parse(extendedAnswer);

  const [result] = await getSurreal().create<
    TCard,
    Pick<TCard, "set"> & Partial<Pick<TCard, "question" | "answer" | "extendedAnswer">>
  >("card", {
    set,
    question,
    answer,
    extendedAnswer
  });
  return await CardSchema.parseAsync(result).catch(() => undefined);
}

async function updateCard(
  id: TCard["id"],
  {
    question,
    answer,
    extendedAnswer
  }: Partial<Pick<TCard, "question" | "answer" | "extendedAnswer">>
) {
  id = record("card").parse(id);
  question = z.string().optional().parse(question);
  answer = z.string().optional().parse(answer);
  extendedAnswer = z.string().optional().parse(extendedAnswer);

  const [result] = await getSurreal().merge<
    TCard,
    Partial<Pick<TCard, "question" | "answer" | "extendedAnswer">>
  >(id, { question, answer, extendedAnswer });
  return await CardSchema.parseAsync(result).catch(() => undefined);
}

async function deleteCard(id: TCard["id"]) {
  id = record("card").parse(id);

  const [result] = await getSurreal().delete<TCard>(id);
  return await CardSchema.parseAsync(result).catch(() => undefined);
}

export { fetchCards, fetchCard, createCard, updateCard, deleteCard };
