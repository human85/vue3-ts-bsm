<script setup lang="ts">
import { useSettingStore } from '@/store/settingStore'
import { useUserStore } from '@/store/userStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

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

// 主题相关
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
const dark = ref(false)
const html = document.documentElement

function changeTheme() {
  html.style.setProperty('--el-color-primary', color.value)
}

function setDarkMode() {
  dark.value ? html.classList.add('dark') : html.classList.remove('dark')
}
</script>

<template>
  <el-button icon="Refresh" circle @click="refresh" />
  <el-button icon="FullScreen" circle @click="toggleFullScreen" />
  <el-popover title="主题设置" :width="200" trigger="hover">
    <template #reference>
      <el-button icon="Setting" circle />
    </template>
    <ul>
      <li class="theme">
        <span>主题颜色</span>
        <div class="color-picker">
          <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="changeTheme" />
        </div>
      </li>
      <li class="dark-mode">
        <span>暗黑模式</span>
        <div>
          <el-switch
            v-model="dark"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
            @change="setDarkMode"
          />
        </div>
      </li>
    </ul>
  </el-popover>
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

ul {
  padding: 0;

  li {
    display: flex;
    gap: 2em;
    align-items: center;
    margin-bottom: 1em;
    list-style: none;

    .color-picker {
      margin-left: 24px;
    }
  }
}
</style>
