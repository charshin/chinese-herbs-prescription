'use server';

import { convertPatientDTOtoModel, validate } from '@/core/utils/data';
import { getErrorMessage } from '@/core/utils/error';
import { PatientSchema } from '@/core/types/schemas/patient';
import { PatientDTO } from '@/core/types/dtos/patient';
import { PatientModel } from '@/core/types/models/patient';
import { createPatient } from '@/core/data/patient';

export async function submitPatient(data: PatientModel) {
  try {
    const patientDTO = validate<PatientDTO>(data, PatientSchema);
    const patient = convertPatientDTOtoModel(patientDTO);
    return createPatient(patient);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
