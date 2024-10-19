import { z } from "zod";

import { record } from "./record.schema";

const SourceType = z.union([record("folder"), record("set")]);
type TSourceType = z.infer<typeof SourceType>;

export { SourceType, type TSourceType };
