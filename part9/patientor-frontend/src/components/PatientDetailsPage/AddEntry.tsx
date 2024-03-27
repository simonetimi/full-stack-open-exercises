import { useState } from 'react';
import { Button } from '@mui/material';
import { HealthCheckRating } from '../../types';
import Patients from '../../services/patients';
import type { Entry } from '../../types';
import axios from 'axios';

export default function AddEntry({
  id,
  showAdd,
  setShowAdd,
  setNotification,
}: {
  id?: string;
  showAdd: boolean;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedType, setSelectedType] = useState('Hospital');
  const [selectedHealthCheck, setSelectedHealthCheck] = useState(
    HealthCheckRating.Healthy,
  );
  const [basicEntry, setBasicEntry] = useState({ specialist: '' });
  const [hospitalEntry, setHospitalEntry] = useState({
    discharge: { date: '', criteria: '' },
  });
  const [occupationalEntry, setOccupationalEntry] = useState({
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: '',
    },
  });

  if (!showAdd) {
    return null;
  }

  const onSubmitEntry = async () => {
    setShowAdd(!showAdd);
    try {
      let newEntry: Partial<Entry> = basicEntry;
      if (selectedType === 'Hospital') {
        if (
          hospitalEntry.discharge &&
          hospitalEntry.discharge.date &&
          hospitalEntry.discharge.criteria
        ) {
          newEntry = { ...newEntry, ...hospitalEntry, type: 'Hospital' };
        } else {
          throw new Error('Invalid Hospital Entry data');
        }
      } else if (selectedType === 'HealthCheck') {
        newEntry = {
          ...newEntry,
          healthCheckRating: selectedHealthCheck,
          type: 'HealthCheck',
        };
      } else if (selectedType === 'OccupationalHealthcare') {
        if (occupationalEntry.employerName) {
          newEntry = {
            ...newEntry,
            ...occupationalEntry,
            type: 'OccupationalHealthcare',
          };
        } else {
          throw new Error('Invalid OccupationalHealthcare Entry data');
        }
      }
      if (!id) {
        throw new Error('Missing ID parameter!');
      }
      await Patients.createEntry(id, newEntry as Entry);
      setNotification('Entry added successfully!');
      setTimeout(() => setNotification(''), 3500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotification(error.message);
        setTimeout(() => setNotification(''), 3500);
        throw error;
      } else {
        setNotification('Unknown error');
        setTimeout(() => setNotification(''), 3500);
      }
    }
  };

  const onClickRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };

  const onClickRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case 'healthy':
        setSelectedHealthCheck(HealthCheckRating.Healthy);
        break;
      case 'low':
        setSelectedHealthCheck(HealthCheckRating.LowRisk);
        break;
      case 'high':
        setSelectedHealthCheck(HealthCheckRating.HighRisk);
        break;
      case 'critical':
        setSelectedHealthCheck(HealthCheckRating.CriticalRisk);
        break;
    }
  };

  const onChangeEntry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBasicEntry({ ...basicEntry, [name]: value });
  };

  const onChangeDisDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHospitalEntry({
      discharge: {
        ...hospitalEntry.discharge,
        date: event.target.value,
      },
    });
  };

  const onChangeCriteria = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHospitalEntry({
      discharge: {
        ...hospitalEntry.discharge,
        criteria: event.target.value,
      },
    });
  };

  const onChangeEmployer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOccupationalEntry({
      ...occupationalEntry,
      employerName: event.target.value,
    });
  };

  const onChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOccupationalEntry({
      ...occupationalEntry,
      sickLeave: {
        ...occupationalEntry.sickLeave,
        startDate: event.target.value,
      },
    });
  };

  const onChangeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOccupationalEntry({
      ...occupationalEntry,
      sickLeave: {
        ...occupationalEntry.sickLeave,
        endDate: event.target.value,
      },
    });
  };

  return (
    <>
      {' '}
      <form name="selectType" className="flex gap-3">
        <div className="radio">
          <label>
            <input
              className="mr-2"
              type="radio"
              name="type"
              value="Hospital"
              onChange={onClickRadio}
              checked={selectedType === 'Hospital'}
            />
            Hospital Entry
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              className="mr-2"
              type="radio"
              name="type"
              value="OccupationalHealthcare"
              onChange={onClickRadio}
              checked={selectedType === 'OccupationalHealthcare'}
            />
            Occupational Healthcare
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              className="mr-2"
              type="radio"
              name="type"
              value="HealthCheck"
              onChange={onClickRadio}
              checked={selectedType === 'HealthCheck'}
            />
            Health Check Entry
          </label>
        </div>
      </form>
      <form className="flex flex-col gap-4 w-52">
        <p>Date: *</p>
        <input
          className="border"
          name="date"
          type="date"
          onChange={onChangeEntry}
        ></input>
        <p>Specialist: *</p>
        <input
          className="border"
          name="specialist"
          type="text"
          onChange={onChangeEntry}
        ></input>
        <p>Description: *</p>
        <input
          className="border"
          name="description"
          type="text"
          onChange={onChangeEntry}
        ></input>
        <p>Diagnosis code:</p>
        <input
          className="border"
          name="diagnosis"
          type="text"
          onChange={onChangeEntry}
        ></input>
        {selectedType === 'Hospital' ? (
          <div className="flex flex-col gap-4 w-52">
            <h3 className="my-4">Discharge:</h3>
            <p>Discharge date: *</p>
            <input
              className="border"
              name="disDate"
              type="date"
              onChange={onChangeDisDate}
            ></input>
            <p>Criteria: *</p>
            <input
              className="border"
              name="criteria"
              type="text"
              onChange={onChangeCriteria}
            ></input>
          </div>
        ) : null}
        {selectedType === 'OccupationalHealthcare' ? (
          <div className="flex flex-col gap-4 w-52">
            <p>Employer name: *</p>
            <input
              className="border"
              name="employer"
              type="text"
              onChange={onChangeEmployer}
            ></input>
            <p>Sick Leave Start: *</p>
            <input
              className="border"
              name="start"
              type="date"
              onChange={onChangeStartDate}
            ></input>
            <p>Sick Leave End: *</p>
            <input
              className="border"
              name="end"
              type="date"
              onChange={onChangeEndDate}
            ></input>
          </div>
        ) : null}
        {selectedType === 'HealthCheck' ? (
          <>
            <div className="radio">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="type"
                  value="healthy"
                  onChange={onClickRating}
                  checked={selectedHealthCheck === HealthCheckRating.Healthy}
                />
                Healthy
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="type"
                  value="low"
                  onChange={onClickRating}
                  checked={selectedHealthCheck === HealthCheckRating.LowRisk}
                />
                Low Risk
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="type"
                  value="high"
                  onChange={onClickRating}
                  checked={selectedHealthCheck === HealthCheckRating.HighRisk}
                />
                High Risk
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="type"
                  value="critical"
                  onChange={onClickRating}
                  checked={
                    selectedHealthCheck === HealthCheckRating.CriticalRisk
                  }
                />
                Critical Risk
              </label>
            </div>
          </>
        ) : null}
        <Button
          style={{
            marginTop: '30px',
            marginBottom: '50px',
          }}
          type="button"
          variant="contained"
          onClick={onSubmitEntry}
        >
          Add
        </Button>
      </form>
    </>
  );
}
