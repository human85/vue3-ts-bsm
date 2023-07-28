<script lang="ts" setup>
import { useCategoryStore } from '@/store/categoryStore'
import { ref } from 'vue'
import type { SpuSaleAttr, SpuImg, SpuRecords, SkuData, SkuSaleAttrValue } from '@/api/product/spu/type'
import { getSpuImgListApi, getSpuSaleAttrApi } from '@/api/product/spu/index'
import { storeToRefs } from 'pinia'
import type { TableInstance } from 'element-plus'

const emit = defineEmits(['changeScene'])

const cancel = () => {
  emit('changeScene', false)
}
const { attrList } = storeToRefs(useCategoryStore()) // 平台属性
const saleAttrList = ref<SpuSaleAttr[]>([]) // 销售属性
const imgList = ref<SpuImg[]>([]) // spu 图片
const skuData = ref<SkuData>({
  category3Id: 0,
  spuId: 0,
  tmId: 0,
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuDefaultImg: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: []
})

const initSkuList = async (spu: SpuRecords) => {
  const { data: res1 } = await getSpuSaleAttrApi(spu.id as number)
  const { data: res2 } = await getSpuImgListApi(spu.id as number)
  saleAttrList.value = res1
  imgList.value = res2
}
defineExpose({
  initSkuList
})

const tableRef = ref<TableInstance | null>(null)
const setDefaultImg = (row: SpuImg) => {
  // 清空所有选项
  tableRef.value?.clearSelection()
  skuData.value.skuDefaultImg = row.imgUrl
  // 选中点击项
  tableRef.value?.toggleRowSelection(row, true)
}

const confirm = () => {
  attrList.value.forEach(attr => {
    if (!attr.attrIdAndValId) return
    const [attrId, valueId] = attr.attrIdAndValId.split('/').map(id => +id)
    skuData.value.skuAttrValueList.push({ attrId, valueId })
  })
  skuData.value.skuSaleAttrValueList = saleAttrList.value.reduce((prev: SkuSaleAttrValue[], current: SpuSaleAttr) => {
    if (current.saleAttrIdAndValId) return prev
    const [saleAttrId, saleAttrValueId] = current.saleAttrIdAndValId.split('/').map((id: string) => +id)
    prev.push({ saleAttrId, saleAttrValueId })
    return prev
  }, [])
}
</script>

<template>
  <el-form label-width="80px">
    <el-form-item label="SKU名称">
      <el-input v-model="skuData.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="skuData.price" type="number" min="0"></el-input>
    </el-form-item>
    <el-form-item label="质量(克)">
      <el-input v-model="skuData.weight" type="number" min="0"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input v-model="skuData.skuDesc" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline label-width="5em">
        <el-form-item v-for="attr in attrList" :key="attr.id" :label="attr.attrName" style="margin-bottom: 5px">
          <el-select v-model="attr.attrIdAndValId">
            <el-option
              v-for="value in attr.attrValueList"
              :key="value.id"
              :label="value.valueName"
              :value="`${value.attrId}/${value.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline label-width="5em">
        <el-form-item v-for="saleAttr in saleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
          <el-select v-model="saleAttr.saleAttrIdAndValId">
            <el-option
              v-for="value in saleAttr.spuSaleAttrValueList"
              :key="value.id"
              :label="value.saleAttrValueName"
              :value="`${value.baseSaleAttrId}/${value.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgList" ref="tableRef">
        <el-table-column align="center" type="selection" width="80"></el-table-column>
        <el-table-column label="图片">
          <template #default="{ row }">
            <img class="spuImg" :src="row.imgUrl" :alt="row.imgName" />
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template #default="{ row }">
            {{ row.imgName }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="success" @click="setDefaultImg(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirm">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.spuImg {
  width: 150px;
}
</style>
