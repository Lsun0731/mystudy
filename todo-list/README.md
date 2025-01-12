# todo-list

## Development

```bash
# install dependencies
npm install
# start
npm run dev

# generate migration file
npx sequelize migration:generate
# migrate up
npx sequelize db:migrate
# migrate up for test database
NODE_ENV=test npx sequelize db:migrate
# migrate down
npx sequelize db:migrate:undo
npx sequelize db:migrate:undo:all
# migrate down for test database
NODE_ENV=test npx sequelize db:migrate:undo
NODE_ENV=test npx sequelize db:migrate:undo:all

# run migration and test, for CI environment
npm run ci
```

## Documents

[eggjs sequelize document](https://eggjs.org/zh-cn/tutorials/mysql.html)
[egg-sequelize](https://github.com/eggjs/egg-sequelize)
[sequelize](http://docs.sequelizejs.com)
[sequelize-cli and migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)
[factory-girl](https://github.com/aexmachina/factory-girl)

## 安装和运行
### 前置条件
- Node.js >= 16
- PostgreSQL >= 12
- npm >= 7

### 开发环境设置
1. 克隆项目
   ```bash
   git clone <project-url>
   cd todo-list
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 配置数据库
   - 创建PostgreSQL数据库
   - 修改 config/config.default.js 中的数据库配置

4. 运行数据库迁移
   ```bash
   npm run db:migrate
   ```

5. 添加测试数据（可选）
   ```bash
   npm run db:seed
   ```

6. 启动开发服务器
   ```bash
   npm run dev
   ```

### 部署说明
1. 生产环境配置
   - 修改 config/config.prod.js 配置文件
   - 设置环境变量：EGG_SERVER_ENV=prod

2. 启动服务
   ```bash
   npm start
   ```

3. 停止服务
   ```bash
   npm stop
   ```

### 测试
```bash
# 运行单元测试
npm test

# 运行测试覆盖率
npm run cov
```
