<script setup lang="ts">
import Logo from './Logo/index.vue'
import Menu from './Menu/index.vue'
import Main from './Main/index.vue'
import TabBar from './TabBar/index.vue'
import { useUserStore } from '@/store/userStore'
import { useSettingStore } from '@/store/settingStore'
import { storeToRefs } from 'pinia'
defineOptions({
  name: 'Layout'
})

const userStore = useUserStore()
const { isFold } = storeToRefs(useSettingStore())
</script>

<template>
  <div class="layout-container">
    <div class="layout-sidebar" :class="{ fold: isFold }">
      <Logo />
      <!-- 侧边菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="isFold"
          background-color="$base-menu-background"
          :default-active="$route.path"
          text-color="white"
          router
        >
          <Menu :menu-list="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout-tabbar" :class="{ fold: isFold }">
      <TabBar />
    </div>
    <!-- 内容展示区 -->
    <div class="layout-main" :class="{ fold: isFold }">
      <Main />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;

  .layout-sidebar {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s linear;

    // 菜单折叠时添加类
    &.fold {
      width: $base-menu-min-width;
    }

    .scrollbar {
      height: calc(100vh - $base-menu-logo-height - 10px);

      .el-menu {
        margin-left: -7px;
        border-right: none;
      }
    }
  }

  .layout-tabbar {
    position: absolute;
    top: 0;
    left: $base-menu-width;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    border-bottom: 1px solid #d6cece;
    transition: all 0.3s linear;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }

  .layout-main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 1.5rem;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - 50px);
    overflow: auto;
    transition: all 0.3s linear;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
}
</style>
