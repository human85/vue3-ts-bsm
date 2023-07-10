// 所有接口返回数据都有的类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Trademark {
  id?: number
  createTime?: string
  updateTime?: string
  tmName: string
  logoUrl: string
}

export interface TrademarkRes extends ResponseData {
  data: {
    records: Trademark[]
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  } | null
}
