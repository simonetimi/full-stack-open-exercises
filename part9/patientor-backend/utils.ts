import {
  Gender,
  AddedPatient,
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  BaseEntry,
  HealthCheckRating,
  SickLeave,
} from './types';
import { v1 as uuid } from 'uuid';

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

const parseArrayofStrings = (array: unknown): string[] => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  return array.map((item) => {
    if (!isString(item)) {
      throw new Error('Array contains non-string values');
    }
    return item;
  });
};

const parseDischarge = (discharge: unknown): HospitalEntry['discharge'] => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge information');
  }

  const dischargeObject = discharge as { date: unknown; criteria: unknown };

  if (
    !dischargeObject.date ||
    !isString(dischargeObject.date) ||
    !dischargeObject.criteria ||
    !isString(dischargeObject.criteria)
  ) {
    throw new Error('Incorrect or missing discharge information');
  }

  return {
    date: parseString(dischargeObject.date),
    criteria: parseString(dischargeObject.criteria),
  };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    typeof rating !== 'number' ||
    isNaN(rating) ||
    !Object.values(HealthCheckRating).includes(rating)
  ) {
    throw new Error('Incorrect or missing health check rating');
  }
  return rating;
};

export function checkEntry(data: unknown): Entry {
  if (!data || typeof data !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  function parseSickLeave(sickLeaveData: unknown): SickLeave | undefined {
    if (!sickLeaveData || typeof sickLeaveData !== 'object') {
      throw new Error('Incorrect or missing sick leave information');
    }
    const asSickLeave = sickLeaveData as SickLeave;

    if (
      !asSickLeave.startDate ||
      !isString(asSickLeave.startDate) ||
      !asSickLeave.endDate ||
      !isString(asSickLeave.endDate)
    ) {
      throw new Error('Incorrect or missing sick leave information');
    }

    return {
      startDate: parseString(asSickLeave.startDate),
      endDate: parseString(asSickLeave.endDate),
    };
  }

  const baseEntry = data as Omit<Entry, 'id'>;
  if (
    'description' in baseEntry &&
    'date' in baseEntry &&
    'specialist' in baseEntry &&
    'type' in baseEntry
  ) {
    const commonProps: Omit<BaseEntry, 'id'> = {
      description: parseString(baseEntry.description),
      date: parseString(baseEntry.date),
      specialist: parseString(baseEntry.specialist),
      diagnosisCodes: baseEntry.diagnosisCodes
        ? parseArrayofStrings(baseEntry.diagnosisCodes)
        : undefined,
    };

    switch (baseEntry.type) {
      case 'HealthCheck':
        const healthCheckData = data as HealthCheckEntry;
        return {
          id: uuid(),
          ...commonProps,
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(
            healthCheckData.healthCheckRating,
          ),
        };
      case 'Hospital':
        const hospitalData = data as HospitalEntry;
        return {
          id: uuid(),
          ...commonProps,
          type: 'Hospital',
          discharge: parseDischarge(hospitalData.discharge),
        };
      case 'OccupationalHealthcare':
        const occupationalData = data as OccupationalHealthcareEntry;
        return {
          id: uuid(),
          ...commonProps,
          type: 'OccupationalHealthcare',
          employerName: parseString(occupationalData.employerName),
          sickLeave: occupationalData.sickLeave
            ? parseSickLeave(occupationalData.sickLeave as SickLeave)
            : undefined,
        };
      default:
        throw new Error(`Unsupported entry type: ${baseEntry.type}`);
    }
  } else {
    throw new Error('Incorrect data: a field missing');
  }
}
