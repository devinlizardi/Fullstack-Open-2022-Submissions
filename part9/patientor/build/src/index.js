"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnosesRouter_1 = __importDefault(require("./routes/diagnosesRouter"));
const patientsRouter_1 = __importDefault(require("./routes/patientsRouter"));
const PORT = 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/api/ping", (_req, res) => {
    console.log("pinged");
    res.send("pong");
});
app.use('/api/diagnoses', diagnosesRouter_1.default);
app.use('/api/patients', patientsRouter_1.default);
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});
