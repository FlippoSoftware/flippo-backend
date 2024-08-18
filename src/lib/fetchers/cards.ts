"use client";

import { CardSchema, TCard } from "@schema/validation-schemes";
import { z } from "zod";
import { getSurreal } from "@lib/surreal";
import { record } from "@lib/zod";

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
  extended_answer
}: Pick<TCard, "set"> & Partial<Pick<TCard, "question" | "answer" | "extended_answer">>) {
  set = record("set").parse(set);
  question = z.string().optional().parse(question);
  answer = z.string().optional().parse(answer);
  extended_answer = z.string().optional().parse(extended_answer);

  const [result] = await getSurreal().create<
    TCard,
    Pick<TCard, "set"> & Partial<Pick<TCard, "question" | "answer" | "extended_answer">>
  >("card", {
    set,
    question,
    answer,
    extended_answer
  });
  return await CardSchema.parseAsync(result).catch(() => undefined);
}

async function updateCard(
  id: TCard["id"],
  {
    question,
    answer,
    extended_answer
  }: Partial<Pick<TCard, "question" | "answer" | "extended_answer">>
) {
  id = record("card").parse(id);
  question = z.string().optional().parse(question);
  answer = z.string().optional().parse(answer);
  extended_answer = z.string().optional().parse(extended_answer);

  const [result] = await getSurreal().merge<
    TCard,
    Partial<Pick<TCard, "question" | "answer" | "extended_answer">>
  >(id, { question, answer, extended_answer });
  return await CardSchema.parseAsync(result).catch(() => undefined);
}

async function deleteCard(id: TCard["id"]) {
  id = record("card").parse(id);

  const [result] = await getSurreal().delete<TCard>(id);
  return await CardSchema.parseAsync(result).catch(() => undefined);
}

export { fetchCards, fetchCard, createCard, updateCard, deleteCard };
