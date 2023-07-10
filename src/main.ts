import '@/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'element-plus/es/hooks/use-locale/index'
import globalComponents from '@/components/index'
// svg 图标注册脚本
import 'virtual:svg-icons-register'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// 注册全局组件插件
app.use(globalComponents)

app.use(pinia)
app.use(router)

app.mount('#app')
