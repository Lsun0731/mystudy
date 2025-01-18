'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完才启动
    if (app.config.env === 'local' || app.config.env === 'unittest') {
      await app.model.sync({ force: false }); // 在开发环境下强制同步数据库结构 force:true
    } else {
      await app.model.sync({ alter: true }); // 在生产环境下使用 alter 模式
    }
  });

  // 注册错误处理
  app.on('error', (err, ctx) => {
    // 在这里可以做错误上报
    console.error('server error', err, ctx);
  });
};