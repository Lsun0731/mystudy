'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwtMiddleware = app.middleware.jwt({ secret: app.config.jwt.secret });
  
  // 无需认证的路由
//   router.post('/api/users/register', controller.user.register);
  router.post('/api/users/login', controller.user.login);

//   // 需要认证的路由
  router.get('/api/users/current', jwtMiddleware, controller.user.current);
  
//   // Todo相关路由
  router.get('/api/todos', jwtMiddleware, controller.todo.index);
//   router.post('/api/todos', jwtMiddleware, controller.todo.create);
//   router.get('/api/todos/:id', jwtMiddleware, controller.todo.show);
//   router.put('/api/todos/:id', jwtMiddleware, controller.todo.update);
//   router.delete('/api/todos/:id', jwtMiddleware, controller.todo.destroy);
}; 