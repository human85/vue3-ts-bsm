import request from '@/utils/request'
import type { AllRolesRes, Role, RolePermissionRes } from './type'

enum API {
  ALLROLES_URL = '/admin/acl/role',
  ADDROLE_URL = '/admin/acl/role/save',
  EDITROLE_URL = '/admin/acl/role/update',
  ROLEPERMISSION_URL = '/admin/acl/permission/toAssign/',
  ASSIGNPRIMISSION_URL = '/admin/acl/permission/doAssign',
  REMOVEROLE_URL = '/admin/acl/role/remove/'
}

export function getAllRolesApi(page: number, limit: number, roleName: string) {
  return request<any, AllRolesRes>({
    url: API.ALLROLES_URL + `/${page}/${limit}`,
    params: {
      roleName
    }
  })
}

export function addOrEditRoleApi(data: Role) {
  if (data.id) {
    return request.put<any, any>(API.EDITROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

export function getRolePermissonApi(roleId: number) {
  return request.get<any, RolePermissionRes>(API.ROLEPERMISSION_URL + roleId)
}

// 分配权限
export function assignPeimissionApi(roleId: number, permissionId: number[]) {
  return request<any, any>({
    method: 'POST',
    url: API.ASSIGNPRIMISSION_URL,
    params: {
      roleId,
      permissionId: permissionId.join(',')
    }
  })
}

// 删除角色
export function removeRoleApi(roleId: number) {
  return request.delete<any, any>(API.REMOVEROLE_URL + roleId)
}
