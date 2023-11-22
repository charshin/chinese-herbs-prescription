import 'server-only';

import { prisma } from '@/core/db/prisma';
import { PatientModel } from '@/core/types/models/patient';
import { getErrorMessage } from '@/core/utils/error';

export async function createPatient(patient: PatientModel) {
  try {
    const data: PatientModel & { bloodPressure?: any; systolic: number; diastolic: number } = {
      ...patient,
      systolic: patient.bloodPressure.systolic,
      diastolic: patient.bloodPressure.diastolic,
    };
    delete data.bloodPressure;

    return prisma.patient.create({
      data,
    });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
