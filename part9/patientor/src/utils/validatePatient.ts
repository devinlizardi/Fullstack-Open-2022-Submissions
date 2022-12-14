import { Genders, NewPatient } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Genders => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Genders).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseField = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error(`malformatted param: ${field}`);
  }
  return field;
};

const parseGender = (gender: unknown): Genders => {
  if (!gender || !isGender(gender)) {
    throw new Error(`malformatted gender: ${gender}`);
  }
  return gender;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseField(name),
    dateOfBirth: parseField(dateOfBirth),
    ssn: parseField(ssn),
    gender: parseGender(gender),
    occupation: parseField(occupation),
    entries: []
  };
  return newEntry;
};

export default toNewPatient;
