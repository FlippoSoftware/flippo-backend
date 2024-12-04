import { z } from 'zod';

import { record } from './record.schema';

const TagSchema = z.object({
  created: z.coerce.date(),
  id: record('tag'),
  name: z.string(),
  owner: record('user'),
  updated: z.coerce.date()
});

type TTag = z.infer<typeof TagSchema>;

export { TagSchema, type TTag };
