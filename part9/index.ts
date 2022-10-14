import express from 'express'
const app = express()

app.get('/hello', (_req: any, res: any) => {
  res.send('Hello Full Stack!').end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`)
})