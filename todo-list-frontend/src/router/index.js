import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: { guest: true }
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('../views/Layout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'todo/list',
          name: 'TodoList',
          component: () => import('../views/todo/List.vue')
        },
        {
          path: 'todo/new',
          name: 'TodoCreate',
          component: () => import('../views/todo/Create.vue')
        },
        {
          path: 'todo/:id',
          name: 'TodoEdit',
          component: () => import('../views/todo/Edit.vue')
        }
      ]
    }
  ]
});

// 路由守卫
// router.beforeEach(async (to, from, next) => {
//   const userStore = useUserStore();
//   const isAuthenticated = await userStore.fetchUserInfo();

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next('/login');
//   } else if (to.meta.guest && isAuthenticated) {
//     next('/');
//   } else {
//     next();
//   }
// });

export default router; 