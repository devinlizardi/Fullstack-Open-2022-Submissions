"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_json_1 = __importDefault(require("./../../data/patients.json"));
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v4)() }, patient);
    patients_json_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    addPatient,
};
