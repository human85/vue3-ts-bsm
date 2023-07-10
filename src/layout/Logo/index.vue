<script setup lang="ts">
import setting from '@/setting'
defineOptions({
  name: 'Logo'
})
</script>

<template>
  <div class="logo" v-if="setting.showLogo">
    <img :src="setting.logo" alt="logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<style lang="scss">
.logo {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  height: $base-menu-logo-height;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    flex: 1 0 auto;
    margin: 0;
    font-size: $base-logp-title-fantSize;
    color: white;
    font-weight: 700;
  }
}
</style>
