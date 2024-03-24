import express from 'express';
import data from '../data/patients';
import { makePublic } from '../services/patients';
const router = express.Router();

router.get('/', function (_req, res) {
  const safePatients = makePublic(data);
  res.status(200).json(safePatients);
});

export default router;
