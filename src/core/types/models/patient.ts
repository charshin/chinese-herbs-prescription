export interface PatientModel {
  fullname: string;
  dob: Date;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  occupation?: string | null;
  height: number;
  weight: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  address: string;
}
