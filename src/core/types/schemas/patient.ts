import { z } from 'zod';

export const PatientSchema = z.object({
  fullname: z.string(),
  dob: z.date(),
  email: z.string().email(),
  phone: z.string(),
  gender: z.union([z.literal('male'), z.literal('female')]),
  occupation: z.string().optional().nullable(),
  height: z.number(),
  weight: z.number(),
  bloodPressure: z.object({
    systolic: z.number(),
    diastolic: z.number(),
  }),
  heartRate: z.number(),
  address: z.string(),
});
