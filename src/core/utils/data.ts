import type { ZodType } from 'zod';

import { HerbDTO } from '@/core/types/dtos/herb';
import { HerbModel } from '@/core/types/models/herb';
import { PatientDTO } from '@/core/types/dtos/patient';
import { PatientModel } from '@/core/types/models/patient';

/**
 * @param raw raw data
 * @param schema to validate against
 * @returns validated & typed data
 */
export function validate<DTO>(raw: any, schema: ZodType): DTO {
  const result = schema.safeParse(raw);

  if (!result.success) {
    throw new Error(`Response data do not adhere to schema, ${result.error.message}`);
  }

  return result.data;
}

export function convertHerbDTOtoModel({
  name,
  photo,
  traits,
  price,
  displayedIn,
}: HerbDTO): HerbModel {
  return { name, photo: photo ?? undefined, traits, price, displayedIn };
}

export function convertPatientDTOtoModel(patient: PatientDTO): PatientModel {
  return patient;
}
