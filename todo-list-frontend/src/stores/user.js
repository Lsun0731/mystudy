import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login as loginApi, getCurrentUser } from '../api/user';
import { ElMessage } from 'element-plus';
import router from '../router';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    // 登录
    async login(username, password) {
      try {
        const data = await loginApi({ username, password });
        console.log(data)
        this.user = data;
        localStorage.setItem('token', data.token);
        ElMessage.success('登录成功');
        router.push('/');
        return true;
      } catch (error) {
        return false;
      }
    }
  },



  // // 登出
  // const logout = () => {
  //   token.value = '';
  //   userInfo.value = null;
  //   localStorage.removeItem('token');
  //   router.push('/login');
  // };

  // // 获取用户信息
  // const fetchUserInfo = async () => {
  //   if (token.value) {
  //     try {
  //       userInfo.value = await getCurrentUser();
  //       return true;
  //     } catch (error) {
  //       token.value = '';
  //       localStorage.removeItem('token');
  //       return false;
  //     }
  //   }
  //   return false;
  // };
}); 