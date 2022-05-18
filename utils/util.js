/** 工具库 */

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

/**
 * 格式化输入价格
 * @param {*} price 
 * @param {*} priceUnit  yuan | fen
 */
export function formatPrice (price, priceUnit='fen', fill=false) {
  price = parseFloat(price)
  const pArr = []
  if (!isNaN(price)) {
    const isMinus = price < 0
    if (isMinus) {
      price = -price
    }

    if (priceUnit === 'yuan') {
      const priceSplit = price.toString().split('.')
      pArr[0] = priceSplit[0]
      pArr[1] = !priceSplit[1] ? '00' : priceSplit[1].length === 1 ? `${priceSplit[1]}0` : priceSplit[1]
    } else {
      price = Math.round(price * 10 ** 8) / 10 ** 8 // 恢复精度丢失
      price = Math.ceil(price) // 向上取整
      pArr[0] = price >= 100 ? `${price}`.slice(0, -2) : '0'
      pArr[1] = `${price + 100}`.slice(-2);
    }
    if (!fill) {
      // 如果 fill 为 false， 不显示小数末尾的0
      if (pArr[1] === '00') pArr[1] = '' 
      else if (pArr[1][1] === '0') pArr[1] = pArr[1][0]
    }
    if (isMinus) {
      pArr[0] = `-${pArr[0]}`
    }
  }
  return pArr
}

function  latLngToRadian(latLng) {
  return latLng * Math.PI / 180
}

export function getDistance(pointA, pointB) {
  const EARTH_RADIUS = 6378000

  const radLat1 = latLngToRadian(pointA.latitude)
  const radLng1 = latLngToRadian(pointA.longitude)
  const radLat2 = latLngToRadian(pointB.latitude)
  const radLng2 = latLngToRadian(pointA.longitude)
  const a = radLat1 - radLat2
  const b = radLng1 - radLng2

  return 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) + Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2))) * EARTH_RADIUS
}