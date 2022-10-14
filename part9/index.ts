import express from 'express'
import bmiCalculator from './bmiCalculator'
const PORT = 3001
const app = express()

app.get('/hello', (_req: any, res: any) => {
  res.send('Hello Full Stack!').end()
})

app.get('/bmi', (req: any, res: any) => {
  console.log(req.query)
  res.json(bmiCalculator(['184', '75']))
})

app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`)
})