import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { getCatgory1Api, getCatgory2Api, getCatgory3Api, getAttrInfoApi } from '@/api/product/attr/index'
import type { Category1, Category2, Category3, Attr } from '@/api/product/attr/type'

export const useCategoryStore = defineStore('category', () => {
  // 一级分类数据
  const category1List = ref<Category1[]>([])
  // 获取一级分类数据的方法
  async function getCategory1List() {
    const res = await getCatgory1Api()
    category1List.value = res.data
  }

  // 二级分类数据
  const category2List = ref<Category2[]>([])
  // 获取二级分类数据的方法
  async function getCategory2List(id: number) {
    const res = await getCatgory2Api(id)
    category2List.value = res.data
  }

  // 三级分类数据
  const category3List = ref<Category3[]>([])
  // 获取三级分类数据的方法
  async function getCategory3List(id: number) {
    const res = await getCatgory3Api(id)
    category3List.value = res.data
  }

  // 当前的展示的一 二 三 级分类对象相应 id
  const cate1Id = ref<number | string>('') // 一级分类 id
  const cate2Id = ref<number | string>('') // 二级分类 id
  const cate3Id = ref<number | string>('') // 三级分类 id
  const attrList = ref<Attr[]>([])

  // 监听一级分类选项改变
  watch(cate1Id, () => {
    cate2Id.value = ''
    cate3Id.value = ''
    category3List.value = []
    getCategory2List(cate1Id.value as number)
  })
  // 监听二级分类选项改变
  watch(cate2Id, newId => {
    cate3Id.value = ''
    if (!newId) return
    getCategory3List(cate2Id.value as number)
  })

  // 获取属性列表的方法
  async function getAttrList() {
    const { data } = await getAttrInfoApi(cate1Id.value as number, cate2Id.value as number, cate3Id.value as number)
    attrList.value = data
  }

  // 监听三级分类选项改变
  watch(cate3Id, async newId => {
    attrList.value = []
    if (!cate2Id.value || !newId) return
    getAttrList()
  })

  return {
    category1List,
    getCategory1List,
    category2List,
    getCategory2List,
    category3List,
    getCategory3List,
    cate1Id,
    cate2Id,
    cate3Id,
    attrList,
    getAttrList
  }
})
