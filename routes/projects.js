const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const { User, Project } = require('../models');

// create application/json parser
var jsonParser = bodyParser.json();

router.get('/', (request, response) => {
  Project.findAll()
    .then(projects => response.json(projects))
    .catch(error => console.log("Error: " + error));
});

router.get('/:id', (request, response) => {
  Project.findByPk(request.params.id)
    .then(project => response.json(project))
    .catch(error => console.log("Error: " + error));
});

router.put('/:id', jsonParser, (request, response, next) => {
  Project.update(request.body,
    { returning: true, where: { id: request.params.id } }
  )
    .then(([updatedRows, [updatedProject]]) => response.json({ project: updatedProject, updatedRows: updatedRows }))
    .catch(error => response.status(404).send(error.message));
});

router.post('/', jsonParser, (request, response) => {
  Project.create(request.body)
    .then(project => response.json(project))
    .catch(error => response.status(404).send(error.message));
});

module.exports = router;
