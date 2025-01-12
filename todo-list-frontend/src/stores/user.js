import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login as loginApi, getCurrentUser } from '../api/user';
import { ElMessage } from 'element-plus';
import router from '../router';

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '');
  const userInfo = ref(null);

  // 登录
  const login = async (username, password) => {
    try {
      const data = await loginApi({ username, password });
      console.log(data)
      token.value = data.token;
      userInfo.value = data.user;
      localStorage.setItem('token', data.token);
      ElMessage.success('登录成功');
    //   router.push('/');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 登出
  const logout = () => {
    token.value = '';
    userInfo.value = null;
    localStorage.removeItem('token');
    router.push('/login');
  };

  // 获取用户信息
  const fetchUserInfo = async () => {
    if (token.value) {
      try {
        userInfo.value = await getCurrentUser();
        return true;
      } catch (error) {
        token.value = '';
        localStorage.removeItem('token');
        return false;
      }
    }
    return false;
  };

  return {
    token,
    userInfo,
    login,
    logout,
    fetchUserInfo,
  };
}); 