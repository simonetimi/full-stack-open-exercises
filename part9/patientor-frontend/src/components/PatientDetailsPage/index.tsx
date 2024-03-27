import Entries from './Entries';
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
      <Typography variant="h6" marginBottom={'20px'} marginTop={'40px'}>
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
        <Entries entries={patient.entries} diagnoses={diagnoses} />
      ) : null}
    </div>
  );
};

export default PatientDetailPage;
