<template>
  <div class="NotFound">
    <div class="btn">
      <el-button class="button" type="primary" @click="goBack">点击按钮返回</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
// 返回上一页
const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.NotFound {
  width: 100%;
  height: 100vh;
  background: url('@/assets/404.gif') no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>