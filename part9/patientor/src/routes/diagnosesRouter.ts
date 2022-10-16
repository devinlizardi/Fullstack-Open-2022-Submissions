import express from "express";
import { Diagnose } from "../types";
import diagnosesData from './../../data/diagnoses.json';

const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const diagnoses: Diagnose[] = diagnosesData;

router.get('/', (_req, res) => {
  res.json(diagnoses);
});

export default router;