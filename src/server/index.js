const dotenv = require('dotenv');
dotenv.config();

var aylien = require("aylien_textapi");
const bodyParser = require('body-parser');
const express = require("express");
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use dist
app.use(express.static('dist'))

app.get('/', function (req, res) {
    if (process.env.NODE_ENV == 'prod')
        res.sendFile('dist/index.html')
    if (process.env.NODE_ENV == 'dev')
        res.sendFile(path.resolve('src/client/views/index.html'))
})

// Setup empty JS object to act as endpoint for all routes
let projectData = [];

var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
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
        subjectivity: response.subjectivity,
        polarity_confidence: response.polarity_confidence,
        subjectivity_confidence: response.subjectivity_confidence,
        text: response.text.substring(0,800)+'...'
    }

    console.log(newEntry);

    projectData.push(newEntry);

    return projectData;
}

app.get('/all', sendData);
function sendData(request, response) {
    response.send(projectData);
}

module.exports = {
    app: app,
    addResponse: addResponse
}