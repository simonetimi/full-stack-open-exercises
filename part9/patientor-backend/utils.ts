import {
  Gender,
  AddedPatient,
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect or missing comment');
  }
  return text;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((a) => a.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const isArrayofEntries = (array: unknown): array is Entry[] => {
  if (!Array.isArray(array)) return false;
  return array.every((item) => isEntry(item));
};

const isEntry = (entry: unknown): entry is Entry => {
  return (
    isHealthCheckEntry(entry) ||
    isHospitalEntry(entry) ||
    isOccupationalHealthcareEntry(entry)
  );
};

const isHealthCheckEntry = (entry: unknown): entry is HealthCheckEntry => {
  return (
    typeof entry === 'object' &&
    entry !== null &&
    (entry as HealthCheckEntry).type === 'HealthCheck'
  );
};

const isHospitalEntry = (entry: unknown): entry is HospitalEntry => {
  return (
    typeof entry === 'object' &&
    entry !== null &&
    (entry as HospitalEntry).type === 'Hospital'
  );
};

const isOccupationalHealthcareEntry = (
  entry: unknown,
): entry is OccupationalHealthcareEntry => {
  return (
    typeof entry === 'object' &&
    entry !== null &&
    (entry as OccupationalHealthcareEntry).type === 'OccupationalHealthcare'
  );
};

const parseArrayofEntries = (array: unknown): Entry[] => {
  if (!isArrayofEntries(array)) {
    throw new Error('Incorrect or missing array of entries');
  }
  return array;
};

export function checkPatient(data: unknown): AddedPatient {
  if (!data || typeof data !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in data &&
    'dateOfBirth' in data &&
    'ssn' in data &&
    'gender' in data &&
    'occupation' in data &&
    'entries' in data
  ) {
    const newPatient: AddedPatient = {
      name: parseString(data.name),
      dateOfBirth: parseString(data.dateOfBirth),
      ssn: parseString(data.ssn),
      gender: parseGender(data.gender),
      occupation: parseString(data.occupation),
      entries: parseArrayofEntries(data.entries),
    };
    return newPatient;
  }
  throw new Error('Incorrect data: a field missing');
}

export const convertGender = (genderStr: string): Gender => {
  switch (genderStr.toLowerCase()) {
    case 'male':
      return Gender.Male;
    case 'female':
      return Gender.Female;
    case 'other':
      return Gender.Other;
    default:
      throw new Error('Invalid gender value: ' + genderStr);
  }
};
