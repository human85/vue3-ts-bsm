import request from '@/utils/request'
import type { AllPeimissionRes, PermissionData } from './type'

enum API {
  ALLPERMISSION_URL = '/admin/acl/permission',
  ADDPEIMISSION_URL = '/admin/acl/permission/save',
  EDITPERMISSION_URL = '/admin/acl/permission/update',
  DELETEPERMISSION_YRL = '/admin/acl/permission/remove/'
}

// 获取所有权限
export function getAllPeimissionApi() {
  return request.get<any, AllPeimissionRes>(API.ALLPERMISSION_URL)
}

// 新增或修改权限菜单
export function addOrEditPeimissionApi(data: PermissionData) {
  if (data.id) {
    return request.put<any, any>(API.EDITPERMISSION_URL, data)
  } else {
    return request.post<any, any>(API.ADDPEIMISSION_URL, data)
  }
}

// 删除
export function deletePermissionApi(id: number) {
  return request.delete<any, any>(API.DELETEPERMISSION_YRL + id)
}
