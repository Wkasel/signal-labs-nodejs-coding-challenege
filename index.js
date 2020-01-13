// a Node.JS REST API to read a CSV file and return it as a JSON object
import cors from 'cors';

import express from 'express';

const fs = require('fs');
const csvjson = require('csvjson');
const { readFile } = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
   filename: function(req, file, cb) {
        cb(null, 'user_upload' + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

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

const createReadStream = require('fs').createReadStream;
const createWriteStream = require('fs').createWriteStream;

// HTTP post method for converting file to JSON, populated by html form
app.post('/convert', upload.single('file'), (req, res) => {
    // read from CSV test file in project dir
    if (req.file) {
	readFile(String(req.file.path), 'utf-8', (err, fileContent) => {
	    console.log(req.file.path)
	    let jsonobj = csvjson.toObject(fileContent);
	    res.json([jsonobj]);
    	    if (err) {
		return res.send(400);
	    }
	});
	// fs.unlinkSync(req.file.path)
    }
});
