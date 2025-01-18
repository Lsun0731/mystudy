'use strict';

const bcrypt = require('bcryptjs');

module.exports = app => {
  const { STRING, INTEGER, DATE,TEXT } = app.Sequelize;

  const Users = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING },
    email: STRING,
    password: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  Users.associate = function () {
    Users.hasMany(app.model.Todos);
  };

  Users.addHook('beforeCreate',async (user) => {
    // 加密user.password
    console.log('useruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruser');

    console.log(user);
    if (user) {
      console.log(user);
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  Users.addHook('beforeUpdate',async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  })

  console.log(app)
  console.log(bcrypt)


  return Users;
};

