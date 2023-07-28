<script lang="ts" setup>
import type { SpuRecords, Trademark, SpuSaleAttr, AllSaleAttr, SpuSaleAttrValue } from '@/api/product/spu/type'
import {
  getTrademarkListApi,
  getSpuImgListApi,
  getSpuSaleAttrApi,
  getSlectableAttrApi,
  addOrUpdateSpu
} from '@/api/product/spu/index'
import { ref, nextTick, computed } from 'vue'
import { type UploadProps, type UploadUserFile, type InputInstance, ElMessage } from 'element-plus'

const emit = defineEmits(['changeScene'])

const trademarkList = ref<Trademark[]>([]) // 已有品牌列表
const fileList = ref<UploadUserFile[]>([]) // spu 图片列表
const spuSaleAttr = ref<SpuSaleAttr[]>([]) // spu 已有销售属性列表
const allSaleAttr = ref<AllSaleAttr[]>([]) // spu 全部销售属性列表
const reqData = ref<SpuRecords>({
  spuName: '',
  description: '',
  category3Id: 0,
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: []
})

// 对外暴露初始化 spu 表单页面数据的方法
defineExpose({
  editSpuData,
  addSpuData
})
async function editSpuData(spu: SpuRecords) {
  // 深拷贝
  reqData.value = JSON.parse(JSON.stringify(spu))
  const { data: res1 } = await getTrademarkListApi()
  const { data: res2 } = await getSpuImgListApi(spu.id as number)
  const { data: res3 } = await getSpuSaleAttrApi(spu.id as number)
  const { data: res4 } = await getSlectableAttrApi()
  trademarkList.value = res1
  fileList.value = res2.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  spuSaleAttr.value = res3
  allSaleAttr.value = res4
  // console.log(spu)
  // console.log(res2)
  // console.log(res3)
}

const dialogVisible = ref(false) // 预览窗口显隐
const dialogImageUrl = ref('') // 预览图片的地址

// 图片上传之前的钩子
const beforeUpload: UploadProps['beforeUpload'] = rawFile => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
    ElMessage.error('图片格式必须为JPG/PNG/GIF!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('图片大小不得大于10MB!')
    return false
  }
  return true
}
// 图片上传失败的钩子
const handleError: UploadProps['onError'] = () => {
  ElMessage.error('图片上传发生错误😫，请您重新上传🎡')
}

// 照片预览的钩子
const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
  dialogVisible.value = true
  dialogImageUrl.value = uploadFile.url as string
}
// 照片移除的钩子
const handleRemove: UploadProps['onRemove'] = uploadFile => {
  fileList.value = fileList.value?.filter(item => item.uid !== uploadFile.uid)
}

// 添加销售属性相关业务
const selectedAttr = ref('') // 选择的要添加的属性的 id 及 name
// 动态计算可选属性数组
const selectableAttrs = computed(() => {
  return allSaleAttr.value.filter(item => {
    return spuSaleAttr.value.every(val => val.saleAttrName !== item.name)
  })
})
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = selectedAttr.value.split('/')
  const attrObj: SpuSaleAttr = {
    baseSaleAttrId: +baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  spuSaleAttr.value.push(attrObj)
  selectedAttr.value = ''
}

// 删除 tag 的回调
const handleClose = (valueList: SpuSaleAttrValue[], index: number) => {
  valueList.splice(index, 1)
}

const inputValue = ref('') // input 框文本值
const inputRefArr = ref<InputInstance[]>([]) // input 框组件模板引用数组
// 点击显示 tag 标签的 input 框的回调
function showInput(saleAttr: SpuSaleAttr, index: number) {
  saleAttr.inputVisible = true
  nextTick(() => {
    inputRefArr.value![index].input!.focus()
  })
}
// 确认 input 内容的方法
function handleInputConfirm(saleAttr: SpuSaleAttr) {
  if (!inputValue.value.trim()) {
    saleAttr.inputVisible = false
    inputValue.value = ''
    return
  }
  if (saleAttr.spuSaleAttrValueList.find(item => item.saleAttrValueName === inputValue.value)) {
    ElMessage.error('属性值不得重复')
    return
  }
  saleAttr.spuSaleAttrValueList.push({
    baseSaleAttrId: saleAttr.baseSaleAttrId as number,
    saleAttrValueName: inputValue.value
  })
  saleAttr.inputVisible = false
  inputValue.value = ''
}

