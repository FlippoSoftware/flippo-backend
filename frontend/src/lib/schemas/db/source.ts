import { record } from "@lib/schemas/db/record";
import { z } from "zod";

const SourceType = z.union([record("folder"), record("set")]);
type TSourceType = z.infer<typeof SourceType>;

export { SourceType, type TSourceType };
