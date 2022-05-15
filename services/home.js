import { config, cdnBase } from '../config/index'

function mockFetchHome() {
  const { delay } = require('./_utils/utils')
  const { genSwiperImageList } = require('../model/swiper')
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      activityImg: `${cdnBase}/activity/banner.png`,
    }
  })
}

/** 获取首页数据 */
export function fetchHome() {
  // return mockFetchHome()
  if (config.useMock) {
    return mockFetchHome()
  }
  return new Promise((resolve) => {
    resolve('real api')
  })
}
