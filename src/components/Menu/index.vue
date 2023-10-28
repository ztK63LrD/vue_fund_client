<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        :router="true"
        :default-active="$route.path"
        active-text-color="#409eff"
        background-color="#324057"
        class="el-menu-vertical-demo"
        text-color="#fff"
      >
        <el-menu-item index="/home">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="/capital">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>资金管理</span>
          </template>
          <el-menu-item index="/manage/capital">
            <el-icon><Coin /></el-icon>
            个人资金
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/info">
          <template #title>
            <el-icon><Avatar /></el-icon>
            <span>信息管理</span>
          </template>
          <el-menu-item index="/manage/info">
            <el-icon><User /></el-icon>
            个人信息
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { HomeFilled, Menu, Coin, Avatar, User } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
// 获取当前路由信息
let $route = useRoute()
</script>

<style lang="scss" scoped>
.tac {
  width: 100%;
  height: 100%;
  .el-menu-vertical-demo {
    height: calc(100vh - 70px);
  }
}
</style>