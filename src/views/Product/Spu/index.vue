<script setup lang="ts">
import SpuForm from './SpuForm.vue'
import SkuForm from './SkuForm.vue'
import { ref, watch } from 'vue'
import { useCategoryStore } from '@/store/categoryStore'
import { getSkuListApi, getSpuApi, deleteSpuApi } from '@/api/product/spu/index'
import type { SkuData, SpuRecords } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
defineOptions({
  name: 'Spu'
})

const categoryStore = useCategoryStore()
const currentPage = ref(1)
const pageSize = ref(3)
const total = ref(0) // 总数量
const spuList = ref<SpuRecords[]>([]) // spu 信息数组
const scene = ref(0) // 场景切换 0展示页面 1SpuForm 2SkuForm

// 获取 spu 信息的方法
async function getSpu() {
  const { data } = await getSpuApi(currentPage.value, pageSize.value, categoryStore.cate3Id as number)
  spuList.value = data.records
  total.value = data.total
}

//  监听 三级分类 页码 页面显示条数 变化获取 spu 信息
watch([currentPage, pageSize, () => categoryStore.cate3Id], () => {
  if (!categoryStore.cate3Id) return
  getSpu()
})

// spu 表单页面的引用
const spuRef = ref<InstanceType<typeof SpuForm> | null>(null)

// 点击修改 spu 的回调
function editSpu(spu: SpuRecords) {
  scene.value = 1
  spuRef.value?.editSpuData(spu)
}
// 添加 spu
function addSpu() {
  scene.value = 1
  spuRef.value?.addSpuData(categoryStore.cate3Id as number)
}

// 添加 sku
const skuRef = ref<InstanceType<typeof SkuForm> | null>(null)
const addSku = (spu: SpuRecords) => {
  scene.value = 2
  skuRef.value?.initSkuList(spu)
}

// spuForm 子组件点击取消或保存传递回来的自定义事件的回调
function handleChangeScene(flag: boolean, tip: string) {
  scene.value = 0
  // flag flase=取消
  if (flag) {
    if (tip === '添加') currentPage.value = 1
    getSpu()
  }
}

// 预览 sku 列表
const skuList = ref<SkuData[]>([])
const dialogVisible = ref(false)

async function showSkuList(spuId: number) {
  const { data } = await getSkuListApi(spuId)
  skuList.value = data
  dialogVisible.value = true
}

// 删除 spu 的回调
async function deleteSpu(spuId: number) {
  const res = await deleteSpuApi(spuId)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getSpu()
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<template>
  <div class="spu">
    <!-- 分类选择 -->
    <Category :scene="scene" />
    <!-- 展示卡 -->
    <el-card style="margin: 20px 0">
      <div v-show="scene === 0">
        <el-button @click="addSpu" type="primary" icon="Plus" :disabled="categoryStore.cate3Id ? false : true">
          添加SPU
        </el-button>
        <el-table :data="spuList" style="margin: 20px 0" border>
          <el-table-column label="序号" type="index" align="center" width="100"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="primary" icon="Plus" @click="addSku(row)"></el-button>
              <el-button type="warning" icon="Edit" @click="editSpu(row)"></el-button>
              <el-button type="info" icon="View" @click="showSkuList(row.id)"></el-button>
              <el-popconfirm width="200px" :title="`确认删除${row.spuName}吗？`" @confirm="deleteSpu(row.id)">
                <template #reference>
                  <el-button type="danger" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
        />
      </div>
      <SpuForm ref="spuRef" v-show="scene === 1" @change-scene="handleChangeScene" />
      <SkuForm ref="skuRef" v-show="scene === 2" @change-scene="handleChangeScene" />
    </el-card>
    <!-- dialog对话框：展示 skuList -->
    <el-dialog title="SKU列表" v-model="dialogVisible">
      <el-table :data="skuList" style="margin: 20px 0" border>
        <el-table-column label="sku名字" prop="skuName"></el-table-column>
        <el-table-column label="sku价格" prop="price"></el-table-column>
        <el-table-column label="sku重量" prop="weight"></el-table-column>
        <el-table-column label="sku图片">
          <template #default="{ row }">
            <img :src="row.skuDefaultImg" style="object-fit: cover; width: 120px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
