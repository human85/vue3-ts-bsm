<script lang="ts" setup>
import { useCategoryStore } from '@/store/categoryStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'Category'
})

defineProps({
  scene: {
    type: Number,
    default: 0
  }
})

const { category1List, category2List, category3List, cate1Id, cate2Id, cate3Id } = storeToRefs(useCategoryStore())
const { getCategory1List } = useCategoryStore()
// 页面挂载获取一级分类数据
onMounted(() => getCategory1List())
</script>

<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select :disabled="scene === 0 ? false : true" v-model="cate1Id">
          <el-option v-for="item in category1List" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select :disabled="scene === 0 ? false : true" v-model="cate2Id">
          <el-option v-for="item in category2List" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="scene === 0 ? false : true" v-model="cate3Id">
          <el-option v-for="item in category3List" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
