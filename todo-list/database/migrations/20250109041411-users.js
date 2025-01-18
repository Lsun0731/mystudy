'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },
  /**
   * 定义回滚操作
   * @param {Object} queryInterface - Sequelize 的查询接口对象
   * @param {Object} Sequelize - Sequelize 库的实例
   */
  async down (queryInterface, Sequelize) {
    /**
     * 添加回滚命令
     * 此操作将删除名为 'users' 的表
     * Example:
     * await queryInterface.dropTable('users');
     */
    // 删除名为 'users' 的表
    await queryInterface.dropTable('users');
  }
};
