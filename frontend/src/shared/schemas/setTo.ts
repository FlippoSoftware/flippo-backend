import { z } from "zod";

import { record } from "./record.schema";

const SetToSchema = z.object({
  id: record("set_to"),
  in: record("set"),
  out: record("tag")
});

type TSetTo = z.infer<typeof SetToSchema>;

export { SetToSchema, type TSetTo };
