import request from '@/utils/request'
import type { LoginData, LoginResponse, UserInfoResponse } from './type'

// 统一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

// 登录
export function loginApi(data: LoginData) {
  // 第一个泛型参数对应拦截器处理前的响应数据
  // 第二个泛型参数对应拦截器处理后的响应数据
  return request.post<any, LoginResponse>(API.LOGIN_URL, data)
  // return request<any, LoginResponse>({
  //   method: 'POST',
  //   url: API.LOGIN_URL,
  //   data
  // })
}

// 获取用户信息
export function getUserInfoApi() {
  return request.get<any, UserInfoResponse>(API.USERINFO_URL)
}

// 退出登录
export function logoutApi() {
  return request.post(API.USERINFO_URL)
}
