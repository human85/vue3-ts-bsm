<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useSettingStore } from '@/store/settingStore'
import {
  getAllRolesApi,
  addOrEditRoleApi,
  getRolePermissonApi,
  assignPeimissionApi,
  removeRoleApi
} from '@/api/acl/role'
import type { Role, Permission } from '@/api/acl/role/type'
import { ElMessage, type FormInstance, type FormRules, ElTree } from 'element-plus'
import { useUserStore } from '@/store/userStore'

defineOptions({
  name: 'Role'
})

// 获取全部角色列表
const currentPage = ref(1) // 当前页码
const pageSize = ref(5) // 每页条数
const total = ref(0) // 总页数
const allRoles = ref<Role[]>([])

async function getAllRoles(roleName = '') {
  const { data } = await getAllRolesApi(currentPage.value, pageSize.value, roleName)
  allRoles.value = data.records
  total.value = data.total
}
onMounted(() => getAllRoles())
watch([currentPage, pageSize], () => getAllRoles())

// 搜索
const keyword = ref('')
function search() {
  getAllRoles(keyword.value)
  keyword.value = ''
}

// 重置
const settingStore = useSettingStore()
function reset() {
  settingStore.refresh()
}

// 添加或修改角色
const dialogVisible = ref(false) // 控制对话跨显隐
const formRef = ref<FormInstance>()
const roleData: Role = reactive({
  roleName: ''
})
const rules = reactive<FormRules<Role>>({
  roleName: [
    { required: true, message: '请输入职位名称', trigger: 'blur' },
    { min: 2, max: 10, message: '职位名称长度应在2-10位之间', trigger: 'blur' }
  ]
})

// 对话框关闭的回调：清除表单内容和验证结果
function clearForm() {
  delete roleData.id
  formRef.value?.resetFields()
}

function editRole({ roleName, id }: Role) {
  Object.assign(roleData, { roleName, id })
  dialogVisible.value = true
}

async function confirm() {
  await formRef.value?.validate()
  const res = await addOrEditRoleApi(roleData)
  if (res.code === 200) {
    ElMessage.success(roleData.id ? '职位修改成功' : '职位添加成功')
    dialogVisible.value = false
    if (!roleData.id) currentPage.value = 1
    getAllRoles()
  } else {
    ElMessage.error(roleData.id ? '职位修改失败' : '职位添加失败')
  }
}

// 分配权限
const drawer = ref(false) // 控制分配权限抽屉组件显隐
const peimissionData = ref<Permission[]>([]) // 角色权限列表
const defaultProps = {
  children: 'children', // 字节点名称
  label: 'name' // 显示标签名
}
const Idlist = ref<number[]>([]) // 默认选中的权限 id 数组

// 获取四级已有权限 id 数组
function getIdlist(list: Permission[], idArr: number[]) {
  list.forEach(item => {
    if (item.select && item.level === 4) {
      idArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      getIdlist(item.children, idArr)
    }
  })
  return idArr
}

// 权限分配点击按钮的回调
async function assignPermisson(roleId: number) {
  drawer.value = true
  const { data } = await getRolePermissonApi(roleId)
  peimissionData.value = data
  Idlist.value = getIdlist(data, []) // 获取已选中四级权限数组
  currentId = roleId
}

// 确认权限分配
let currentId = 0
const treeRef = ref<InstanceType<typeof ElTree>>()
const userStore = useUserStore()

async function confirmAssign() {
  const checkedKeys = treeRef.value?.getCheckedKeys().map(Number) as number[]
  const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys().map(Number) as number[]
  const res = await assignPeimissionApi(currentId, [...checkedKeys, ...halfCheckedKeys])
  if (res.code === 200) {
    ElMessage.success('权限分配成功')
    drawer.value = false
    // 重新获取用户信息（用户可能修改了自己的权限）
    userStore.getUserInfo()
  } else {
    ElMessage.error('权限分配失败')
  }
}

// 删除角色
async function removeRole(roleId: number) {
  const res = await removeRoleApi(roleId)
  if (res.code === 200) {
    ElMessage.success('职位删除成功')
    getAllRoles()
  } else {
    ElMessage.error('职位删除失败')
  }
}
</script>

<template>
  <div class="role">
    <el-card>
      <el-form inline class="form">
        <el-form-item label="职位搜索">
          <el-input v-model="keyword" placeholder="请输入搜索职位关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="keyword ? false : true">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 15px">
      <el-button type="primary" icon="Plus" @click="dialogVisible = true">添加职位</el-button>
      <el-table border style="margin: 10px 0" :data="allRoles">
        <el-table-column align="center" label="#" type="index"></el-table-column>
        <el-table-column align="center" label="ID" prop="id"></el-table-column>
        <el-table-column align="center" label="职位名称" prop="roleName"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column align="center" label="操作" width="280">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="User" @click="assignPermisson(row.id)">分配权限</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="editRole(row)">编辑</el-button>
            <el-popconfirm :title="`确定删除${row.roleName}吗?`" width="250" @confirm="removeRole(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15]"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="total"
        background
      />
    </el-card>

    <!-- 对话跨：用于添加或修改 role -->
    <el-dialog v-model="dialogVisible" :title="roleData.id ? '修改职位' : '添加职位'" width="30%" @close="clearForm">
      <el-form ref="formRef" :model="roleData" :rules="rules" status-icon>
        <el-form-item label="职位名称" prop="roleName">
          <el-input v-model.trim="roleData.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 抽屉：分配权限 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h3>分配权限</h3>
      </template>
      <template #default>
        <el-tree
          ref="treeRef"
          :data="peimissionData"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="Idlist"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="confirmAssign">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-form-item {
    margin: 0;
  }
}
</style>
