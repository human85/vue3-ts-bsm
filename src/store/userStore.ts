import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi, logoutApi } from '@/api/user'
import type { LoginData } from '@/api/user/type'
import { constanRoutes, asyncRoutes } from '@/router/routes'
import type { UserInfo } from '@/api/user/type'
import { getUserInfoApi } from '@/api/user/index'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter, type RouteRecordRaw, type RouteRecordName } from 'vue-router'
import { cloneDeep } from 'lodash'

export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter()
    const route = useRoute()

    const menuRoutes = ref<RouteRecordRaw[]>() // 仓库存储生成菜单需要的数组(路由)
    const userInfo = ref<UserInfo | null>(null) // 用户信息

    // 过滤用户拥有的异步路由的函数
    function filterAsyncRoutes(allRoutes: RouteRecordRaw[], userRoutesNamelist: (RouteRecordName | undefined)[]) {
      return allRoutes.filter(route => {
        if (userRoutesNamelist.includes(route.name)) {
          if (route.children && route.children.length > 0) {
            route.children = filterAsyncRoutes(route.children, userRoutesNamelist)
          }
          return true
        }
      })
    }

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

        // 计算当前用户需要展示的异步路由(深拷贝 防止改变原 asyncRoutes)
        // 使用JSON.parse(JSON.stringify(obj))进行深拷贝，有可能会导致一些属性丢失的问题，这是因为在JSON序列化和反序列化的过程中，一些非标准的属性会被忽略掉。
        // component属性的值是一个函数，而函数是无法被序列化和反序列化的，因此在深拷贝的过程中被忽略掉了
        const userAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoutes), res.data?.routes as string[])
        // 菜单修改
        menuRoutes.value = [...constanRoutes, ...userAsyncRoutes]
        // 异步路由、任意路由添加
        userAsyncRoutes.forEach(route => {
          router.addRoute(route)
        })
      }
    }
    const token = ref('') // 用户 token
    // 登录
    async function login(userInfo: LoginData) {
      const res = await loginApi(userInfo)
      if (res.code === 200) {
        token.value = res.data as string
        // await getUserInfo()
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

    return { token, login, menuRoutes, userInfo, getUserInfo, logout }
  },
  {
    persist: {
      paths: ['token']
    }
  }
)
