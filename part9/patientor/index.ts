import express from 'express';

const PORT = 3001;
const app = express();

app.get('/ping', (_req, res) => {
  console.log('pinged');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});