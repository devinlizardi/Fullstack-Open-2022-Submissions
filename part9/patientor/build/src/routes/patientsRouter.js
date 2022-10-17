"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getNonSensitivePatients_1 = __importDefault(require("./../services/getNonSensitivePatients"));
const addPatientService_1 = __importDefault(require("../services/addPatientService"));
const validatePatient_1 = __importDefault(require("./../utils/validatePatient"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    const allPatients = getNonSensitivePatients_1.default.getNonSensitivePatients();
    res.json(allPatients);
});
router.post("/", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = (0, validatePatient_1.default)(req.body);
        const addedPatient = addPatientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({
                error: error.message,
            });
        }
    }
});
exports.default = router;
