import express from 'express'
import bmiCalculator from './bmiCalculator'
import { HealthData } from './bmiCalculator'
const PORT = 3001
const app = express()

app.get('/hello', (_req: any, res: any) => {
  res.send('Hello Full Stack!').end()
})

app.get('/bmi', (req: any, res: any) => {
  const bmi: HealthData | Error = bmiCalculator(req.query)
  if (bmi instanceof Error) {
    res.statusMessage = 'Missing Params'
    res.status(400).send({
      error: 'could not find weight and height in request query'
    }).end()
    return
  } else {
    res.json(bmi)
  }
})

app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`)
})