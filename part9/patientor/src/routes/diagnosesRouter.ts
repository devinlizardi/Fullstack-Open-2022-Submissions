import express from "express";
import { Diagnosis } from "../types";
import diagnosesData from './../../data/diagnoses.json';

// might have broken everything 
const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const diagnoses: Diagnosis[] = diagnosesData;

router.get('/', (_req, res) => {
  res.json(diagnoses);
});

export default router;