'use strict';

const Controller = require('egg').Controller;

class TodoController extends Controller {
  async create() {
    const { ctx } = this;
    const userId = ctx.state.user.id;
    
    // 参数验证
    ctx.validate({
      title: { type: 'string', required: true },
      description: { type: 'string', required: false },
      priority: { type: 'number', required: false },
      category: { type: 'string', required: false },
      due_date: { type: 'string', required: false },
    });

    const todo = await ctx.service.todo.create({
      ...ctx.request.body,
      user_id: userId,
    });

    ctx.body = {
      success: true,
      data: todo,
    };
  }

  async index() {
    const { ctx } = this;
    const userId = ctx.state.user.id;
    
    const todos = await ctx.service.todo.findAll(userId);

    ctx.body = {
      success: true,
      data: todos,
    };
  }

  async show() {
    const { ctx } = this;
    const userId = ctx.state.user.id;
    const todoId = ctx.params.id;

    const todo = await ctx.service.todo.findById(todoId, userId);
    if (!todo) {
      ctx.throw(404, '待办事项不存在');
    }

    ctx.body = {
      success: true,
      data: todo,
    };
  }

  async update() {
    const { ctx } = this;
    const userId = ctx.state.user.id;
    const todoId = ctx.params.id;

    ctx.validate({
      title: { type: 'string', required: false },
      description: { type: 'string', required: false },
      status: { type: 'number', required: false },
      priority: { type: 'number', required: false },
      category: { type: 'string', required: false },
      due_date: { type: 'string', required: false },
    });

    const todo = await ctx.service.todo.update(todoId, userId, ctx.request.body);
    if (!todo) {
      ctx.throw(404, '待办事项不存在');
    }

    ctx.body = {
      success: true,
      data: todo,
    };
  }

  async destroy() {
    const { ctx } = this;
    const userId = ctx.state.user.id;
    const todoId = ctx.params.id;

    const success = await ctx.service.todo.destroy(todoId, userId);
    if (!success) {
      ctx.throw(404, '待办事项不存在');
    }

    ctx.body = {
      success: true,
      message: '删除成功',
    };
  }
}

module.exports = TodoController; 