"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("./../../data/patients.json"));
const validatePatient_1 = __importDefault(require("../utils/validatePatient"));
const getNonSensitivePatients = () => {
    return patients_json_1.default.map(obj => {
        const object = (0, validatePatient_1.default)(obj);
        return {
            id: obj.id,
            name: object.name,
            dateOfBirth: object.dateOfBirth,
            gender: object.gender,
            occupation: object.occupation
        };
    });
};
exports.default = {
    getNonSensitivePatients,
};
