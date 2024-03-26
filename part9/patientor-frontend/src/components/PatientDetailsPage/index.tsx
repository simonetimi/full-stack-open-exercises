import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import type { Diagnosis, Patient } from '../../types';

const PatientDetailPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    (async () => {
      if (id) {
        const response: Patient = await patients.getOne(id);
        setPatient(response);
      }
    })();
  });

  if (!patient) {
    return (
      <div>
        <Typography align="center" variant="h6" marginBottom={'40px'}>
          Patient Details
        </Typography>
        <Typography variant="body1" marginBottom={'40px'}>
          Patient not found
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography align="center" variant="h6" marginBottom={'40px'}>
        Patient Details
      </Typography>
      <Typography variant="body1" marginBottom={'40px'}>
        Display patient details for ID: {patient.name}
      </Typography>
      <Typography variant="body2">Name: {patient.name}</Typography>
      <Typography variant="body2">Gender: {patient.gender}</Typography>
      <Typography variant="body2">
        Date of birth: {patient.dateOfBirth}
      </Typography>
      <Typography variant="body2">Occupation: {patient.occupation}</Typography>
      {patient.entries.length > 0 ? (
        <>
          <Typography variant="h6" marginTop={'40px'}>
            Entries:
          </Typography>
          {patient.entries.map((entry) => {
            return (
              <div>
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
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default PatientDetailPage;
