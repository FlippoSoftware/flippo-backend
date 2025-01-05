// import { record, TagSchema, type TSet, type TSetTo, type TTag } from '@shared/schemas';
// import { getDb } from '@settings/surreal';
// import { z } from 'zod';

// async function assignTag({ set, tag }: { set: TSet['id']; tag: TTag['id'] }) {
//   tag = record('tag').parse(tag);
//   set = record('set').parse(set);

//   const db = await getDb();
//   const [result] = await db.query<[TSetTo[]]>(
//     /* surrealql */ `
//             RELATE ONLY $set->set_to->$tag;
//         `,
//     { set, tag }
//   );

//   return result && result.length > 0;
// }

// async function unassignTag({ set, tag }: { set: TSet['id']; tag: TTag['id'] }) {
//   tag = record('tag').parse(tag);
//   set = record('set').parse(set);

//   const db = await getDb();
//   const [result] = await db.query<[TSetTo[]]>(
//     /* surrealql */ `
//             DELETE $set->set_to WHERE out = $tag RETURN BEFORE;
//         `,
//     { set, tag }
//   );

//   return result && result.length > 0;
// }

// async function assignedTags(set: TSet['id']) {
//   set = record('set').parse(set);

//   const db = await getDb();
//   const [result] = await db.query<[TTag[]]>(
//     /* surrealql */ `
//           $set->set_to->tag.*
//         `,
//     { set }
//   );
//   return z
//     .array(TagSchema)
//     .parse(result ?? [])
//     .filter(({ id }, index, arr) => index == arr.findIndex((item) => item.id == id));
// }

// export { assignedTags, assignTag, unassignTag };
