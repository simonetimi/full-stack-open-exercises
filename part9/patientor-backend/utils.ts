import { Gender, AddedPatient } from './types';

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

export function checkPatient(data: unknown): AddedPatient {
  if (!data || typeof data !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in data &&
    'dateOfBirth' in data &&
    'ssn' in data &&
    'gender' in data &&
    'occupation' in data
  ) {
    const newPatient: AddedPatient = {
      name: parseString(data.name),
      dateOfBirth: parseString(data.dateOfBirth),
      ssn: parseString(data.ssn),
      gender: parseGender(data.gender),
      occupation: parseString(data.occupation),
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
