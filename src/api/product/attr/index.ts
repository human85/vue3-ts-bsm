import request from '@/utils/request'
import type { Category1Res, Category2Res, Category3Res, AttrListRes, Attr } from './type'

// 统一管理接口地址
enum API {
  CATEGORY1_URL = 'admin/product/getCategory1',
  CATEGORY2_URL = 'admin/product/getCategory2',
  CATEGORY3_URL = 'admin/product/getCategory3',
  ATTRINFO_URL = '/admin/product/attrInfoList',
  UPDATEATTR_URL = '/admin/product/saveAttrInfo'
}

// 服务器 2 号 baseURL
const baseURL = '/standby'

/**
 * @description 获取一级分类
 */
export function getCatgory1Api() {
  return request<any, Category1Res>({
    url: API.CATEGORY1_URL,
    baseURL
  })
}

/**
 * @description 获取二级分类
 * @param {number} id
 */
export function getCatgory2Api(id: number) {
  return request<any, Category2Res>({
    url: API.CATEGORY2_URL + `/${id}`,
    baseURL
  })
}

/**
 * @description 获取三级分类
 * @param {number} id
 */
export function getCatgory3Api(id: number) {
  return request<any, Category3Res>({
    url: API.CATEGORY3_URL + `/${id}`,
    baseURL
  })
}

/**
 * @description 获取品牌基础属性
 * @param {number} cate1Id  一级分类对象id
 * @param {number} cate2Id  二级分类对象id
 * @param {number} cate3Id  三级分类对象id
 */
export function getAttrInfoApi(cate1Id: number, cate2Id: number, cate3Id: number) {
  return request<any, AttrListRes>({
    url: API.ATTRINFO_URL + `/${cate1Id}/${cate2Id}/${cate3Id}`,
    baseURL
  })
}

/**
 * @description 添加或修改品牌基础属性
 * @param {object} data 属性对象
 */
export function addorUpdateAttrApi(data: Attr) {
  return request<any, AttrListRes>({
    method: 'POST',
    url: API.UPDATEATTR_URL,
    data,
    baseURL
  })
}
