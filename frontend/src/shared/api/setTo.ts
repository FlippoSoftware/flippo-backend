"use client";

import { z } from "zod";

import { type TSetTo } from "@shared/schemas/setTo";
import { TagSchema, type TTag } from "@shared/schemas/tag";
import { type TSet } from "@shared/schemas/set";
import { record } from "@shared/schemas/record";
import { getSurreal } from "@shared/utils/surreal/surreal.utils";

async function assignTag({ tag, set }: { tag: TTag["id"]; set: TSet["id"] }) {
  tag = record("tag").parse(tag);
  set = record("set").parse(set);

  const [result] = await getSurreal().query<[TSetTo[]]>(
    /* surrealql */ `
            RELATE ONLY $set->set_to->$tag;
        `,
    { set, tag }
  );

  return result && result.length > 0;
}

async function unassignTag({ tag, set }: { tag: TTag["id"]; set: TSet["id"] }) {
  tag = record("tag").parse(tag);
  set = record("set").parse(set);

  const [result] = await getSurreal().query<[TSetTo[]]>(
    /* surrealql */ `
            DELETE $set->set_to WHERE out = $tag RETURN BEFORE;
        `,
    { set, tag }
  );

  return result && result.length > 0;
}

async function assignedTags(set: TSet["id"]) {
  set = record("set").parse(set);

  const [result] = await getSurreal().query<[TTag[]]>(
    /* surrealql */ `
          $set->set_to->tag.*
        `,
    { set }
  );
  return z
    .array(TagSchema)
    .parse(result ?? [])
    .filter(({ id }, index, arr) => index == arr.findIndex((item) => item.id == id));
}

export { assignTag, unassignTag, assignedTags };
