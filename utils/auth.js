
// import { getDistance } from './util'

// export function refreshLocation() {
//   wx.getLocation({
//     type: 'gcj02', //返回可以用于 wx.openLocation 的经纬度
//     success (res) {
//       const latitude = res.latitude
//       const longitude = res.longitude
//       const positions = wx.getStorageSync('positions') || { latitude: 0, longitude: 0 }

//       console.log('longitude' ,getDistance(positions, { latitude, longitude }),  latitude, longitude)
//       console.log('longitude' ,getDistance(positions, { latitude, longitude }),  latitude, longitude)
//       if (getDistance(positions, { latitude, longitude }) > 5000) {
//         wx.setStorageSync('logs', { latitude, longitude })
//       }
//       wx.openLocation({
//         latitude,
//         longitude,
//         scale: 18
//       })
//     }, fail(err) {
//       console.log('err', err)
//     }
//   })
// }