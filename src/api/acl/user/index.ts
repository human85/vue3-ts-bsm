import request from '@/utils/request'
import type { AssignRolesData, RoleListRes, User, UserListRes } from './type'

enum API {
  ALLUSER_URL = '/admin/acl/user', // 获取全部用户信息
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ROLELIST_URL = '/admin/acl/user/toAssign/', // 获取角色列表
  ASSIGNROLES_URL = '/admin/acl/user/doAssignRole', // 分配职位
  REMOVEUSER_URL = '/admin/acl/user/remove/', // 删除用户
  BATCHREMOVEUSERS_URL = '/admin/acl/user/batchRemove' // 批量删除用户
}

/**
 * @description 获取用户分页列表
 */
export function getUserListApi(page: number, limit: number, username: string) {
  return request<any, UserListRes>({
    url: API.ALLUSER_URL + `/${page}/${limit}`,
    params: {
      username
    }
  })
}

/**
 * @description 添加或更新 user
 */
export function addOrUpdateUserApi(data: User) {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

/**
 * @description 获取角色列表
 * @param id 用户 id
 */
export function getRoleListApi(id: number) {
  return request.get<any, RoleListRes>(API.ROLELIST_URL + id)
}

/**
 * @description 分配角色
 */
export function assignRolesApi(data: AssignRolesData) {
  return request.post<any, any>(API.ASSIGNROLES_URL, data)
}

/**
 * @description 删除用户
 * @param id 用户 id
 */
export function removeUserApi(id: number) {
  return request.delete<any, any>(API.REMOVEUSER_URL + id)
}

/**
 * @description 批量删除用户
 * @param idList 用户 id 数组
 */
export function batchRemoveUsersApi(idList: number[]) {
  return request.delete<any, any>(API.BATCHREMOVEUSERS_URL, { data: idList })
}
