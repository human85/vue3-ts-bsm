import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// @ts-ignore
import ElementPlus from 'unplugin-element-plus/vite'
// svg 使用
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    // build: {
    //   sourcemap: true
    // },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver()
          // 自动导入图标组件
          // IconsResolver({
          //   prefix: 'Icon'
          // })
        ]
      }),
      Components({
        // 指定 style 类型为 sass
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass' })
          // 自动注册图标组件
          // IconsResolver({
          //   enabledCollections: ['ep']
          // })
        ]
      }),
      // Icons({
      //   autoInstall: true
      // }),
      // 自动导入 ElementPlus 样式
      ElementPlus({
        defaultLocale: 'zh-cn' // 国际化：中文
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定 symbolId 格式
        symbolId: 'icon-[dir]-[name]'
      }),
      // 启用 mock
      viteMockServe({
        // default
        localEnabled: command === 'serve'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      // 自动引入自定义的 sass 变量
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/variable.scss" as *;
          `
        }
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址
          target: env.VITE_SERVE,
          // 需要代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path: string) => path.replace(/^\/api/, '')
        },
        ['/standby']: {
          // 获取数据的服务器地址
          target: 'http://139.198.104.58:8209',
          // 需要代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path: string) => path.replace(/^\/standby/, '')
        }
      }
    }
  }
})
