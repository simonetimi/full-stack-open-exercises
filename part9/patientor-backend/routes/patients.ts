import express from 'express';
import patientsData from '../data/patients';
import { makePublic } from '../services/patients';
import { v1 as uuid } from 'uuid';
import { Patient, PublicPatient } from '../types';
import { checkPatient, convertGender, checkEntry } from '../utils';

const router = express.Router();

const patientsInMemory: Patient[] = patientsData.map((patient) => ({
  ...patient,
  gender: convertGender(patient.gender),
}));

router.get('/', function (_req, res) {
  const safePatients: PublicPatient[] = makePublic(patientsInMemory);
  res.status(200).json(safePatients);
});

router.get('/:id', function (req, res) {
  const id = req.params.id;
  const safePatients: PublicPatient[] = makePublic(patientsInMemory);
  const safePatient = safePatients.find((patient) => patient.id === id);
  res.status(200).json(safePatient);
});

router.post('/', function (req, res) {
  const data = checkPatient(req.body);
  const newPatient = { ...data, id: uuid() };
  patientsInMemory.push(newPatient);
  res.status(200).json(newPatient);
});

router.post('/:id/entries', function (req, res) {
  const data = checkEntry(req.body);
  const id = req.params.id;
  const patient = patientsInMemory.find((patient) => patient.id === id);
  if (patient) {
    patient.entries.push(data);
    res.status(200).json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

export default router;
