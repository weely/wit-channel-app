import { config } from '../config/index'
import http from '../utils/http'

function mockFetchHome() {
  const { delay } = require('./_utils/utils')
  const { genSwiperImageList } = require('../model/swiper')
  return delay().then(() => {
    return {
      data: {
        data: {
          swiper: genSwiperImageList()
        }
      }
    }
  })
}

/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    return mockFetchHome()
  }
  return http({
    url: `/wx/fetchHome`,
    method: 'get',
  })
}
