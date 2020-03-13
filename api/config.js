const Fly = require('flyio/dist/npm/wx')
const fly = new Fly
import utils from '../utils/index'
fly.config.timeout = 20000
fly.config.baseURL = 'https://nycs.maitexun.cn/'

fly.interceptors.request.use(request => {
  request.body.token = uni.getStorageSync('token')
  return request
})

fly.interceptors.response.use(
  (response) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if (response.data.status == 200) {
      // logout
      return response.data
    } 

    if (response.data.status == 300) {
      // utils.showToast(`status:${response.data.status} -- ${response.data.mess}`)
      return response.data
    }
    if (response.data.status != 200) {
      utils.showToast(`${response.data.mess}`)
      return response.data
    }
  },
  (err) => {
    uni.hideLoading()
    uni.stopPullDownRefresh()
    if(err.status == 0) {
      utils.showToast(`网络错误`)
      return err
    }
    console.log(JSON.stringify(err))
    if(err.status == 500) {
      utils.showToast(`服务器错误`)
      return err
    }
    
  }
)

export default fly
