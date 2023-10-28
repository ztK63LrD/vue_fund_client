<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form ref="formRef" class="login_form animate__animated animate__zoomInUp" :rules="rules" :model="loginForm" v-if="scene">
          <h1>资金管理系统</h1>
          <el-form-item label="邮箱" prop="email">
            <el-input
              class="input"
              :prefix-icon="FolderOpened"
              v-model="loginForm.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              class="input"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              type="password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" @click="onLogin">登录</el-button>
          </el-form-item>
          <el-form-item>
            <div class="register">
              首次使用？
              <span class="register-link" @click="changeScene">点我注册</span>
            </div>
          </el-form-item>
        </el-form>
        <el-form ref="formRef" class="login_form animate__animated animate__rotateIn" :rules="rules" :model="loginForm" v-else style="top:10vh">
          <h1>资金管理系统</h1>
          <el-form-item label="用户名" label-width="100px" prop="name">
            <el-input
              class="input"
              :prefix-icon="User"
              v-model="loginForm.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px" prop="email">
            <el-input
              class="input"
              :prefix-icon="FolderOpened"
              v-model="loginForm.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100px" prop="password">
            <el-input
              class="input"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              type="password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="100px" prop="isPassword">
            <el-input
              class="input"
              :prefix-icon="Lock"
              v-model="loginForm.isPassword"
              type="password"
              show-password
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择身份" label-width="100px" prop="identity">
            <el-select v-model="loginForm.identity" placeholder="请选择身份">
              <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" @click="onRegister">注册</el-button>
          </el-form-item>
          <el-form-item>
            <div class="register">
              已注册？
              <span class="register-link" @click="changeScene">去登录</span>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
 
<script setup lang="ts">
import { ref, reactive } from 'vue'
// 导入接口函数
import { reqRegister } from '@/api/user'
// 引入ts类型
import { registerResponseData } from '@/api/user_type'
import { ElMessage, ElNotification } from 'element-plus';
import { User, Lock, FolderOpened } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
// 引入用户信息相关数据的pinia仓库
import userUserStore from '@/store/user'

// 设置初始场景
let scene = ref<boolean>(true)
// 登录表单数据
let loginForm = reactive({
  name: '',
  email: '',
  password: '',
  isPassword: '',
  identity: '',
})
// 获取表单实例
let formRef = ref()
// 获取路由器
let $router = useRouter()
// 获取仓库数据
let userStore = userUserStore()
// 下拉框选项
const options = [
  { value: '员工', label: '员工' },
  { value: '管理员', label: '管理员' },
]
// 验证两次密码输入是否一致
const validatePass = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('确认密码不能为空'))
  } else if (value !== loginForm.password) {
    callback(new Error("两次密码不一致！"))
  } else {
    callback()
  }
}
// 表单校验
const rules = {
  name: [
    { required: true, message: '用户名不能为空', trigger: ['blur'] },
    { min: 2, max: 15, message: '长度在2到15个字符之间' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: ['blur'] },
    { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱格式', trigger: ['blur'] }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: ['blur'] },
    { min: 6, max: 15, message: '密码长度须在6到15个字符之间' }
  ],
  isPassword: [
    { required: true, validator: validatePass, trigger: ['blur'] }
  ],
  identify: [
    { required: true, message: '选择身份不能为空', trigger: ['change'] },
  ],
}
// 进行场景切换
const changeScene = () => {
  scene.value = !scene.value
  if (scene.value) {
    Object.assign(loginForm, {
      name: '',
      isPassword: '',
      identity: '',
    })
  }
  Object.assign(loginForm, {
      name: '',
      email: '',
      password: '',
      isPassword: '',
      identity: '',
    })
}
// 注册按钮回调
const onRegister = async () => {
  // 在发起请求前对整个表单进行校验
  formRef.value.validate()
  let res: registerResponseData = await reqRegister(loginForm)
  if (res._id) {
    ElMessage({
      type: 'success',
      message: '注册成功',
    })
    // 切换场景
    scene.value = !scene.value
  }
}
// 登录按钮回调
const onLogin = async () => {
  // 在发起请求前对整个表单进行校验
  formRef.value.validate()
  await userStore.userLogin(loginForm)
  // 编程式导航跳转到首页
  $router.push('/')
  // 登录成功的提示信息
  ElNotification({
    type: 'success',
    message: '登录成功！',
  })
}
</script>
 
<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/bg.jpg') no-repeat;
  background-size: cover; // 调整背景图片的大小，使其填充整个元素背景，并尽可能保持比例不失真
  .login_form {
    position: relative;
    top: 20vh;
    height: auto;
    width: 60%;
    background: rgba(122, 119, 119, 0.5);
    box-shadow: 0 15px 25px rgba(50, 10, 10, 0.65);
    border-radius: 10px;
    padding: 40px 40px 8px;
    :deep(.el-form-item__label) {
      font-weight: bold;
      font-size:18px;
      font-family: cursive;
      color: #538404;
      justify-content: flex-start;
    }
    h1 {
      font-size: 30px;
      text-align: center;
      color: white;
      margin: 15px auto 40px;
    }
    .input {
      font-size: 15px;
      height: 38px;
      margin-bottom: 10px;
    }
    .login_btn {
      position: relative;
      height: 35px;
      font-size: 14px;
      color: #fff;
      margin: 10px auto 5px;
      width: 80%;
      background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
      border-radius: 30px;
      z-index: 1;
      &:hover {
        animation: ani 8s linear infinite;
        border: none;
      }
      @keyframes ani {
        0% {
          background-position: 0%;
        }
        100% {
          background-position: 400%;
        }
      }
      &:before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        z-index: -1;
        background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
        background-size: 400%;
        border-radius: 35px;
        transition: 1s;
      }
      &:hover::before {
        filter: blur(20px);
      }
      &:active {
        background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
      }
    }
    .register {
      font-size: 20px;
      margin: 0 auto 10px;
      .register-link {
        color: rgb(2, 170, 236);
        cursor: pointer;
        transition: transform 0.3s; /* 添加过渡效果，使文字变大的过程平滑 */
        display: inline-block; /* 将span元素转换为块级元素 */
        &:hover {
          transform: scale(1.2); /* 鼠标悬停时的缩放比例 */
          transform-origin: center; /* 设置缩放的中心点为文字的中心 */
        }
      }
    }
  }
}
</style>