// 创建用户信息相关数据的仓库
import { defineStore } from 'pinia'
// 引入登录接口
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData, getLoginForm } from '@/api/user_type'
 
const useUserStore = defineStore('User', {
  // 存储数据
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'), // 用户唯一标识token
      userInfo: JSON.parse(localStorage.getItem('USERINFO') || 'null') as getLoginForm | null, // 用户登录具体信息
    }
  },
  actions: {
    // 处理用户登录
    async userLogin(data: loginForm) {
      const res: loginResponseData = await reqLogin(data)
      if (res.token) {
        this.token = res.token
        // 本地持久化存储
        localStorage.setItem('TOKEN', res.token)
        // 获取当前的登录信息
        const result: getLoginForm = await reqUserInfo()
        this.userInfo = result
        // 本地持久化存储
        localStorage.setItem('USERINFO', JSON.stringify(result))
        // 保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error())
      }
    },
    // 清除用户登录
    userOut() {
      // 清除本地缓存
      localStorage.removeItem("TOKEN")
      localStorage.removeItem("USERINFO")
      // 清除仓库数据
      this.token = null
      this.userInfo = null
    }
  },
  getters: {},
})
// 对外暴露仓库方法
export default useUserStore