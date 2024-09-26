"use client";

import { TagSchema, TSet, TTag, TSetTo } from "@schemas/index";
import { z } from "zod";
import { getSurreal } from "@shared/utils/surreal/surreal.utils";
import { record } from "@lib/schemas/db/record";

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

async function assignAccess({ set, access }: { set: TSet["id"]; access: TAccess["id"] }) {
  set = record("set").parse(set);
  access = record("access").parse(access);

  const [result] = await getSurreal().query<[TSetTo[]]>(
    /* surrealql */ `
            RELATE ONLY $set->set_to->$access;
        `,
    { set, access }
  );
  return result && result.length > 0;
}

async function unassignAccess({ set, access }: { set: TSet["id"]; access: TAccess["id"] }) {
  set = record("set").parse(set);
  access = record("access").parse(access);

  const [result] = await getSurreal().query<[TSetTo[]]>(
    /* surrealql */ `
            DELETE $set->set_to WHERE out = $access RETURN BEFORE;
        `,
    { set, access }
  );
  return result && result.length > 0;
}

async function assignedAccesses(set: TSet["id"]) {
  set = record("set").parse(set);

  const [result] = await getSurreal().query<[TAccess[]]>(
    /* surrealql */ `
          $set->set_to->access.*
        `,
    { set }
  );
  return z.array(AccessSchema).parse(result ?? []);
}

export { assignTag, unassignTag, assignedTags, assignAccess, unassignAccess, assignedAccesses };
