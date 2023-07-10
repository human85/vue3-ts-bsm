<script setup lang="ts">
import { useSettingStore } from '@/store/settingStore'

defineOptions({
  name: 'BreadCrumb'
})
const settingStore = useSettingStore()
</script>

<template>
  <!-- 折叠图标 -->
  <el-icon @click="settingStore.change">
    <component :is="settingStore.isFold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <template v-for="item in $route.matched" :key="item.path">
      <el-breadcrumb-item v-if="item.meta.title" :to="item.path">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style lang="scss" scoped></style>
