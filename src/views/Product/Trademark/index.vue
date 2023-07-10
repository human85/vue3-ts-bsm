<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { getTrademarkApi, addOrUpdateTrademarkApi, removeTrademarkApi } from '@/api/product/trademark/index'
import type { Trademark } from '@/api/product/trademark/type'
import type { UploadProps, FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'Trademark'
})

const currentPage = ref(1) // 当前页码
const pageSize = ref(3) // 每页条数
const total = ref(0) // 总页数

// 品牌数据
const trademarkList = ref<Trademark[]>([])

// 获取品牌数据
async function getTrademark() {
  const { data } = await getTrademarkApi(currentPage.value, pageSize.value)
  // ! 非空断言运算符 非 null | undefine
  total.value = data!.total
  trademarkList.value = data!.records
}
onMounted(() => getTrademark())
// 页码或每页显示条数改变时重新发起请求
watch(currentPage, () => getTrademark())
watch(pageSize, () => {
  currentPage.value = 1
  getTrademark()
})

// 对话框 添加品牌/修改品牌
const dialogAddVisible = ref(false)
// 修改请求的参数对象
const reqData: Trademark = reactive({
  tmName: '',
  logoUrl: ''
})

// 添加品牌的回调
function addTrademark() {
  // 清空上次 添加/修改 遗留数据
  reqData.id = 0
  reqData.logoUrl = ''
  reqData.tmName = ''
  dialogAddVisible.value = true
  formRef.value?.clearValidate(['tmName', 'logoUrl'])
}

// 修改品牌的回调
function editTrademark(row: Trademark) {
  Object.assign(reqData, row)
  dialogAddVisible.value = true
  nextTick(() => {
    ;(formRef.value as FormInstance).clearValidate(['tmName', 'logoUrl'])
  })
}

// 头像上传之前执行的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
    ElMessage.error('图片格式必须为JPG/PNG/GIF!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('图片大小不得大于10MB!')
    return false
  }
  return true
}
// 头像上传成功后执行的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = response => {
  if (response.code !== 200) {
    ElMessage.error('图片上传发生错误😫，请您重新上传🎡')
  }
  reqData.logoUrl = response.data
  // 移除图片未上传校验错误提示
  formRef.value?.clearValidate('logoUrl')
  // reqData.logoUrl = URL.createObjectURL(uploadFile.raw!)
}
// 上传失败
const handleAvatarError: UploadProps['onError'] = () => {
  ElMessage.error('图片上传发生错误😫，请您重新上传🎡')
}

function cancel() {
  dialogAddVisible.value = false
}

async function confirm() {
  //表单校验
  await formRef.value?.validate()

  // 添加/修改品牌
  const res = await addOrUpdateTrademarkApi(reqData)
  if (res.code === 200) {
    dialogAddVisible.value = false
    ElMessage.success(reqData.id ? '修改品牌成功' : '添加品牌成功')
    // 再次发起请求更新数据
    getTrademark()
  } else {
    ElMessage.error(reqData.id ? '修改品牌失败' : '添加品牌失败')
  }
}

// 表单校验规则
const formRef = ref<FormInstance>()
function validateTmName(rule: any, value: any, callback: any) {
  if (value.trim().length < 2) {
    callback(new Error('品牌名称不能小于两个字符'))
  }
  callback()
}

function validateLogoUrl(rule: any, value: any, callback: any) {
  if (!value) {
    callback(new Error('品牌logo不能为空'))
  }
  callback()
}

const rules: FormRules<Trademark> = {
  tmName: [{ required: true, trigger: 'blur', validator: validateTmName }],
  logoUrl: [{ required: true, validator: validateLogoUrl }]
}

// 删除品牌
async function removeTrademark(row: Trademark) {
  const res = await removeTrademarkApi(row.id as number)
  if (res.code === 200) {
    ElMessage.success('删除成功')
  } else if (res.code === 201) {
    ElMessage.error('系统数据，不能删除')
  } else {
    ElMessage.error('删除失败')
  }
  getTrademark()
}
</script>

<template>
  <div class="trademark">
    <el-card>
      <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
      <el-table height="70vh" :data="trademarkList" border>
        <el-table-column prop="id" label="序号" width="150" align="center" />
        <el-table-column prop="tmName" label="品牌名称" />
        <el-table-column prop="logoUrl" label="品牌logo">
          <template #default="{ row }">
            <img
              class="logo"
              :src="row.logoUrl.startsWith('http://') ? row.logoUrl : 'http://' + row.logoUrl"
              alt="品牌图片"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button size="small" icon="Edit" @click="editTrademark(row)">编辑</el-button>
            <el-popconfirm title="确认删除吗?" @confirm="removeTrademark(row)">
              <template #reference>
                <el-button icon="Delete" size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="total"
        background
      />
    </el-card>

    <!-- 添加品牌对话框 -->
    <el-dialog draggable v-model="dialogAddVisible" :title="reqData.id ? '修改品牌' : '添加品牌'">
      <el-form
        :status-icon="true"
        :model="reqData"
        :rules="rules"
        style="width: 60%"
        label-width="100px"
        label-position="left"
        ref="formRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="reqData.tmName" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="品牌Logo" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/standby/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
          >
            <img
              v-if="reqData.logoUrl"
              :src="reqData.logoUrl.startsWith('http://') ? reqData.logoUrl : 'http://' + reqData.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 页脚 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-table {
  margin: 20px 0;

  .logo {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
