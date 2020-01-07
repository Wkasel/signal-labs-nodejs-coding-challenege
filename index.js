import cors from 'cors';
import express from 'express';
const app = express();
app.use(cors());
app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});
