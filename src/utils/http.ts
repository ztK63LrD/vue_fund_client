import { ElMessage, ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'

 // 进行axios二次封装：使用请求与响应拦截器
import axios from 'axios'

// 设置加载函数
let loading: any;
const startLoading = () => {
  loading = ElLoading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, .7)'
  })
}
const endLoading = () => {
  loading.close()
}

// 第一步：利用axios对象的create方法，去创建axios实例(其他的配置：基础路径、超时时间)
const request = axios.create({
  baseURL: '/api', // 基础路径会携带/api
  timeout: 5000, // 发起请求超时时间的设置
})
// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // 加载动画
  startLoading()
  if (localStorage.getItem("TOKEN")) {
    // 设置统一的请求头
    config.headers.Authorization = localStorage.getItem("TOKEN")
  }
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  return config // 返回配置对象
  },
  error => {
    return Promise.reject(error)
  }
)
// 第三步：响应拦截器
request.interceptors.response.use(
  // 成功的回调
  (response) => {
    // 结束动画
    endLoading()
    return response.data
  },
  (error) => {
    // 结束动画
    endLoading()
    //处理网络错误
    ElMessage({
      type: 'error',
      message: error.response.data,
    })
    // 获取错误状态码
    const { status } = error.response
    if (status == 401) {
      ElMessage.error('token失效,请重新登录！')
      // 清楚token
      localStorage.removeItem("TOKEN")
      // 跳转到登录页
      useRouter().push('/login')
    }
    return Promise.reject(error)
  },
)
// 对外暴露
export default request