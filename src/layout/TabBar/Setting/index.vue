<script setup lang="ts">
import { useSettingStore } from '@/store/settingStore'
import { useUserStore } from '@/store/userStore'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'Setting'
})

const { refresh } = useSettingStore()
const { logout } = useUserStore()
const { userInfo } = storeToRefs(useUserStore())

// 切换全屏
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>

<template>
  <el-button icon="Refresh" circle @click="refresh" />
  <el-button icon="FullScreen" circle @click="toggleFullScreen" />
  <el-button icon="Setting" circle />
  <img class="avatar" :src="userInfo?.avatar" alt="用户头像" />
  <!-- 下拉菜单 -->
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      {{ userInfo?.name }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.avatar {
  margin: 0 12px;
  width: 2em;
  height: 2em;
  border-radius: 50%;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
