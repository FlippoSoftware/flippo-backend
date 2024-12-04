import { z } from 'zod';

import { record } from './record.schema';

const GestaltType = z.union([z.literal('list'), z.literal('random')]);
type TGestaltType = z.infer<typeof GestaltType>;

const GestaltState = z.union([z.literal('list'), z.literal('repetition')]);
type TGestaltState = z.infer<typeof GestaltType>;

const GestaltSchema = z.object({
  id: record('gestalt'),
  in: record('user'),
  listIndex: z.number().int().positive(),
  out: record('set'),
  randomList: z.array(record('card')),
  repetitionIndex: z.number().int().positive(),
  state: GestaltState,
  type: GestaltType
});

type TGestalt = z.infer<typeof GestaltSchema>;

export { GestaltSchema, GestaltState, GestaltType, type TGestalt, type TGestaltState, type TGestaltType };
