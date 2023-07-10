// 登录接口需要携带的参数类型
export interface LoginData {
  username: string
  password: string
}

// 所有接口返回数据都有的类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口返回的数据类型
export interface LoginResponse extends ResponseData {
  data: string | null
}

// 获取用户信息接口返回的数据类型
export interface UserInfoResponse extends ResponseData {
  data: UserInfo | null
}

// 用户信息数据类型
export interface UserInfo {
  routes: string[]
  buttons: string[]
  roles: string[]
  name: string
  avatar: string
}
