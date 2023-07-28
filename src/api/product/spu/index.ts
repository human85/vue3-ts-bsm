import request from '@/utils/request'
import type {
  SpuRes,
  TrademarkRes,
  SpuImgRes,
  SpuSaleAttrRes,
  AllsaleAttrRes,
  SpuRecords,
  SkuData,
  SkuListRes
} from './type'

enum API {
  SPU_URL = '/admin/product',
  TRADEMARKLIST_URL = '/admin/product/baseTrademark/getTrademarkList',
  SPUIMGLIST_URL = '/admin/product/spuImageList',
  SPUSALEATTRLIST_URL = '/admin/product/spuSaleAttrList',
  SELECTABLEATTR_URL = '/admin/product/baseSaleAttrList',
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  GETSKULIST_URL = '/admin/product/findBySpuId',
  DELETESPU_URL = '/admin/product/deleteSpu'
}

// 服务器 2 号 baseURL
const baseURL = '/standby'

/**
 * @description 获取已有 spu 信息
 */
export function getSpuApi(page: number, limit: number, category3Id: number) {
  return request<any, SpuRes>({
    url: API.SPU_URL + `/${page}/${limit}`,
    params: {
      category3Id
    },
    baseURL
  })
}

/**
 * @description 获取已有品牌列表
 */
export function getTrademarkListApi() {
  return request<any, TrademarkRes>({
    url: API.TRADEMARKLIST_URL,
    baseURL
  })
}

/**
 * @description 获取 spu 图片列表
 */
export function getSpuImgListApi(spuId: number) {
  return request<any, SpuImgRes>({
    url: API.SPUIMGLIST_URL + `/${spuId}`,
    baseURL
  })
}

/**
 * @description 获取 spu 销售属性列表
 */
export function getSpuSaleAttrApi(spuId: number) {
  return request<any, SpuSaleAttrRes>({
    url: API.SPUSALEATTRLIST_URL + `/${spuId}`,
    baseURL
  })
}

/**
 * @description 获取 spu 可选销售属性列表
 */
export function getSlectableAttrApi() {
  return request<any, AllsaleAttrRes>({
    url: API.SELECTABLEATTR_URL,
    baseURL
  })
}

/**
 * @description 添加/修改 spu
 */
export function addOrUpdateSpu(data: SpuRecords) {
  if (data.id) {
    return request<any, SpuRes>({
      method: 'POST',
      url: API.UPDATESPU_URL,
      data,
      baseURL
    })
  } else {
    return request<any, SpuRes>({
      method: 'POST',
      url: API.ADDSPU_URL,
      data,
      baseURL
    })
  }
}

/**
 * @description 新增 SKU
 */
export function addSku(data: SkuData) {
  return request<any, SpuRes>({
    method: 'POST',
    url: API.ADDSKU_URL,
    data,
    baseURL
  })
}

/**
 * @description 获取 SKU 列表
 */
export function getSkuListApi(spuId: number) {
  return request<any, SkuListRes>({
    url: API.GETSKULIST_URL + `/${spuId}`,
    baseURL
  })
}

/**
 * @description 删除 SPU
 */
export function deleteSpuApi(spuId: number) {
  return request<any, any>({
    url: API.DELETESPU_URL + `/${spuId}`,
    method: 'DELETE',
    baseURL
  })
}
