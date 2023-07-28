<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getHasOwnSkuApi, cancelSaleApi, onSaleApi, getSkuInfoApi, deleteSkuApi } from '@/api/product/sku/index'
import type { SkuData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(400)
const hasOwnSku = ref<SkuData[]>([])

async function getHasOwnSku() {
  const { data } = await getHasOwnSkuApi(currentPage.value, pageSize.value)
  hasOwnSku.value = data.records
  total.value = data.total
}

onMounted(() => getHasOwnSku())
watch([currentPage, pageSize], () => getHasOwnSku())

async function updateSaleStatus(sku: SkuData) {
  if (sku.isSale === 1) {
    await cancelSaleApi(sku.id)
    ElMessage.success('商品下架成功')
    getHasOwnSku()
  } else {
    await onSaleApi(sku.id)
    ElMessage.success('商品上架成功')
    getHasOwnSku()
  }
}

function edit() {
  ElMessage.info('编辑功能开发中🤣')
}

const drawer = ref(false) // 控制详情页是否显示
const skuInfo = ref<SkuData | null>(null)

async function showDetail(sku: SkuData) {
  drawer.value = true
  const { data } = await getSkuInfoApi(sku.id)
  skuInfo.value = data
}

async function deleteSku(skuId: number) {
  const result = await deleteSkuApi(skuId)
  if (result.code === 200) {
    await getHasOwnSku()
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<template>
  <el-card>
    <el-table :data="hasOwnSku" border style="margin-bottom: 15px">
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="名称" prop="skuName" width="250"></el-table-column>
      <el-table-column label="描述" prop="skuDesc" width="400"></el-table-column>
      <el-table-column label="默认图片" width="250">
        <template #default="{ row }">
          <img :src="row.skuDefaultImg" style="width: 150px; object-fit: cover" />
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" prop="weight" width="200"></el-table-column>
      <el-table-column label="重量(元)" prop="price" width="200"></el-table-column>
      <el-table-column label="操作" fixed="right" width="250">
        <template #default="{ row }">
          <el-button
            :icon="row.isSale === 0 ? 'Top' : 'Bottom'"
            type="success"
            @click="updateSaleStatus(row)"
          ></el-button>
          <el-button icon="Edit" type="primary" @click="edit"></el-button>
          <el-button icon="InfoFilled" type="info" @click="showDetail(row)"></el-button>
          <el-popconfirm width="200" :title="`确认删除${row.skuName}吗？`" @confirm="deleteSku(row.id)">
            <template #reference>
              <el-button icon="Delete" type="danger"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :background="true"
      layout="prev, pager, next, jumper,->, sizes, total"
      :total="total"
    />
    <!-- 抽屉展示详情 -->

    <el-drawer v-model="drawer">
      <template #header>
        <h3>商品详情</h3>
      </template>
      <el-row>
        <el-col :span="6">名称</el-col>
        <el-col :span="18">{{ skuInfo?.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{ skuInfo?.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">价格</el-col>
        <el-col :span="18">{{ skuInfo?.price }}&nbsp;元</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
          <el-tag v-for="value in skuInfo?.skuAttrValueList" :key="value.id">{{ value.valueName }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">
          <el-tag v-for="value in skuInfo?.skuSaleAttrValueList" :key="value.id">{{ value.saleAttrValueName }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">商品图片</el-col>
        <el-col :span="18">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="image in skuInfo?.skuImageList" :key="image.id">
              <img :src="image.imgUrl" :alt="image.imgName" style="width: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </el-card>
</template>
<style lang="scss" scoped>
.el-row {
  margin: 30px 0;

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
