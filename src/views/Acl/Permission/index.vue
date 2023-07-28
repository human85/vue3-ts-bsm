<script setup lang="ts">
import { getAllPeimissionApi, addOrEditPeimissionApi, deletePermissionApi } from '@/api/acl/permission'
import type { Permission, PermissionData } from '@/api/acl/permission/type'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

defineOptions({
  name: 'Permission'
})

// 获取权限菜单
const permissionList = ref<Permission[]>([])
const loading = ref(true)

async function getAllPeimission() {
  loading.value = true
  const { data } = await getAllPeimissionApi()
  permissionList.value = data
  loading.value = false
}

onMounted(() => getAllPeimission())

// 添加/修改权限
const dialogVisible = ref(false)
// 请求携带的参数
const permissionData = reactive<PermissionData>({
  code: '',
  level: 0,
  name: '',
  pid: 0
})

function addPermission(row: Permission) {
  permissionData.level = row.level + 1
  permissionData.pid = row.id
  dialogVisible.value = true
}

function editPermission(row: Permission) {
  Object.assign(permissionData, row)
  dialogVisible.value = true
}

// dialog 关闭的回调：清除数据
function clearForm() {
  delete permissionData.id
  Object.assign(permissionData, {
    code: '',
    level: 0,
    name: '',
    pid: 0
  })
}

// 确认添加/修改
async function confirm() {
  const res = await addOrEditPeimissionApi(permissionData)
  if (res.code === 200) {
    dialogVisible.value = false
    ElMessage.success(permissionData.id ? '修改成功' : '添加成功')
    getAllPeimission()
    // 页面刷新？？?
  } else {
    ElMessage.error(permissionData.id ? '修改失败' : '添加失败')
  }
}

// 删除
async function deletePermission(id: number) {
  const res = await deletePermissionApi(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getAllPeimission()
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<template>
  <div class="permission">
    <el-table :data="permissionList" style="width: 100%; margin-bottom: 20px" row-key="id" border v-loading="loading">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作" width="280">
        <template #default="{ row }">
          <el-button type="primary" size="small" icon="Plus" v-show="row.level !== 4" @click="addPermission(row)">
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button type="primary" size="small" icon="Edit" v-show="row.level !== 1" @click="editPermission(row)">
            编辑
          </el-button>
          <el-popconfirm :title="`确认删除${row.name}吗?`" @confirm="deletePermission(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete" v-show="row.level !== 1">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- dailog对话框组件：添加或修改菜单/功能 -->
    <el-dialog
      @close="clearForm"
      v-model="dialogVisible"
      :title="permissionData.id ? '修改权限' : '添加权限'"
      width="30%"
    >
      <el-form label-width="5rem">
        <el-form-item label="权限名称">
          <el-input placeholder="请输入权限名称" v-model="permissionData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input placeholder="请输入权限值" v-model="permissionData.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
