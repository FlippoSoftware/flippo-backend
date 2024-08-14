import { record } from "@lib/zod";
import { z } from "zod";

const GestaltSetSchema = z.object({
  id: record("gestalt_set"),
  in: record("gestalt"),
  out: record("set")
});

type TGestaltSet = z.infer<typeof GestaltSetSchema>;

export { GestaltSetSchema, type TGestaltSet };
