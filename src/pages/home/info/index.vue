<template>
  <div class="info">
    <div>{{ useStore.userInfo?.name }}</div>
    <div>{{ useStore.userInfo?.identity }}</div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/user'
const useStore = useUserStore()
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>