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