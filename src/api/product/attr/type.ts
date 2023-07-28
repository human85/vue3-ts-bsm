// 所有接口返回数据都有的类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 一级分类
export interface Category1 {
  id: number
  createTime: string
  updateTime: string
  name: string
}

export interface Category1Res extends ResponseData {
  data: Category1[]
}

// 二级分类
export interface Category2 {
  category1Id: number
  createTime: string
  id: number
  name: string
  updateTime: string
}

export interface Category2Res extends ResponseData {
  data: Category2[]
}

// 三级分类
export interface Category3 {
  category2Id: number
  createTime: string
  id: number
  name: string
  updateTime: string
}

export interface Category3Res extends ResponseData {
  data: Category3[]
}

// 商品基础属性
// 属性值
export interface AttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  valueName: string
  attrId?: number
  flag?: boolean // 自定义用于属性值编辑模式切换的开关
}
// 属性
export interface Attr {
  id?: number
  createTime?: null
  updateTime?: null
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: AttrValue[]
  attrIdAndValId?: string // 自定义添加 sku 页面用于收集平台属性 id
}

export interface AttrListRes extends ResponseData {
  data: Attr[]
}
