import { Typography } from '@mui/material';
import type {
  Entry,
  Diagnosis,
  HealthCheckEntry as HealthCheckEntryType,
  HospitalEntry as HospitalEntryType,
  OccupationalHealthcareEntry as OccupationalHealthcareEntryType,
} from '../../types';

interface EntriesProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntryType;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div className="border p-4 mb-4 border-slate-600 rounded-md">
      <Typography variant="body2">Date: {entry.date}</Typography>
      <Typography variant="body2">{entry.description}</Typography>
      {entry.diagnosisCodes ? (
        <>
          <Typography variant="body1" marginTop={'20px'}>
            Codes:
          </Typography>
          {entry.diagnosisCodes.map((code) => (
            <Typography variant="body2">
              {code}:{' '}
              {diagnoses.map((diagnosis) => {
                if (diagnosis.code === code) {
                  return diagnosis.name;
                }
              })}
            </Typography>
          ))}
        </>
      ) : null}
      <hr className="m-2" />
      <Typography variant="body2">
        Discharge Date: {entry.discharge.date}
      </Typography>
      <Typography variant="body2">
        Discharge Criteria: {entry.discharge.criteria}
      </Typography>
    </div>
  );
};

const OccupationalHealthcareEntry = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntryType;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div className="border p-4 mb-4 border-slate-600 rounded-md">
      <Typography variant="body2">Date: {entry.date}</Typography>
      <Typography variant="body2">{entry.description}</Typography>
      {entry.diagnosisCodes ? (
        <>
          <Typography variant="body1" marginTop={'20px'}>
            Codes:
          </Typography>
          {entry.diagnosisCodes.map((code) => (
            <Typography variant="body2">
              {code}:{' '}
              {diagnoses.map((diagnosis) => {
                if (diagnosis.code === code) {
                  return diagnosis.name;
                }
              })}
            </Typography>
          ))}
        </>
      ) : null}
      <hr className="m-2" />
      <Typography variant="body2">Employer: {entry.employerName}</Typography>
      {entry.sickLeave && (
        <Typography variant="body2">
          Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </Typography>
      )}
    </div>
  );
};

const HealthCheckEntry = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntryType;
  diagnoses: Diagnosis[];
}) => {
  let healthStatus = '';

  switch (entry.healthCheckRating) {
    case 0:
      healthStatus = 'No health issues';
      break;
    case 1:
      healthStatus = 'Low health concern';
      break;
    case 2:
      healthStatus = 'Moderate health concern';
      break;
    case 3:
      healthStatus = 'High health concern';
      break;
    default:
      healthStatus = 'Unknown health status';
  }

  return (
    <div className="border p-4 mb-4 border-slate-600 rounded-md">
      <Typography variant="body2">Date: {entry.date}</Typography>
      <Typography variant="body2">{entry.description}</Typography>
      {entry.diagnosisCodes ? (
        <>
          <Typography variant="body1" marginTop={'20px'}>
            Codes:
          </Typography>
          {entry.diagnosisCodes.map((code) => (
            <Typography variant="body2">
              {code}:{' '}
              {diagnoses.map((diagnosis) => {
                if (diagnosis.code === code) {
                  return diagnosis.name;
                }
              })}
            </Typography>
          ))}
        </>
      ) : null}
      <hr className="m-2" />
      <Typography variant="body2">
        Health Check Rating: {healthStatus}
      </Typography>
    </div>
  );
};

export default function Entries({ entries, diagnoses }: EntriesProps) {
  return (
    <>
      <Typography variant="h6" marginTop={'40px'}>
        Entries:
      </Typography>
      {entries.map((entry: Entry) => {
        switch (entry.type) {
          case 'Hospital':
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
          case 'OccupationalHealthcare':
            return (
              <OccupationalHealthcareEntry
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          case 'HealthCheck':
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
          default:
            return null;
        }
      })}
    </>
  );
}
