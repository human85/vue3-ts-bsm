<script setup lang="ts"></script>

<template>
  <div class="notfound">
    <img src="@/assets/images/error_images/404.png" />
    <el-button link @click="$router.replace('/layout/home')">返回首页</el-button>
  </div>
</template>

<style lang="scss" scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  img {
    width: 900px;
    object-position: 200px;
  }
}
</style>
