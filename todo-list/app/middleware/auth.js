'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    try {
      const token = ctx.request.header.authorization?.split(' ')[1];
      if (!token) {
        ctx.throw(401, '未登录');
      }
      
      // 验证token
      const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      ctx.state.user = decoded;
      
      await next();
    } catch (err) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        ctx.throw(401, '无效的token');
      }
      throw err;
    }
  };
}; 