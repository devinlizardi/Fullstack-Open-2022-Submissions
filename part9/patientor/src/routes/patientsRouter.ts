import express from "express";
import patientService from "./../services/getNonSensitivePatients";
import addPatientService from "../services/addPatientService";
import toNewPatient from './../utils/validatePatient';
import { NewPatient, NonSensitivePatient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const allPatients: NonSensitivePatient[] =
    patientService.getNonSensitivePatients();
  res.json(allPatients);
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient = addPatientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        error: error.message,
      });
    }
  }
});

export default router;
