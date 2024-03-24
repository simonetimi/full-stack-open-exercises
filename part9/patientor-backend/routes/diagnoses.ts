import express from 'express';
import data from '../data/diagnoses';
import { Diagnosis } from '../types';
const router = express.Router();

export default router;

router.get('/', function (_req, res) {
  console.log('ho');
  const diagnoses: Diagnosis[] = data;
  res.status(200).json({ diagnoses });
});
