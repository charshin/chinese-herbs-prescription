import { z } from 'zod';

import { PatientSchema } from '../schemas/patient';

export type PatientDTO = z.infer<typeof PatientSchema>;
