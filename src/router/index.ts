import { createRouter, createWebHistory } from 'vue-router'
import { constanRoutes } from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/store/userStore'
import setting from '@/setting'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constanRoutes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0, left: 0, behavior: 'smooth' }
  }
})

// 全局前置导航守卫
router.beforeEach(async to => {
  // 动态设置文档标题
  document.title = setting.title + '-' + to.meta.title
  const { token, userInfo, getUserInfo, menuRoutes } = useUserStore()
  // 显示加载条
  NProgress.start()
  if (token) {
    // 已登录禁止返回登录页
    if (to.path === '/login') {
      return { path: '/' }
    } else {
      // 没有用户信息(刷新页面自动获取用户信息)
      if (!userInfo?.name || !menuRoutes) {
        await getUserInfo()
        // 避免异步路由未加载完成便跳转
        return to.path
      }
    }
  } else {
    // 避免无限重定向
    if (to.path !== '/login') {
      return { path: '/login', query: { redirect: to.path } }
    }
  }
})

// 全局后置导航首位
router.afterEach(() => {
  // 隐藏加载条
  NProgress.done()
})

export default router
