import { nextTick, ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  // 控制用户菜单是否折叠
  const isFold = ref(false)

  function change() {
    isFold.value = !isFold.value
  }

  // 控制刷新
  const show = ref(true)

  function refresh() {
    show.value = false
    nextTick(() => (show.value = true))
  }
  return { isFold, change, show, refresh }
})
