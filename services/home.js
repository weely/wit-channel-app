import { config } from '../config/index'
import http from '../utils/http'

function mockFetchHome() {
  const { delay } = require('./_utils/utils')
  const { genSwiperImageList } = require('../model/swiper')
  return delay().then(() => {
    return {
      swiper: genSwiperImageList()
    }
  })
}

/** 获取首页数据 */
export async function fetchHome() {
  if (config.useMock) {
    return mockFetchHome()
  }
  try {
    const res = await http({ url: `/wx/fetchHome`, method: 'get' })
    return Promise.resolve(res.data.data)
  } catch(err) {
    return Promise.reject(err)
  }
}
