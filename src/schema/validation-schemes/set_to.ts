import { record } from "@lib/zod";
import { z } from "zod";

const SetAssign = z.union([record("tag"), record("access")]);
type TSetAssign = z.infer<typeof SetAssign>;

const SetToSchema = z.object({
  id: record("set_to"),
  in: record("set"),
  out: SetAssign
});

type TSetTo = z.infer<typeof SetToSchema>;

export { SetAssign, type TSetAssign, SetToSchema, type TSetTo };
