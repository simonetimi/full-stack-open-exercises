import express from 'express';
import data from '../data/diagnoses';
import { Diagnosis } from '../types';
const router = express.Router();

router.get('/', function (_req, res) {
  const diagnoses: Diagnosis[] = data;
  res.status(200).json(diagnoses);
});

export default router;
