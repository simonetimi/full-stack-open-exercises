import express from 'express';
import patientsData from '../data/patients';
import { makePublic } from '../services/patients';
import { v1 as uuid } from 'uuid';
import { AddedPatient } from '../types';

const router = express.Router();

const patientsInMemory = patientsData;

router.get('/', function (_req, res) {
  const safePatients = makePublic(patientsInMemory);
  res.status(200).json(safePatients);
});

router.post('/', function (req, res) {
  const data = req.body as AddedPatient;
  const newPatient = { ...data, id: uuid() };
  patientsInMemory.push(newPatient);
  res.status(200).json(newPatient);
});

export default router;
