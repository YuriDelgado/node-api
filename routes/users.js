const express = require('express');
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');

const router = express.Router();
const { User, Project } = require('../models');

// create application/json parser
var jsonParser = bodyParser.json();

router.get('/', (request, response) => {
  User.findAll({
    include: [{
      model: Project
    }]
  })
    .then(users => response.json(users))
    .catch(error => console.log("Error: " + error));
});

router.get('/:id', (request, response) => {
  User.findByPk(request.params.id, {
    include: [{
      model: Project
    }]
  })
    .then(user => response.json(user))
    .catch(error => console.log("Error: " + error));
});

router.put('/:id', jsonParser, (request, response, next) => {
  User.update(request.body,
    { returning: true, where: { id: request.params.id } }
  )
    .then(([updatedRows, [updatedUser]]) => response.json({ user: updatedUser, updatedRows: updatedRows }))
    .catch(error => response.status(404).send(error.message));
});

router.post('/', jsonParser, (request, response) => {
  User.create(request.body)
    .then(user => response.json(user))
    .catch(error => response.status(404).send(error.message));
});

module.exports = router;
