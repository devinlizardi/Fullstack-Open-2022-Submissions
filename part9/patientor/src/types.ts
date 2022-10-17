export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Genders;
  occupation: string;
};

export enum Genders {
  male = 'male',
  female = 'female',
  nonbinary = 'enby',
  other = 'other'
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;