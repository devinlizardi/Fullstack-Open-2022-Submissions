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
    res.statusMessage = 'Missing weight or height in request query'
    res.status(400).end()
    return
  } else {
    res.json(bmi)
  }
})

app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`)
})