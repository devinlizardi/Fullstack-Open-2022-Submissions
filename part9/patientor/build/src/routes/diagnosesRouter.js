"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_json_1 = __importDefault(require("./../../data/diagnoses.json"));
const router = express_1.default.Router();
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const diagnoses = diagnoses_json_1.default;
router.get('/', (_req, res) => {
    res.json(diagnoses);
});
exports.default = router;
