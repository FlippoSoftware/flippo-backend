"use client";

import { FolderToSchema, TFolder, TFolderTo } from "@schemas/index";
import { z } from "zod";
import { getSurreal } from "@lib/surreal";
import { record } from "@lib/schemas/db/record";

async function assignFolder({ in: folder, out: set }: Pick<TFolderTo, "in" | "out">) {
  folder = record("folder").parse(folder);
  set = record("set").parse(set);

  const [result] = await getSurreal().query<[TFolderTo[]]>(
    /* surrealql */ `
      RELATE ONLY $folder->folder_to->$set;
    `,
    { folder, set }
  );
  return result && result.length > 0;
}

async function unassignFolder({ in: folder, out: set }: Pick<TFolderTo, "in" | "out">) {
  folder = record("folder").parse(folder);
  set = record("set").parse(set);

  const [result] = await getSurreal().query<[TFolderTo[]]>(
    /* surrealql */ `
            DELETE $folder->folder_to WHERE out = $set;
        `,
    { folder, set }
  );
  return result && result.length > 0;
}

async function assignedToFolder(folder: TFolder["id"]) {
  folder = record("folder").parse(folder);

  const [result] = await getSurreal().query<[TFolderTo[]]>(
    /* surrealql */ `

          /*[
    {type: "personal", items: $folder->folder_to->set},
    {type: "available", items: $folder->folder_to->access.resource},
    {type: "liked", items: $folder->folder_to->publication.source}
];*/
        `,
    { folder }
  );
  return z.array(FolderToSchema).parse(result ?? []);
}

export { assignFolder, unassignFolder, assignedToFolder };
