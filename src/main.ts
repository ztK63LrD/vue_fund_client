import { createApp, createVNode, render } from 'vue'
import App from '@/App.vue'
import 'reset.css'
// 引入 vue-router核心插件并安装
import router from '@/router'
// 导入进度条
import loadingBarVue from '@/components/loadingBar/index.vue'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入 animate 动画库
import 'animate.css'
// 引入pinia仓库
import pinia from '@/store'

const app = createApp(App)
// 安装vue-router
app.use(router)
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, // element-plus国际化配置
})
// 按照pinia仓库
app.use(pinia)

// 设置标题和进度条组件
const Vnode = createVNode(loadingBarVue)
render(Vnode, document.body)
// 设置路由前置守卫
router.beforeEach((to, _from, next) => {
  document.title = to.meta.title as string
  Vnode.component?.exposed?.startLoading()
  const isLogin = localStorage.getItem('TOKEN') ? true : false
  if (to.path == '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})
// 设置路由后置守卫
router.afterEach((to, _from) => {
  document.title = to.meta.title as string
  Vnode.component?.exposed?.endLoading()
})

app.mount('#app')
