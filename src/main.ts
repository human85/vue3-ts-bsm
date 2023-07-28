import '@/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'element-plus/es/hooks/use-locale/index'
import globalComponents from '@/components/index'
import globalDirectives from '@/directives/index'
// svg 图标注册脚本
import 'virtual:svg-icons-register'
// 暗黑模式样式文件
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

// 注册全局组件插件
app.use(globalComponents)
// 注册全局指令插件
app.use(globalDirectives)

app.use(router)

app.mount('#app')
