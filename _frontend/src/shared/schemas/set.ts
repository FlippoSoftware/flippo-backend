import { z } from 'zod';

import { record } from './record.schema';

const SetSchema = z.object({
  author: record('user'),
  cards: z.array(record('card')),
  countCards: z.number().int().positive(),
  created: z.coerce.date(),
  description: z.string(),
  id: record('set'),
  name: z.string(),
  publication: record('publication'),
  updated: z.coerce.date()
});

type TSet = z.infer<typeof SetSchema>;

export { SetSchema, type TSet };
