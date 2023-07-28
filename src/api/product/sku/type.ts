interface ResponseData {
  code: number
  message: string
  ok: boolean
}

interface SkuAttrValue {
  attrName: string
  id: number
  skuId: number
  valueName: string
  attrId: number
  valueId: number
}

interface SkuSaleAttrValue {
  saleAttrId: number
  saleAttrValueId: number
  id: number
  saleAttrName: string
  saleAttrValueName: string
  skuId: number
  spuId: number
}

interface SkuImage {
  createTime: string
  id: number
  imgName: string
  imgUrl: string
  isDefault: string
  skuId: number
  spuImgId: number
  updateTime: string
}

export interface SkuData {
  id: number
  category3Id: number
  spuId: number
  tmId: number
  skuName: string
  price: number | string
  weight: number | string
  skuDesc: string
  skuDefaultImg: string
  skuAttrValueList: SkuAttrValue[] // 平台属性
  skuSaleAttrValueList: SkuSaleAttrValue[] // 销售属性
  isSale: number // 0:下架  1:上架
  skuImageList: SkuImage[]
}

export interface HasOwnSkuRes extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

// 商品详情接口返回数据
export interface SkuInfoRes extends ResponseData {
  data: SkuData
}
