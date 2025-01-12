'use strict';

module.exports = options => {
  return async function jwtMiddleware(ctx, next) {
    const token = ctx.request.header.authorization?.split(' ')[1];
    if (!token) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '未登录',
      };
      return;
    }

    try {
      const decoded = ctx.app.jwt.verify(token, options.secret);
      ctx.state.user = decoded;
      await next();
    } catch (err) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '登录已过期',
      };
    }
  };
}; 