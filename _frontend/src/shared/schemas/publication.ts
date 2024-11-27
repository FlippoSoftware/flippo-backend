import { z } from 'zod';

import { record } from './record.schema';
import { SourceType } from './source';

const PublicationSchema = z.object({
  author: record('user'),
  created: z.coerce.date(),
  id: record('publication'),
  in: record('user'),
  out: SourceType,
  updated: z.coerce.date()
});

type TPublication = z.infer<typeof PublicationSchema>;

export { PublicationSchema, type TPublication };
