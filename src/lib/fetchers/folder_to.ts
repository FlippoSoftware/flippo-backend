"use client";

import { FolderAssign, TFolderAssign, TFolder, TFolderTo } from "@schema/validation-schemes";
import { z } from "zod";
import { getSurreal } from "@lib/surreal";
import { record } from "@lib/zod";

async function assignFolder({ id, folder }: { id: TFolderAssign; folder: TFolder["id"] }) {
  id = FolderAssign.parse(id);
  folder = record("folder").parse(folder);

  const [result] = await getSurreal().query<[TFolderTo[]]>(
    /* surrealql */ `
            RELATE ONLY $folder->folder_to->$id;
        `,
    { folder, id }
  );
  return result && result.length > 0;
}

async function unassignFolder({ id, folder }: { id: TFolderAssign; folder: TFolder["id"] }) {
  id = FolderAssign.parse(id);
  folder = record("folder").parse(folder);

  const [result] = await getSurreal().query<[TFolderTo[]]>(
    /* surrealql */ `
            DELETE $folder->folder_to WHERE out = $id;
        `,
    { folder, id }
  );
  return result && result.length > 0;
}

async function assignedToFolder(folder: TFolder["id"]) {
  folder = record("folder").parse(folder);

  const [result] = await getSurreal().query<[TFolderTo[]]>(
    /* surrealql */ `
            SELECT * FROM ( SELECT type: "personal", (SELECT name, array::len(cards) as count_cards, updated FROM $folder->folder_to->set) FROM $folder ),
              (SELECT type: "available", (SELECT name, array::len(cards) as count_cards, updated FROM $folder->folder_to->access.resource) FROM $folder ),
              (SELECT type: "liked", (SELECT name, array::len(cards) as count_cards, updated, ($auth.id->liked->$this) FROM $folder->folder_to->publication.source) FROM $folder ) ORDER BY name DESC;
          /*[
    {type: "personal", items: $folder->folder_to->set},
    {type: "available", items: $folder->folder_to->access.resource},
    {type: "liked", items: $folder->folder_to->publication.source}
];*/
        `,
    { folder }
  );
  return z.array(FolderAssign).parse(result ?? []);
}

async function assignedToFolderAs(folder: TFolder["id"], assignment: TFolderAssign) {
  folder = record("folder").parse(folder);
  assignment = FolderAssign.parse(assignment);

  const [result] = await getSurreal().query<[TFolderTo[]]>(
    /* surrealql */ `
          IF $assignment = "set" {
            SELECT type: "personal",(SELECT name, array::len(cards) as count_cards, updated FROM $folder->folder_to->set) FROM $folder ORDER BY name DESC;
          }
          ELSE IF $assignment = "access" {
            SELECT type: "available", (SELECT name, array::len(cards) as count_cards, updated FROM $folder->folder_to->access.resource) FROM $folder ORDER BY name DESC;
          }
          ELSE IF $assignment = "publication" {
            SELECT type: "liked", (SELECT name, array::len(cards) as count_cards, updated, ($auth.id->liked->$this) FROM $folder->folder_to->publication.source) FROM $folder ORDER BY name DESC;
          }

        `,
    { folder, assignment }
  );
  return z.array(FolderAssign).parse(result ?? []);
}

export { assignFolder, unassignFolder, assignedToFolder, assignedToFolderAs };
