<script setup lang="ts">
defineProps(['menuList'])
defineOptions({
  name: 'Menu'
})
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        {{ item.meta.title }}
      </template>
    </el-menu-item>

    <!-- 只有一个子路由 -->
    <el-menu-item
      v-if="item.children && item.children.length === 1 && !item.children[0].meta.hidden"
      :index="item.children[0].path"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        {{ item.children[0].meta.title }}
      </template>
    </el-menu-item>

    <!-- 一个以上子路由 -->
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menu-list="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<style scoped lang="scss">
.el-icon {
  margin-right: 13px;
}
</style>
