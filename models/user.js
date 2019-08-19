'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        isEmail: true,
        notNull: true,
      }
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Project);
  };
  return User;
};
