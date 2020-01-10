// a Node.JS REST API to read a CSV file and return it as a JSON object
import cors from 'cors';

import express from 'express';

import { createReadStream } from 'fs';

const csvjson = require('csvjson');
const { readFile } = require('fs');
const bodyParser = require('body-parser');

// set up express app
const app = express();

// use body-parser and cors middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded());

// set up static files
app.use(express.static('static'));

// set port number to listen with
app.listen(3000, () => console.log('server runnning on port 3000!'));

// Allowed HTTP methods
app.get('/', (req, res) => res.send('Received a GET HTTP method'));
app.post('/', (req, res) => res.send('Received a POST HTTP method'));
app.put('/', (req, res) => res.send('Received a PUT HTTP method'));
app.delete('/', (req, res) => res.send('Received a DELETE HTTP method'));

// const stream = createReadStream('.txt');
// fetch('/convert/', { method: 'POST', body: stream });

// var button = select('#submit');

app.post('/convert', (req, res) => {
	// read from CSV test file in project dir
	console.log(req.body.file)
	readFile(String(req.body.file), 'utf-8', (err, fileContent) => {
    // If error occors during reading of file, display error msg
    if (err) {
	console.log(err);
	throw new Error(err);
    }
    // convert file contents to json and set as request body contents
    req.body.content = csvjson.toObject(fileContent);
    console.log(req.body.content);
    // if filepath is null
    if (req.body.content == null) {
	res.json(['error', 'No data found']);
    }	
    // return json
    else {
		res.json(['json', req.body.content]);
		console.log(req.body.content);
	    }
	});
});
