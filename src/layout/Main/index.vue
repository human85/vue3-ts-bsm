<script setup lang="ts">
import { useSettingStore } from '@/store/settingStore'

defineOptions({
  name: 'Main'
})

const settingStore = useSettingStore()
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="settingStore.show" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s linear;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
