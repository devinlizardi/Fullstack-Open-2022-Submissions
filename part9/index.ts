import express from "express";
import bmiCalculator from "./bmiCalculator";
import { HealthData } from "./bmiCalculator";
const PORT = 3001;
const app = express();

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

app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`);
});
