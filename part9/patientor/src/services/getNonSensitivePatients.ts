import patients from "./../../data/patients.json";
import { NonSensitivePatient } from "../types";
import toNewPatient from "../utils/validatePatient";


const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(obj => {
    const object = toNewPatient(obj);
    return {
      id: obj.id,
      name: object.name,
      dateOfBirth: object.dateOfBirth,
      gender: object.gender,
      occupation: object.occupation,
      entries: object.entries,
    };
  });
};

export default {
  getNonSensitivePatients,
};
