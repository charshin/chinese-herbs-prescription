import { z } from 'zod';

import { HerbSchema } from '../schemas/herb';

export type HerbDTO = z.infer<typeof HerbSchema>;
