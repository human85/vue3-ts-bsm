import type { App, Component } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

interface GlobalComponents {
  [key: string]: Component
}

const globalComponents: GlobalComponents = {
  SvgIcon,
  Category
}

export default {
  install: (app: App) => {
    Object.keys(globalComponents).forEach(componentName => {
      app.component(componentName, globalComponents[componentName])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
