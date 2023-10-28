<template>
  <div class="home">
    <div class="headernav">
      <HeaderNav></HeaderNav>
    </div>
    <div class="main">
      <div class="left">
        <Menu></Menu>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav/index.vue'
import Menu from '@/components/Menu/index.vue'

</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .headernav {
    width: 100%;
    position: fixed;
    z-index: 100;
  }
  .main {
    display: flex;
    padding-top: 70px;
    .left {
      width: 250px;
      position: fixed;
      z-index: 100;
    }
    .right {
      width: 100%;
      min-height: calc(100vh - 110px);
      background: #e1e1e1;
      padding: 20px;
      padding-left: 270px;
      overflow-x: hidden;
    }
  }
}
</style>