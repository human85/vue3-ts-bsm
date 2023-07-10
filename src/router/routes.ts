import type { RouteRecordRaw } from 'vue-router'

// 常量路由
export const constanRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
      icon: 'Promotion'
    }
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/layout/home',
    meta: {
      title: '',
      hidden: false,
      icon: ''
    },
    children: [
      {
        path: '/layout/home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled'
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete'
    }
  },
  {
    path: '/screen',
    name: 'screen',
    component: () => import('@/views/Screen/index.vue'),
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform'
    }
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'acl',
    meta: {
      title: '权限管理',
      icon: 'Lock'
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/Acl/User/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        component: () => import('@/views/Acl/Role/index.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/Acl/Permission/index.vue'),
        name: 'permission',
        meta: {
          title: '菜单管理',
          icon: 'Monitor'
        }
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',
      icon: 'Goods'
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/Product/Trademark/index.vue'),
        name: 'trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull'
        }
      },
      {
        path: '/product/attr',
        component: () => import('@/views/Product/Attr/index.vue'),
        name: 'attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled'
        }
      },
      {
        path: '/product/spu',
        component: () => import('@/views/Product/Spu/index.vue'),
        name: 'spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar'
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/views/Product/Sku/index.vue'),
        name: 'sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'any',
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true
    }
  }
]
