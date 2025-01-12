# Vue3 + Egg.js Todo List 项目

## 项目描述
这是一个基于Vue3和Egg.js的Todo List应用，用户可以进行待办事项的添加、删除、修改和查看操作。

## 项目结构

## 技术栈
- 前端: Vue3 + Vite + Element Plus
- 后端: Egg.js
- 数据库: PostgreSQL

## 功能特性
- 用户注册和登录
- 待办事项的增删改查
- 待办事项状态管理(待完成/已完成)
- 待办事项分类管理
- 待办事项优先级设置
- 待办事项截止日期设置

## 数据库设计
### 用户表(users)
- id: 主键
- username: 用户名
- password: 密码(加密存储)
- email: 邮箱
- created_at: 创建时间
- updated_at: 更新时间

### 待办事项表(todos)
- id: 主键
- user_id: 用户ID(外键关联users表)
- title: 待办事项标题
- description: 待办事项描述
- status: 状态(0:待完成, 1:已完成)
- priority: 优先级(1:低, 2:中, 3:高)
- category: 分类
- due_date: 截止日期
- created_at: 创建时间
- updated_at: 更新时间

## 安装和运行
### 前置条件
- Node.js >= 16
- PostgreSQL >= 12
- npm >= 7

### 安装步骤
1. 克隆项目
2. 安装依赖
3. 配置数据库
4. 运行迁移
5. 启动服务

## API文档
[详细API文档见此处] 