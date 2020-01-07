//a Node.JS REST API to read a CSV file and return it as a JSON object
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
    //read from CSV test file in project dir
    readFile('./test-data.csv', 'utf-8', (err, fileContent) => {
	//If error occors during reading of file, display error msg
	if(err) {
            console.log(err);
            throw new Error(err);
	}
	//convert file contents to json and set as request body contents
	req.body.content = csvjson.toObject(fileContent);
	console.log(req.body.content);
	//if filepath is null
        if(req.body.content == null) {
            res.json(["error", "No data found"]);
	}
	//return json
	else {
	    res.json(["json", req.body.content]);
	}
    });
});
