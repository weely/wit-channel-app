import http from '../utils/http'

/** 下单 */
export async function placeOrderApi(params={}) {
  try {
    const res = await http({ url: `/orders`, method: 'post',  data: params})
    return Promise.resolve(res.data.data)
  } catch(err) {
    return Promise.reject(err)
  }
}

/** 获取订单详情 */
export async function getOrderApi(orderId) {
  try {
    const res = await http({ url: `/orders/${orderId}`, method: 'get'})
    return Promise.resolve(res.data.data)
  } catch(err) {
    return Promise.reject(err)
  }
}