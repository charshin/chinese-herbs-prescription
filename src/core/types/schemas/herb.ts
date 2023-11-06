import { z } from 'zod';

export const HerbSchema = z.object({
  name: z.string(),
  photo: z.string().url().optional().nullable(),
  traits: z.array(z.string()).optional(),
  price: z.number().int().nonnegative(),
  displayedIn: z.record(z.string()),
});
