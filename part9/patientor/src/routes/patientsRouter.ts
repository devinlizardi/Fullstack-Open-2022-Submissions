import express from 'express';
import patientService from './../services/getNonSensitivePatients';
import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('requested patients')
  const allPatients: NonSensitivePatient[] = patientService.getNonSensitivePatients();
  res.json(allPatients);
});

export default router;