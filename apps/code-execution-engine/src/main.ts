import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to code-execution-engine!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
