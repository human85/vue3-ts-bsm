// 所有接口返回数据都有的类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 角色
export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

export interface AllRolesRes extends ResponseData {
  data: {
    records: Role[]
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

// 权限
export interface Permission {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: Permission[]
  select: boolean
}

export interface RolePermissionRes extends ResponseData {
  data: Permission[]
}
