'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class UserService extends Service {
  async create(payload) {
    const { ctx } = this;
    const { username, password, email } = payload;
    
    // 检查用户名是否已存在
    const existingUser = await ctx.model.User.findOne({ where: { username } });
    if (existingUser) {
      ctx.throw(422, '用户名已存在');
    }

    // 检查邮箱是否已存在
    const existingEmail = await ctx.model.User.findOne({ where: { email } });
    if (existingEmail) {
      ctx.throw(422, '邮箱已被使用');
    }

    // 加密密码
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // 创建用户
    const user = await ctx.model.User.create({
      username,
      password: `${salt}:${hash}`,
      email,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  async login(username, password) {

    const { ctx, app } = this;
    const user = await app.model.Users.findOne({ where: { username } });

    if (!user) {
      ctx.throw(401, '用户名或密码错误'); 
    }

    // 验证密码
    if (user.password !== password) {
      ctx.throw(401, '用户名或密码错误');
    }

    // 生成token
    const token = app.jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      app.config.jwt.secret,
        { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

  }

  async findById(id) {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  async genHex (){

  }
}

module.exports = UserService; 