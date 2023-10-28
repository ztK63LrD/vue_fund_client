<template>
  <div class="header">
    <el-row>
      <el-col :span="12" class="logo-continer">
        <img src="../../assets/logo.jpg" class="logo" alt="logo图片">
        <span class="title">资金后台管理系统</span>
      </el-col>
      <el-col :span="12" class="user">
        <div class="userInfo">
          <img :src="userStore.userInfo?.avatar" class="avatar" alt="头像">
          <div class="text">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{ userStore.userInfo?.name }}</p>
          </div>
        </div>
        <span class="arrow">
          <!-- 下拉箭头 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-icon class="el-icon--right">
                <ArrowDown />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="getInfo">个人信息</el-dropdown-item>
                <el-dropdown-item @click="exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const $router = useRouter()

// 个人信息
const getInfo = () => {
  // 跳转到登录页
  $router.push({ path: '/info' })
}
// 退出
const exit = () => {
  userStore.userOut()
  // 跳转到登录页
  $router.push({ path: '/login' })
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 70px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  box-sizing: border-box;
  .logo-continer {
    display: flex;
    align-items: center;
    line-height: 60px;
    min-width: 500px;
    .logo {
      width: 160px;
      height: 60px;
      margin-right: 5px;
      display: inline-block;
    }
    .title {
      font-size: 25px;
      font-style: italic;
      font-weight: bold;
      background: linear-gradient(to right, #ff00ff, #00ffff);
      -webkit-background-clip: text;
      -moz-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }
  .user {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
    .userInfo {
      display: flex;
      align-items: center;
      .avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
      .text {
        margin-left: 20px;
        .comename {
          text-align: center;
        }
        .avatarname {
          margin-top: 5px;
          color: rgb(135, 235, 157);
          font-size: 18px;
        }
      }
    }
    .arrow {
      margin-left: 5px;
      .el-dropdown-link {
        cursor: pointer;
        color: #fff;
        display: flex;
        align-items: center;
        &:hover {
          border: none;
        }
      }
    }
  }
}
</style>