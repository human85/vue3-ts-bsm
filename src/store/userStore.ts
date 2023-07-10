import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi, logoutApi } from '@/api/user'
import type { LoginData } from '@/api/user/type'
import { constanRoutes } from '@/router/routes'
import type { UserInfo } from '@/api/user/type'
import { getUserInfoApi } from '@/api/user/index'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter()
    const route = useRoute()

    const userInfo = ref<UserInfo | null>(null) // 用户信息
    // 获取用户信息
    async function getUserInfo() {
      const res = await getUserInfoApi()
      if (res.code !== 200) {
        ElMessage({
          type: 'error',
          message: res.message
        })
      } else {
        userInfo.value = res.data
      }
    }
    const token = ref('') // 用户 token
    // 登录
    async function login(userInfo: LoginData) {
      const res = await loginApi(userInfo)
      if (res.code === 200) {
        token.value = res.data as string
        getUserInfo()
        return 'ok'
      } else {
        return Promise.reject(res.data || res.message)
      }
    }

    // 退出登录
    function logout() {
      // TODO 调用退出登陆的接口
      logoutApi()
      userInfo.value = null
      token.value = ''
      router.push({ path: '/login', query: { redirect: route.path } })
    }

    // 仓库存储生成菜单需要数组(路由)
    const menuRoutes = constanRoutes

    return { token, login, menuRoutes, userInfo, getUserInfo, logout }
  },
  {
    persist: {
      paths: ['token', 'userInfo']
    }
  }
)
