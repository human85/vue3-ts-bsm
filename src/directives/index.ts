import type { App, Directive } from 'vue'
import { has } from './has/index'

interface GlobalDirectives {
  [key: string]: Directive
}

const globalDirectives: GlobalDirectives = {
  has
}

export default {
  install(app: App<Element>) {
    for (const [key, directive] of Object.entries(globalDirectives)) {
      app.directive(key, directive)
    }
  }
}
