<script>
	
	import autoUpdater from './utils/autoUpdater.min.js';
	export default {
		onShow: function () {
			
			
		},
		onHide: function () {
			console.log('App Hide')
		},
		
		onLaunch () {
			// const url = /member_recode.*?\//.exec(location.href) ? /member_recode.*?\//.exec(url)[0] : ''

			// uni.setStorageSync('memberParams',0 url.split('=')[0].replace('#'))
			/* #ifdef APP-PLUS */
			var server = `https://nycs.maitexun.cn/apicloud/version/versions`
			const res = uni.getSystemInfoSync()
			const apptype = res.platform
			// console.log(plus.os.version)
			// if (apptype === 'android' || apptype === 'Android') {
			// 	if (plus.os.version.indexOf('9') === 0) {
			// 		console.log(111)
			// 		return false
			// 	}
			// }
			var req = {
				appid: plus.runtime.appid,
				version: plus.runtime.version,
				client: apptype
			}
			uni.request({
				url: server,
				data: req,
				method: 'POST',
				success: (res) => {
					if (res.data.status === 1) {
						autoUpdater.init({
							packageUrl: res.data.data.urls,
							content: res.data.data.content,
							contentAlign: 'left',
							cancel: '取消升级',
							cancelColor: '#007fff'
						})
						autoUpdater.show()
					}
				},
				fail: err => {
					console.log(222)
				}
			})
			/* #endif */
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	@import 'static/css/index.less';
	@import 'static/css/icon-font.less';
	@import "./graceUI/graceUI.css";
	@import 'static/css/animation.css';
	@import 'static/css/icon.css';
	@import 'static/css/main.css';
	// @import "video.js/dist/video-js.css";
	// @import "vue-video-player/src/custom-theme.css";
	/* #ifdef H5 */
	// @import "video.js/dist/video-js.css";
	// @import "vue-video-player/src/custom-theme.css";
	/* #endif */
		
	.null{
		width: 100%;
		background-color: #f3f3f3;
	}
	.garce-items .img{
		width: 100%;
		height: 100%!important;
	}
	.grace-add-file .garce-items .grace-close {
		top: 5px;
	}
		
	.grace-add-file{
		width: 100%;
	}
	
		
   
</style>
