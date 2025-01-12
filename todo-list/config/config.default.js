'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1647734844109_3317';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // 关闭CSRF
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:3000'], // 允许跨域的域名
  };

  // 添加CORS配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 添加JWT配置
  // config.jwt = {
  //   secret: 'your-jwt-secret-key-here',
  //   enable: true,
  // };

  // 添加参数验证
  config.validate = {
    convert: true,
  };

  // 添加数据库配置
  config.sequelize = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'todo_list',
    username: 'postgres', // 根据实际配置修改
    password: 'postgres', // 根据实际配置修改
    define: {
      underscored: true, // 使用下划线命名法
      timestamps: true, // 添加 created_at 和 updated_at
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true, // 不自动将表名变为复数
    }, 
  };

  return {
    ...config,
  };
};