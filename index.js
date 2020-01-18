// a Node.JS REST API to read a CSV file and return it as a JSON object
const cors = require('cors');
const express = require('express');
const csvjson = require('csvjson');
const { readFile } = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

// setting up storage for user uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, 'user_upload.csv');
  },
});
const upload = multer({ storage });

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

// HTTP post method for converting file to JSON, populated by html form
app.post('/convert', upload.single('file'), (req, res) => {
  // if file exists convert to JSON and return, if conversion fails send 400 error code
  if (req.file) {
    readFile(String(req.file.path), 'utf-8', (err, fileContent) => {
      const jsonobj = csvjson.toObject(fileContent);
      if (jsonobj) {
        return res.json([jsonobj]);
      }
      if (err) {
        return res.send(400);
      }
    });
  }
});
