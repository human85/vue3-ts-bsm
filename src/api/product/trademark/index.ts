import request from '@/utils/request'
import type { TrademarkRes, Trademark } from './type'

// 统一管理接口地址
enum API {
  // 获取已有品牌的 URL
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 新增品牌
  ADDRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌
  REMOVETRADEMARK_URL = '/admin/product/baseTrademark/remove'
}

// 服务器 2 号 baseURL
const baseURL = '/standby'

/**
 * @description 获取品牌数据
 * @param page 获取页码
 * @param limit 每页的数据
 */
export function getTrademarkApi(page: number, limit: number) {
  return request<any, TrademarkRes>({
    url: API.TRADEMARK_URL + `${page}/${limit}`,
    baseURL
  })
}

/**
 * @description 修改品牌数据
 */
export function addOrUpdateTrademarkApi(data: Trademark) {
  if (!data.id) {
    return request<any, TrademarkRes>({
      url: API.ADDRADEMARK_URL,
      method: 'POST',
      baseURL,
      data
    })
  } else {
    return request<any, TrademarkRes>({
      url: API.UPDATETRADEMARK_URL,
      method: 'PUT',
      baseURL,
      data
    })
  }
}

/**
 * @description 删除品牌
 */
export function removeTrademarkApi(id: number) {
  return request<any, TrademarkRes>({
    url: API.REMOVETRADEMARK_URL + `/${id}`,
    method: 'DELETE',
    baseURL
  })
}