// 点击删除销售属性的回调
function deleteAttr(index: number) {
  spuSaleAttr.value.splice(index, 1)
}

// 点击取消的回调
function cancel() {
  emit('changeScene', false)
}

// 点击保存按钮的回调
async function saveChange() {
  // 整理照片墙
  reqData.value.spuImageList = fileList.value.map(item => {
    return {
      imgName: item.name,
      imgUrl: item.response?.data ?? item.url
    }
  })
  // 整理销售属性
  reqData.value.spuSaleAttrList = spuSaleAttr.value
  // 添加/更新销售属性
  // console.log(reqData.value)
  const res = await addOrUpdateSpu(reqData.value)
  const tip = reqData.value.id ? '修改' : '添加'
  if (res.code === 200) {
    ElMessage.success(`SPU ${tip}成功!`)
    emit('changeScene', true, tip)
  } else {
    ElMessage.error(`SPU ${tip}失败!`)
  }
}

// 添加 spu
async function addSpuData(cate3Id: number) {
  // 清空上次的数据
  reqData.value = {
    spuName: '',
    description: '',
    category3Id: 0,
    tmId: '',
    spuSaleAttrList: [],
    spuImageList: []
  }
  fileList.value = []
  spuSaleAttr.value = []

  reqData.value.category3Id = cate3Id
  const { data: res1 } = await getTrademarkListApi()
  const { data: res4 } = await getSlectableAttrApi()
  trademarkList.value = res1
  allSaleAttr.value = res4
}
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input v-model="reqData.spuName" placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="reqData.tmId" placeholder="请选择品牌">
        <el-option v-for="item in trademarkList" :key="item.id" :value="item.id" :label="item.tmName" />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input v-model="reqData.description" type="textarea" placeholder="描述信息" />
    </el-form-item>
    <!-- 照片墙 -->
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="fileList"
        action="/standby/admin/product/fileUpload"
        list-type="picture-card"
        :before-upload="beforeUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-error="handleError"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img style="width: 100%" w-full :src="dialogImageUrl" alt="预览图片" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="selectedAttr"
        :placeholder="selectableAttrs.length > 0 ? `还有${selectableAttrs.length}种选择` : '暂无可选择项'"
      >
        <el-option
          v-for="item in selectableAttrs"
          :key="item.id"
          :value="`${item.id}/${item.name}`"
          :label="item.name"
        />
      </el-select>
      <el-button :disabled="!selectedAttr" type="primary" icon="Plus" style="margin-left: 10px" @click="addSaleAttr">
        添加销售属性
      </el-button>
      <el-table :data="spuSaleAttr" border style="margin-top: 15px">
        <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column label="属性名" prop="saleAttrName" width="120"></el-table-column>
        <el-table-column label="属性值">
          <template #default="{ row, $index }">
            <el-tag
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="tag.id"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="handleClose(row.spuSaleAttrValueList, index)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.inputVisible"
              :ref="(el: InputInstance) => inputRefArr[$index] = el"
              v-model="inputValue"
              class="ml-1 w-20 tag-input"
              size="small"
              @keyup.enter="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            />
            <el-button
              v-else
              icon="Plus"
              type="success"
              class="button-new-tag ml-1"
              size="small"
              @click="showInput(row, $index)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ $index }">
            <el-button type="danger" size="small" icon="Delete" @click="deleteAttr($index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveChange">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
:deep(.el-upload-list__item-thumbnail) {
  object-fit: cover;
}

.el-tag {
  margin: 5px;
}

.tag-input {
  width: 7em;
}
</style>
