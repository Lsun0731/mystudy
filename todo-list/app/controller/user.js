'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password, email } = ctx.request.body;

    // 参数验证
    ctx.validate({
      username: { type: 'string', required: true, min: 2 },
      password: { type: 'string', required: true, min: 6 },
      email: { type: 'email', required: true },
    });

    const user = await ctx.service.user.create({
      username,
      password,
      email,
    });

    ctx.body = {
      success: true,
      data: user,
    };
    
  }

  async login() {
    const { ctx,logger } = this;
    const { username, password } = ctx.request.body;

    logger.info('--------------------------------')
    logger.info(username)
    logger.info(password)
    logger.info('--------------------------------')

    // console.log('--------------------------------')
    // console.log(username)
    // console.log(password)
    // console.log('--------------------------------')

    // 参数验证
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });

    const result = await ctx.service.user.login(username, password);

    ctx.body = {
      success: true,
      data: result,
    };
  }

  async current() {
    const { ctx } = this;
    const user = await ctx.service.user.findById(ctx.state.user.id);

    ctx.body = {
      success: true,
      data: user,
    };
  }
}

module.exports = UserController; 