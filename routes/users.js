const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const { User } = require('../models');

// create application/json parser
var jsonParser = bodyParser.json();

router.get('/', (request, response) => {
  User.findAll()
    .then(users => response.json(users))
    .catch(error => console.log("Error: " + error));
});

router.get('/:id', (request, response) => {
  User.findByPk(request.params.id)
    .then(user => response.json(user))
    .catch(error => console.log("Error: " + error));
});

router.put('/:id', jsonParser, (request, response, next) => {
  const { firstName, lastName, email } = request.body;
  User.update({ firstName, lastName, email },
    { returning: true, where: { id: request.params.id } }
  )
    .then(([updatedRows, [updatedUser]]) => response.json({ user: updatedUser, updatedRows: updatedRows }))
    .catch(error => response.status(404).send(error.message));
});

router.post('/', jsonParser, (request, response) => {
  const { firstName, lastName, email } = request.body;
  User.create({ firstName, lastName, email })
    .then(user => response.json(user))
    .catch(error => response.status(404).send(error.message));
});


module.exports = router;
