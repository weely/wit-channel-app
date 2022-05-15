import { config } from '../config/index'

const customerServiceInfo = {
    servicePhone: '18566766448',
    serviceTimeDuration: '每周三至周五 9:00-12:00  13:30-18:30',
}

/** 获取个人中心信息 */
function mockFetchUserCenter() {
  const { delay } = require('./_utils/utils')

  return delay(200).then(() => ({
    customerServiceInfo: {...customerServiceInfo}
  }))
}

/** 获取个人中心信息 */
export function fetchUserCenter() {
  if (config.useMock) {
    return mockFetchUserCenter()
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
