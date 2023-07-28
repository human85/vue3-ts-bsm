interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// Spu
export interface SpuRecords {
  id?: number
  createTime?: string
  updateTime?: string
  spuName: string
  description: string
  category3Id: number
  tmId: number | string
  spuSaleAttrList: null | SpuSaleAttr[]
  spuImageList: null | SpuImg[]
  spuPosterList?: null
}

export interface SpuData {
  records: SpuRecords[]
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

export interface SpuRes extends ResponseData {
  data: SpuData
}

// 已有品牌列表
export interface Trademark {
  id: number
  createTime: string
  updateTime: string
  tmName: string
  logoUrl: string
}

export interface TrademarkRes extends ResponseData {
  data: Trademark[]
}

// spu 图片列表
export interface SpuImg {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName: string
  imgUrl: string
}

export interface SpuImgRes extends ResponseData {
  data: SpuImg[]
}

// spu 销售属性
export interface SpuSaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  saleAttrName?: string
  isChecked?: null
  baseSaleAttrId: number
  saleAttrValueName: string
}

export interface SpuSaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValue[]
  inputVisible?: boolean // 自定义 控制属性值输入的 input 框可见性
  saleAttrIdAndValId?: string // 自定义添加 sku 页面用于收集销售属性 id
}

export interface SpuSaleAttrRes extends ResponseData {
  data: SpuSaleAttr[]
}

// spu 可选属性
export interface AllSaleAttr {
  id: number
  createTime: string
  updateTime: string
  name: string
}

export interface AllsaleAttrRes extends ResponseData {
  data: AllSaleAttr[]
}

// sku
export interface SkuAttrValue {
  attrId: number
  valueId: number
}

export interface SkuSaleAttrValue {
  saleAttrId: number
  saleAttrValueId: number
}

export interface SkuData {
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
}

// 获取 sku 列表接口返回的数据类型
export interface SkuListRes extends ResponseData {
  data: SkuData[]
}
