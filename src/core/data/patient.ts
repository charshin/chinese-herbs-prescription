import 'server-only';

import { prisma } from '@/core/db/prisma';
import { PatientModel } from '@/core/types/models/patient';
import { getErrorMessage } from '@/core/utils/error';

export async function createPatient(patient: PatientModel) {
  try {
    console.log('%ccreatePatient', 'font-size: 12px; color: #00b3b3', patient);
    await new Promise((resolve) => setTimeout(resolve, 3000000));
    const data: PatientModel & { bloodPressure?: any; systolic: number; diastolic: number } = {
      ...patient,
      systolic: patient.bloodPressure.systolic,
      diastolic: patient.bloodPressure.diastolic,
    };
    delete data.bloodPressure;

    // return prisma.patient.create({
    //   data,
    // });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
