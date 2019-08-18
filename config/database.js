const Sequelize = require('sequelize');

module.exports = new Sequelize('node_api_development', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres'
});
