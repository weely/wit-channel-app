import { config } from '../config/index'

/** mock data */
/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('./_utils/utils')
  const { getGoodsList } = require('../model/goods')
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize).map((item) => {
      return {
        goodId: item.goodId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        resume: item.resume
      }
    })
  )
}

/** 获取商品详情 */
function mockFetchGood(GoodID = 0) {
  const { delay } = require('./_utils/utils')
  const { genGood } = require('../model/good')
  return delay().then(() => genGood(GoodID));
}
/** mock end */

/** api */

/** 获取商品列表 */
export function fetchGoodsList(params) {
  if (config.useMock) {
    return mockFetchGoodsList(params)
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}


/** 获取商品详情 */
export function fetchGood(ID = 0) {
  if (config.useMock) {
    return mockFetchGood(ID);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}