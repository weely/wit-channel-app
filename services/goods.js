import {
  config
} from '../config/index'
import http from '../utils/http'

export function parseGoodItem(item) {
  return {
    id: item.id,
    thumb: item.primaryImage,
    title: item.title,
    price: item.minSalePrice,
    originPrice: item.maxSalePrice,
    resume: item.resume
  }
}

/** mock data */
/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const {
    delay
  } = require('./_utils/utils')
  const {
    getGoodsList
  } = require('../model/goods')
  return delay().then(() => getGoodsList(pageIndex, pageSize).map(parseGoodItem))
}

/** 获取商品详情 */
function mockFetchGood(GoodID = 0) {
  const {
    delay
  } = require('./_utils/utils')
  const {
    genGood
  } = require('../model/good')
  return delay().then(() =>
    genGood(GoodID)
  );
}
/** mock end */

/** api */

/** 获取商品列表 */
export async function fetchGoodsList(params) {
  if (config.useMock) {
    return mockFetchGoodsList(params)
  }
  try {
    const res = await http({  url: `/products`, method: 'get' })
    const goodLists = res.data.data.map(parseGoodItem)

    return Promise.resolve(goodLists)
  } catch(err) {
    return Promise.resolve([])
  }
}

/** 获取商品详情 */
export async function fetchGood(GoodID = 0) {
  if (config.useMock) {
    return mockFetchGood(GoodID)
  }
  try {
    const res = await http({  url: `/products/${GoodID}`, method: 'get' })
    return Promise.resolve(res.data.data)
  } catch(err) {
    return Promise.resolve({})
  }
}