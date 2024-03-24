import { Patient } from '../types';

type PublicPatient = Omit<Patient, 'ssn'>;

export function makePublic(data: Patient[]): PublicPatient[] {
  const publicPatients: PublicPatient[] = data.map(({ ssn: _, ...patient }) => patient);
  return publicPatients;
}
