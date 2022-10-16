import express from "express";
import cors from "cors";
import diagnosesRouter from './routes/diagnosesRouter';

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("pinged");
  res.send("pong");
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
