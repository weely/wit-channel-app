// import { config } from '../config/index'
import http from '../utils/http'

const customerServiceInfo = {
    servicePhone: '18566766448',
    serviceTimeDuration: '每周一至周日 9:00-24:00',
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
  return mockFetchUserCenter()
}

export function wxRegisterApi(params) {
  const { code, mobile, username } = params
  let data = {}
  if (mobile) data.mobile = mobile
  if (username) data.username = username

  return http({
    url: `/auth/wxLogin?code=${code}`,
    method: 'post',
    data
  })
}

export function updateUser(params) {
  const { id, mobile, username } = params
  const data = {}
  if (mobile) data.mobile = mobile
  if (username) data.username = username

  return http({
    url: `/users/${id}`,
    method: 'put',
    data
  })
}
