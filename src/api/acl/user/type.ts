// 所有接口返回数据都有的类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username: string // 用户姓名
  password: string
  name: string // 用户昵称
  phone?: null
  roleName?: string
}

// 用户分页列表
export interface UserListRes extends ResponseData {
  data: {
    records: User[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

// 角色列表
export interface Role {
  id: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

export interface RoleListRes extends ResponseData {
  data: {
    assignRoles: Role[]
    allRolesList: Role[]
  }
}

// 分配职位参数
export interface AssignRolesData {
  roleIdList: number[]
  userId: number
}
