'use client';

import { record } from '@shared/schemas/record';
import { type TSet } from '@shared/schemas/set';
import { type TSetTo } from '@shared/schemas/setTo';
import { TagSchema, type TTag } from '@shared/schemas/tag';
import { getDb } from '@shared/surreal/surreal.utils';
import { z } from 'zod';

async function assignTag({ set, tag }: { set: TSet['id']; tag: TTag['id'] }) {
  tag = record('tag').parse(tag);
  set = record('set').parse(set);

  const db = await getDb();
  const [result] = await db.query<[TSetTo[]]>(
    /* surrealql */ `
            RELATE ONLY $set->set_to->$tag;
        `,
    { set, tag }
  );

  return result && result.length > 0;
}

async function unassignTag({ set, tag }: { set: TSet['id']; tag: TTag['id'] }) {
  tag = record('tag').parse(tag);
  set = record('set').parse(set);

  const db = await getDb();
  const [result] = await db.query<[TSetTo[]]>(
    /* surrealql */ `
            DELETE $set->set_to WHERE out = $tag RETURN BEFORE;
        `,
    { set, tag }
  );

  return result && result.length > 0;
}

async function assignedTags(set: TSet['id']) {
  set = record('set').parse(set);

  const db = await getDb();
  const [result] = await db.query<[TTag[]]>(
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

export { assignedTags, assignTag, unassignTag };
