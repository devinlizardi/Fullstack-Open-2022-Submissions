"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getNonSensitivePatients_1 = __importDefault(require("./../services/getNonSensitivePatients"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    console.log('requested patients');
    const allPatients = getNonSensitivePatients_1.default.getNonSensitivePatients();
    res.json(allPatients);
});
exports.default = router;
