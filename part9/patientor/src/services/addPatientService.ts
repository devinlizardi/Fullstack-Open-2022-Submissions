import { v4 as uuid } from "uuid";
import { Patient, NewPatient } from "../types";
import patients from "./../../data/patients.json";


const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  addPatient,
};
