import Vue from 'vue'
import App from './App'
import api from './api'
import utils from './utils'
import store from './store'

// import mpvueCityPicker from './components/mpvue-citypicker/mpvueCityPicker.vue'
import mpvuePicker from './components/mpvue-picker/mpvuePicker.vue'
const webSocket = require('./utils/socket.js') 
Vue.prototype.$store = store
Vue.config.productionTip = false
/* #ifdef H5 */
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)
/* #endif */
import xyDialog from './components/xy-dialog/xy-dialog.vue'
import loadMore from './components/uni-load-more.vue';
import popupLayer from './components/popup-layer.vue'
Vue.component('xy-dialog',xyDialog)
Vue.component('mpvue-picker',mpvuePicker)
Vue.component('popup-layer',popupLayer)

Vue.component('loadMore',loadMore)

App.mpType = 'app'

if(uni.getStorageSync('token')) {
    webSocket.connectSocket({
        success: () => {
            console.log('连接成功')
        }
    })
}
// 返回上级页面
Vue.prototype.getback = function(){
    uni.navigateBack({
        delta: 1,
        // animationType: 'pop-in',
        // animationDuration: 200
    });
}
// 跳转页面
Vue.prototype.getnav = function(url){
    uni.navigateTo({
        url: url,
        // animationType: 'pop-out',
        // animationDuration: 200
    });
}
/**
 * 随时更新页面状态
 */
Vue.prototype.statusMath = function(that){
    setTimeout(()=>{
        that.valueStatus = Math.random()
    },100)
}
// uni.setStorageSync('token', '08ee3d23bbc45afdf1a9bb1a82488dc2ffc81f7b')

Vue.prototype.$showModal = utils.showModal
Vue.prototype.$http = api
Vue.prototype.$utils = utils
Vue.prototype.$Dialog = utils.Dialog
Vue.prototype.$loading = utils.showLoading
Vue.prototype.$hideLoading = utils.hideLoading
Vue.prototype.$toast = utils.showToast
Vue.prototype.$formatDateTime = utils.formatDateTime
Vue.prototype.$formatSeconds = utils.formatSeconds

// Vue.prototype.$imgUrl = 'https://nycs.maitexun.cn/'

const app = new Vue({
    store,
    ...App
    
})
app.$mount()
