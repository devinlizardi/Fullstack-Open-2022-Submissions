"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Genders).includes(param);
};
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseField = (field) => {
    if (!field || !isString(field)) {
        throw new Error(`malformatted param: ${field}`);
    }
    return field;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`malformatted gender: ${gender}`);
    }
    return gender;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, }) => {
    const newEntry = {
        name: parseField(name),
        dateOfBirth: parseField(dateOfBirth),
        ssn: parseField(ssn),
        gender: parseGender(gender),
        occupation: parseField(occupation),
    };
    return newEntry;
};
exports.default = toNewPatient;
