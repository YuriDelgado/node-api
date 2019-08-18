const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');

// const db = require('./config/database');

const app = express();
const PORT = 5000;

// test database RTCPeerConnection
// db.authenticate()
//   .then(() => console.log('connected ok'))
//   .catch(error => console.log('Error: ' + error));

app.use('/users', require('./routes/users'));

// app.use(express.bodyParser());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
});
