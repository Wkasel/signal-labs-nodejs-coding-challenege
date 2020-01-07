import cors from 'cors';
import express from 'express';
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.listen(3000, () =>
  console.log('server runnning on port 3000!'),
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
app.post("/convert", (req, res, next) => {
    readFile('./test-data.csv', 'utf-8', (err, fileContent) => {
	if(err) {
            console.log(err); // Do something to handle the error or just throw it
            throw new Error(err);
	}
	req.body.content = csvjson.toObject(fileContent);
	console.log(req.body.content);
        if(req.body.content == null) {
            res.json(["error", "No data found damnit"]);
	} else {
	    res.json(["json", req.body.content]);
	}
    });
});
