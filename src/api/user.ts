// 用户登录 / 注册相关的接口
import request from "@/utils/http";
import type { loginForm, registerForm, loginResponseData, registerResponseData, getLoginForm } from './user_type'

// 枚举用户模块的接口地址
enum API {
  // 注册接口
  REGISTER_URL = '/users/register',
  // 登录接口
  LOGIN_URL = '/users/login',
  // 获取登录信息
  CURRENT_URL = '/users/current'
}
// 注册接口函数
export const reqRegister = (data: registerForm) => request.post<any, registerResponseData>(API.REGISTER_URL, data)
// 登录接口函数
export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取登录信息接口函数
export const reqUserInfo = () => request.get<any, getLoginForm>(API.CURRENT_URL)