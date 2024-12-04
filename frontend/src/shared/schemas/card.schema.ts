import { z } from 'zod';

import { record } from './record.schema';

const StateType = z.union([z.literal('none'), z.literal('reserved'), z.literal('process'), z.literal('ready')]);
type TStateType = z.infer<typeof StateType>;

const CardSchema = z.object({
  answer: z.string(),
  created: z.coerce.date(),
  editors: z.array(record('user')),
  extendedAnswer: z.string(),
  id: record('card'),
  question: z.string(),
  set: record('set'),
  state: StateType,
  updated: z.coerce.date()
});

type TCard = z.infer<typeof CardSchema>;

export { CardSchema, StateType, type TCard, type TStateType };
