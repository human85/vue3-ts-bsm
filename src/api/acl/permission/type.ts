// 所有接口返回数据都有的类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Permission {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: null
  type: number
  status: null
  level: number
  children?: Permission[]
  select: boolean
}

export interface AllPeimissionRes extends ResponseData {
  data: Permission[]
}

// 添加或修改权限菜单携带的参数类型
export interface PermissionData {
  id?: number
  code: string // 权限值
  level: number
  name: string
  pid: number // 父级 id
}
