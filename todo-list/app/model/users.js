'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Users = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    firstName: STRING,
    lastName: STRING,
    email: STRING,
    password: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  },{
    underscored: true,
  });

  Users.associate = function (models) {
    Users.hasMany(app.model.Todos);
  };

  return Users;
};

