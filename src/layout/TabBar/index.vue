<script setup lang="ts">
import BreadScrumb from './BreadCrumb/index.vue'
import Setting from './Setting/index.vue'
defineOptions({
  name: 'TabBar'
})
</script>

<template>
  <div class="tabbar-left">
    <BreadScrumb />
  </div>
  <div class="tabbar-right">
    <Setting />
  </div>
</template>

<style lang="scss" scoped>
.tabbar-left {
  display: flex;
  align-items: center;
  gap: 1em;
}
.tabbar-right {
  display: flex;
  align-items: center;
}
</style>
