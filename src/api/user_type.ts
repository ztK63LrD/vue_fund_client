// 用户相关的ts类型
interface dataType {
  email: string
  password: string
}
// 登录接口参数需要携带的ts类型
export type loginForm = dataType
// 登录接口返回的参数类型
export interface loginResponseData {
  success: true
  token: string
}

// 注册接口需要携带的ts类型
export interface registerForm extends loginForm {
  name: string
  avatar?: string
  identity: string
}
// 注册接口返回的参数类型
export interface registerResponseData extends registerForm {
  _id?: string
  date?: string
}

// 获取用户信息登录接口返回的参数类型
export interface getLoginForm {
  id?: string
  name: string
  email: string
  avatar: string
  identity: string
}