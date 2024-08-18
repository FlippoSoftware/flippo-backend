"use client";

import { TLiked } from "@schema/validation-schemes";
import { TUser } from "@schema/validation-schemes";
import { TPublication } from "@schema/validation-schemes";
import { z } from "zod";
import { getSurreal } from "@lib/surreal";
import { record } from "@lib/zod";

async function like({ user, publication }: { user: TUser["id"]; publication: TPublication["id"] }) {
  user = record("user").parse(user);
  publication = record("publication").parse(publication);

  const [result] = await getSurreal().query<[TLiked[]]>(
    /* surrealql */ `
    RELATE ONLY $user->liked->$publication
    `,
    { user, publication }
  );
  return result && result.length > 0;
}

async function dislike({
  user,
  publication
}: {
  user: TUser["id"];
  publication: TPublication["id"];
}) {
  user = record("user").parse(user);
  publication = record("publication").parse(publication);

  const [result] = await getSurreal().query<[TLiked[]]>(
    /* surrealql */ `
    DELETE $user->liked WHERE out = $publication RETURN BEFORE
    `,
    { user, publication }
  );
  return result && result.length > 0;
}

async function fetchCountLikes(publication: TPublication["id"]) {
  publication = record("publication").parse(publication);

  const [result] = await getSurreal().query<[{ count: number }]>(
    /* surrealql */ `
     count(user->liked->$publication)
    `,
    { publication }
  );
  return z.object({ count: z.number() }).parse(result);
}

export { like, dislike, fetchCountLikes };
