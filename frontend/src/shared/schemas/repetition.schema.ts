import { z } from 'zod';

import { record } from './record.schema';

const RepetitionSchema = z.object({
  cards: z.array(record('card')),
  id: record('repetition'),
  in: record('user'),
  out: record('set')
});

type TRepetition = z.infer<typeof RepetitionSchema>;

export { RepetitionSchema, type TRepetition };
