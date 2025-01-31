'use strict';

const Service = require('egg').Service;

class TodoService extends Service {
  async create(payload) {
    const { ctx } = this;
    const { tags = [], ...todoData } = payload;
    
    const result = await ctx.model.transaction(async t => {
      // 创建待办事项
      const todo = await ctx.model.Todo.create(todoData, { transaction: t });
      
      // 处理标签
      if (tags.length > 0) {
        const existingTags = await ctx.model.Tag.findAll({
          where: { name: tags },
          transaction: t,
        });
        
        const existingTagNames = existingTags.map(tag => tag.name);
        const newTagNames = tags.filter(tag => !existingTagNames.includes(tag));
        
        // 创建新标签
        const newTags = await ctx.model.Tag.bulkCreate(
          newTagNames.map(name => ({ name })),
          { transaction: t }
        );
        
        // 关联所有标签
        await todo.setTags([...existingTags, ...newTags], { transaction: t });
      }
      
      return todo;
    });

    return this.findById(result.id, payload.user_id);
  }

  async findById(id, userId) {
    const { ctx } = this;
    return ctx.model.Todo.findOne({
      where: { id, user_id: userId },
      include: [{
        model: ctx.model.Tag,
        as: 'tags',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      }],
    });
  }

  async findAll(userId, query = {}) {
    const { ctx } = this;
    const where = { user_id: userId };
    
    return ctx.model.Todos.findAll({
      where,
    });
  }

  async update(id, userId, payload) {
    const { ctx } = this;
    const { tags, ...todoData } = payload;
    
    const result = await ctx.model.transaction(async t => {
      const todo = await this.findById(id, userId);
      if (!todo) return null;
      
      // 更新待办事项
      await todo.update(todoData, { transaction: t });
      
      // 更新标签
      if (tags) {
        const existingTags = await ctx.model.Tag.findAll({
          where: { name: tags },
          transaction: t,
        });
        
        const existingTagNames = existingTags.map(tag => tag.name);
        const newTagNames = tags.filter(tag => !existingTagNames.includes(tag));
        
        // 创建新标签
        const newTags = await ctx.model.Tag.bulkCreate(
          newTagNames.map(name => ({ name })),
          { transaction: t }
        );
        
        // 更新关联
        await todo.setTags([...existingTags, ...newTags], { transaction: t });
      }
      
      return todo;
    });

    return result ? this.findById(id, userId) : null;
  }

  async destroy(id, userId) {
    const { ctx } = this;
    const todo = await this.findById(id, userId);
    if (!todo) return false;
    await todo.destroy();
    return true;
  }
}

module.exports = TodoService; 