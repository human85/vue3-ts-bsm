import request from '@/utils/request'
import type { HasOwnSkuRes, SkuInfoRes } from './type'

enum API {
  HASOWNSKU_URL = '/admin/product/list',
  CANCELSALE_URL = '/admin/product/cancelSale', // 商品下架
  ONSALE_URL = '/admin/product/onSale', // 商品上架
  SKUINFO_URL = '/admin/product/getSkuInfo',
  DELETESKU_URL = '/admin/product/deleteSku'
}

// 服务器 2 号 baseURL
const baseURL = '/standby'

/**
 * @description 获取已有 sku 列表
 */
export function getHasOwnSkuApi(page: number, limit: number) {
  return request<any, HasOwnSkuRes>({
    url: API.HASOWNSKU_URL + `/${page}/${limit}`,
    baseURL
  })
}

/**
 * @description sku 下架
 */
export function cancelSaleApi(skuId: number) {
  return request<any, any>({
    url: API.CANCELSALE_URL + `/${skuId}`,
    baseURL
  })
}

/**
 * @description sku 上架
 */
export function onSaleApi(skuId: number) {
  return request<any, any>({
    url: API.ONSALE_URL + `/${skuId}`,
    baseURL
  })
}

/**
 * @description 获取 sku 详情信息
 */
export function getSkuInfoApi(skuId: number) {
  return request<any, SkuInfoRes>({
    url: API.SKUINFO_URL + `/${skuId}`,
    baseURL
  })
}

/**
 * @description 删除 sku
 */
export function deleteSkuApi(skuId: number) {
  return request<any, any>({
    url: API.DELETESKU_URL + `/${skuId}`,
    method: 'DELETE',
    baseURL
  })
}
