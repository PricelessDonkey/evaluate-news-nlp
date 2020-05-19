const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var aylien = require("aylien_textapi");
const bodyParser = require('body-parser');
const app = express()

app.use(express.static('dist'))

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

console.log(__dirname)

// Setup empty JS object to act as endpoint for all routes
projectData = [];

var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.post('/submit', processUrl);

function processUrl(req, res) {
    let reqBody = req.body;
    let urlString = reqBody.urlString;
    
    textapi.sentiment({
        'url': urlString
    }, function(error, response) {
        if (error === null) {
            addResponse(response);
            res.status(201).send('OK');
        } else {
            res.status(500).send(error);
        }
    })
}

function addResponse(response) {
    let newEntry = {
        polarity: response.polarity,
        subjectivity: response.subjectivity
    }

    projectData.push(newEntry);
}

app.get('/all', sendData);
  
function sendData(request, response) {
    response.send(projectData);
}
