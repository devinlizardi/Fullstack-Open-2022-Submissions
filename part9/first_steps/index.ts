import express from "express";
import bmiCalculator from "./bmiCalculator";
import { HealthData } from "./bmiCalculator";
import exerciseCalculator from './exerciseCalculator';
import { ExerciseData } from "./exerciseCalculator";

const PORT = 3001;
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!").end();
});

app.get("/bmi", (req, res) => {
  try {
    const calculatorResponse: HealthData = bmiCalculator(req.query);
    res.json(calculatorResponse);
  } catch (error: unknown) {
    res.statusMessage = "Missing Params";
    res
      .status(400)
      .send({
        error: "could not find weight and height in request query",
      })
      .end();
  }
});

app.post('/exercises', (req, res) => {
  try {
    const response: ExerciseData = exerciseCalculator(req.body);
    res.json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        error: error.message
      }).end();
    }
  }
});

app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`);
});
