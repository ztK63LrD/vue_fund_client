import { createRouter, createWebHistory } from "vue-router";
// createRouter用于创建路由器实例，可以管理多个路由
export default createRouter({
  // 路由的模式的设置
  history: createWebHistory(),
  // 管理路由
  routes: [
    {
      path: '/login',
      name: 'login',
      component:()=>import('@/pages/login/index.vue'),
      meta: {
        title: '登录界面'
      }
    },
    {
      redirect: '/home',
      path: '/',
      name: 'home',
      component:()=>import('@/pages/home/index.vue'),
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '/home',
          component: ()=>import('@/pages/home/head/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/manage/capital',
          component: ()=>import('@/pages/home/capital/index.vue'),
          meta: {
            title: '个人资金'
          }
        },
        {
          path: '/manage/info',
          component: ()=>import('@/pages/home/info/index.vue'),
          meta: {
            title: '个人信息'
          }
        },
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/404/index.vue'),
      meta: {
        title: '404界面'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'any',
      redirect: '/404',
    }
  ]
})