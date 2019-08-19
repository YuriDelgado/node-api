const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');

const app = express();
const PORT = 5000;

app.use('/users', require('./routes/users'));
app.use('/projects', require('./routes/projects'));

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
