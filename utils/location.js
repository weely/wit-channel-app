export async function checkLocationAuth() {
  try {
    const res = await wx.getSetting()
    if (res.authSetting['scope.userLocation']) {
      return Promise.resolve(true)
    } else {
      await wx.authorize({scope: 'scope.userLocation'})
      return Promise.resolve(true)
    }
  } catch (err) {
    console.log('地理位置未授权，错误信息', err)
    return Promise.resolve(false)
  }
}

function latLngToRadian(latLng) {
  return latLng * Math.PI / 180
}

export function getDistance(lat1, lng1, lat2, lng2) {
  const EARTH_RADIUS = 6378137

  const radLat1 = latLngToRadian(lat1)
  const radLng1 = latLngToRadian(lng1)
  const radLat2 = latLngToRadian(lat2)
  const radLng2 = latLngToRadian(lng2)
  const a = radLat1 - radLat2
  const b = radLng1 - radLng2

  const distance = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) + Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2))) * EARTH_RADIUS

  return parseFloat((Math.round(distance * 10000) / 10000).toFixed(0))
}

export async function geocoder(qqmapsdk, address, region='') {
  return new Promise((resolve, reject) => {
    console.log('-----', qqmapsdk)
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号',
      region: region,
      success: resolve,
      fail: reject
    })
  })
}
