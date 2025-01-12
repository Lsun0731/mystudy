import request from './request';

// 创建待办事项
export const createTodo = (data) => {
  return request({
    url: '/todos',
    method: 'post',
    data,
  });
};

// 获取待办事项列表
export const getTodoList = (params) => {
  return request({
    url: '/todos',
    method: 'get',
    params,
  });
};

// 获取待办事项详情
export const getTodoDetail = (id) => {
  return request({
    url: `/todos/${id}`,
    method: 'get',
  });
};

// 更新待办事项
export const updateTodo = (id, data) => {
  return request({
    url: `/todos/${id}`,
    method: 'put',
    data,
  });
};

// 删除待办事项
export const deleteTodo = (id) => {
  return request({
    url: `/todos/${id}`,
    method: 'delete',
  });
}; 