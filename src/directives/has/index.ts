import { useUserStore } from '@/store/userStore'
import type { DirectiveBinding } from 'vue'

export const has = {
  mounted(el: HTMLButtonElement, binding: DirectiveBinding<string>) {
    const userStore = useUserStore()
    if (userStore.userInfo?.buttons.includes(binding.value)) return
    el.style.display = 'none'
  }
}
