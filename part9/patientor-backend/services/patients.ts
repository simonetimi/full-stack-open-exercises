import { Patient, PublicPatient } from '../types';

export function makePublic(data: Patient[]): PublicPatient[] {
  const publicPatients: PublicPatient[] = data.map(({ ssn: _, ...patient }) => ({
    ...patient,
    gender: patient.gender,
  }));
  return publicPatients;
}
