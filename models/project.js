'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.User);
  };
  return Project;
};
