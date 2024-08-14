import { record } from "@lib/zod";
import { z } from "zod";

const LikedSchema = z.object({
  id: record("liked"),
  in: record("user"),
  out: record("publication")
});

type TLiked = z.infer<typeof LikedSchema>;

export { LikedSchema, type TLiked };
