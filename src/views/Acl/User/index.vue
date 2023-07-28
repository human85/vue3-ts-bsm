<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import {
  getUserListApi,
  addOrUpdateUserApi,
  getRoleListApi,
  assignRolesApi,
  removeUserApi,
  batchRemoveUsersApi
} from '@/api/acl/user/index'
import type { User, Role, AssignRolesData } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useSettingStore } from '@/store/settingStore'

defineOptions({
  name: 'User'
})

// 获取用户信息
const currentPage = ref(1) // 当前页码
const pageSize = ref(5) // 每页条数
const total = ref(0) // 总页数
const userList = ref<User[]>([])

async function getUserList(username = '') {
  const { data } = await getUserListApi(currentPage.value, pageSize.value, username)
  userList.value = data.records
  total.value = data.total
}

onMounted(() => getUserList())
watch([currentPage, pageSize], () => getUserList())

// 添加/修改 user
const drawer = ref(false) // 控制抽屉组件显隐
const userData: User = reactive({
  username: '',
  name: '',
  password: ''
})
const formRef = ref<FormInstance>() // 表单引用
const rules = reactive<FormRules<User>>({
  username: [{ required: true, min: 5, max: 10, message: '用户名必须在5~10位之间', trigger: 'blur' }],
  name: [{ required: true, min: 5, max: 10, message: '用户昵称必须在5~10位之间', trigger: 'blur' }],
  password: [{ required: true, min: 6, max: 12, message: '密码必须在6~12位之间', trigger: 'blur' }]
})

function addUser() {
  // 重置表单项，将其值重置为初始值，并移除校验结果
  delete userData.id
  Object.assign(userData, {
    username: '',
    name: '',
    password: ''
  })
  for (const key in userData) {
    formRef.value?.clearValidate(key)
  }
  drawer.value = true
}

function editUser({ username, name, id }: User) {
  Object.assign(userData, {
    username,
    name,
    id
  })
  drawer.value = true
}

async function confirm() {
  await formRef.value?.validate()
  const res = await addOrUpdateUserApi(userData)
  if (res.code === 200) {
    ElMessage.success(userData.id ? '修改成功!' : '添加成功')
    drawer.value = false
    // 刷新页面 防止用户修改当前账号
    window.location.reload()
  } else {
    ElMessage.error(userData.id ? '修改失败!' : '添加失败')
  }
}

// 分配角色
const roleDrawer = ref(false) // 控制分类角色抽屉显隐
const checkAll = ref(false) // 全选框状态
const isIndeterminate = ref(true) // 全选框不确定状态
const roles = ref<Role[]>([])
const checkedRoles = ref<Role[]>([])

// 点击分配角色的回调
async function setRoles({ username, id }: User) {
  Object.assign(userData, { username, id })
  const { data } = await getRoleListApi(id as number)
  roles.value = data.allRolesList
  checkedRoles.value = data.assignRoles
  roleDrawer.value = true
}

function handleCheckAllChange(val: boolean) {
  checkedRoles.value = val ? roles.value : []
  isIndeterminate.value = false
}

function handleCheckedRolesChange(value: Role[]) {
  checkAll.value = roles.value.length === value.length
  isIndeterminate.value = value.length > 0 && value.length < roles.value.length
}

// 确认分配角色的回调
async function assignRoles() {
  // 准备请求参数
  const data: AssignRolesData = {
    userId: userData.id as number,
    roleIdList: checkedRoles.value.map(role => role.id)
  }
  console.log(data)
  const res = await assignRolesApi(data)
  if (res.code === 200) {
    ElMessage.success('角色分类成功')
    await getUserList()
    roleDrawer.value = false
  } else {
    ElMessage.error('角色分配失败')
  }
}

// 删除用户
// 单个删除
async function removeUser(userId: number) {
  const res = await removeUserApi(userId)
  if (res.code === 200) {
    ElMessage.success('用户删除成功')
    getUserList()
  } else {
    ElMessage.error('用户删除失败')
  }
}
// 批量删除
const idList = ref<number[]>([])
async function batchRemoveUsers() {
  const res = await batchRemoveUsersApi(idList.value)
  if (res.code === 200) {
    ElMessage.success('批量删除用户成功')
    getUserList()
  } else {
    ElMessage.error('批量删除用户失败')
  }
}
// 表格多选框状态改变的回调
function getIdList(selection: User[]) {
  idList.value = selection.map(user => user.id as number)
}

// 搜索
const keyword = ref('')
function search() {
  getUserList(keyword.value)
  keyword.value = ''
}

// 重置
const settingStore = useSettingStore()
function reset() {
  settingStore.refresh()
}
</script>

<template>
  <div class="user">
    <el-card>
      <el-form inline class="form">
        <el-form-item label="用户名：">
          <el-input v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="keyword ? false : true">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 15px">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="warning" @click="batchRemoveUsers" :disabled="idList.length === 0">批量删除</el-button>
      <el-table border :data="userList" style="margin: 10px 0" @selection-change="getIdList">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column align="center" label="#" type="index"></el-table-column>
        <el-table-column align="center" label="用户姓名" prop="username"></el-table-column>
        <el-table-column align="center" label="用户昵称" prop="name"></el-table-column>
        <el-table-column align="center" label="用户角色" prop="roleName"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column align="center" label="操作" width="280">
          <template #default="{ row }">
            <el-button v-has="'btn.User.assgin'" type="primary" size="small" icon="User" @click="setRoles(row)">
              分配角色
            </el-button>
            <el-button type="primary" size="small" icon="Edit" @click="editUser(row)">编辑</el-button>
            <el-popconfirm :title="`确定删除${row.username}吗?`" @confirm="removeUser(row.id)">
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

      <!-- 抽屉 添加/修改 user -->
      <el-drawer v-model="drawer">
        <template #header>
          <h3>{{ userData.id ? '修改用户信息' : '添加用户' }}</h3>
        </template>
        <template #default>
          <el-form status-icon :model="userData" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
              <el-input v-model="userData.username"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input v-model="userData.name"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password" v-if="!userData.id">
              <el-input v-model="userData.password"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="drawer = false">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
          </div>
        </template>
      </el-drawer>

      <!-- 抽屉 分配角色 -->
      <el-drawer v-model="roleDrawer">
        <template #header>
          <h3>分配角色</h3>
        </template>
        <template #default>
          <el-form>
            <el-form-item label="用户姓名">
              <el-input v-model="userData.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="职位列表">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                全选
              </el-checkbox>
              <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
                <el-checkbox v-for="role in roles" :key="role.id" :label="role">{{ role.roleName }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="roleDrawer = false">取消</el-button>
            <el-button type="primary" @click="assignRoles">确定</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
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
