import request from './request';

// 用户登录
export const login = (data) => {
  return request({
    url: '/users/login',
    method: 'post',
    data,
  });
};

// 用户注册
export const register = (data) => {
  return request({
    url: '/users/register',
    method: 'post',
    data,
  });
};

// 获取当前用户信息
export const getCurrentUser = () => {
  return request({
    url: '/users/current',
    method: 'get',
  });
}; 