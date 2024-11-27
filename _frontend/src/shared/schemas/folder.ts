import { z } from 'zod';

import { record } from './record.schema';

const FolderSchema = z.object({
  author: record('user'),
  created: z.coerce.date(),
  id: record('folder'),
  name: z.string(),
  updated: z.coerce.date()
});

type TFolder = z.infer<typeof FolderSchema>;

export { FolderSchema, type TFolder };
