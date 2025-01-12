# API文档

## 用户相关接口

### 注册
- 请求方式：POST
- 路径：/api/users/register
- 参数：
  ```json
  {
    "username": "string", // 用户名，必填，最小长度2
    "password": "string", // 密码，必填，最小长度6
    "email": "string"     // 邮箱，必填，需要符合邮箱格式
  }
  ```
- 返回示例：
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "demo",
      "email": "demo@example.com"
    }
  }
  ```

### 登录
- 请求方式：POST
- 路径：/api/users/login
- 参数：
  ```json
  {
    "username": "string", // 用户名，必填
    "password": "string"  // 密码，必填
  }
  ```
- 返回示例：
  ```json
  {
    "success": true,
    "data": {
      "token": "jwt_token",
      "user": {
        "id": 1,
        "username": "demo",
        "email": "demo@example.com"
      }
    }
  }
  ```

## Todo相关接口

### 创建待办事项
- 请求方式：POST
- 路径：/api/todos
- 请求头：Authorization: Bearer <token>
- 参数：
  ```json
  {
    "title": "string",       // 标题，必填
    "description": "string", // 描述，选填
    "priority": 1,          // 优先级，选填，1-低，2-中，3-高
    "category": "string",   // 分类，选填
    "due_date": "string"    // 截止日期，选填，ISO格式
  }
  ```

### 获取待办事项列表
- 请求方式：GET
- 路径：/api/todos
- 请求头：Authorization: Bearer <token>
- 查询参数：
  - status: 状态，0-待完成，1-已完成
  - category: 分类
  - priority: 优先级，1-低，2-中，3-高

### 获取待办事项详情
- 请求方式：GET
- 路径：/api/todos/:id
- 请求头：Authorization: Bearer <token>

### 更新待办事项
- 请求方式：PUT
- 路径：/api/todos/:id
- 请求头：Authorization: Bearer <token>
- 参数：同创建接口，所有字段都是选填

### 删除待办事项
- 请求方式：DELETE
- 路径：/api/todos/:id
- 请求头：Authorization: Bearer <token> 