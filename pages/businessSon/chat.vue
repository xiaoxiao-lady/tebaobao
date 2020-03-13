<template>
	<view class="uni-column chat">
		<div v-if="pageShow">
			<view class="content" id="content" @click="hideKeyboard">
				<scroll-view id="scrollview" :scroll-y="true" :scroll-with-animation="true" :scroll-top="scrollTop">
					<message-show
						v-for="(item, index) in msgList"
						:key="index"
						class="msg-list"
						:num="index"
						:avatar="avatar"
						:id="'item' + index"
						:message="item"></message-show>
						<view id="bottom" v-if="msgList.length"></view>
				</scroll-view>
			</view>
			<Emoji @updata-val="updataVal" @on-upload="onUpload" :input-value='inputValue' :isShow="showEoji" @send-message="getInputMessage" v-if="showEoji" @show-emoji="onShowEmoji"></Emoji>
			<view class="chat-footer">
				<chat-input
					:focus="focus"
					:input-value="inputValue"
					:isShow="showEoji"
					@send-message="getInputMessage"
					@updata-val="updataVal"
					@on-upload="onUpload"
					@show-emoji="onShowEmoji"></chat-input>
			</view>
		</div>
	</view>
</template>

<script>
	import chatInput from '../../components/im-chat/chatinput.vue'
	import messageShow from '../../components/im-chat/messageshow.vue'
	import Emoji from '../../components/im-chat/Emoji.vue'
	import utils from '../../utils'
	const webSocket = require('../../utils/socket.js') 

	export default {
		data () {
			return {
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 110,
					mitemHeight: 0,
				},
				isAnimation: false,
				scrollTop: 0,
				showEoji: false,
				focus: false,
				inputValue: '',
				pageShow: false,
				msgList: [],
				avatar: '',
				toId: '',
				toUserId: ''
			}
    },

		components: {
			chatInput,
			messageShow,
			Emoji
		},

		onLoad () {
			this.$loading()
			const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.avatar = userInfo.headimgurl
			this.toUserId = this.$mp.query.toId
			const res = uni.getSystemInfoSync();
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
			webSocket.sendSocketMessage({
				data: JSON.stringify({
					type: 'readmsg',
					data: {
						fromid: uni.getStorageSync('token'),
						toid: this.$mp.query.toId,
					}
				})
			})
			
			webSocket.sendSocketMessage({
				data: JSON.stringify({
					type: 'history',
					data: {
						fromid: uni.getStorageSync('token'),
						toid: this.$mp.query.toId,
					}
				})
			})

			webSocket.onSocketMessageCallback = (res => {
				const data = JSON.parse(res.data)
				if (data.type === 'say') {
					let receiveMsg = data
					receiveMsg.data.to_headimgurl = receiveMsg.data.toid === uni.getStorageSync('token') ? receiveMsg.data.from_headimgurl : receiveMsg.data.to_headimgurl
					receiveMsg.data.message = this.$utils.generateRichTextNode(receiveMsg.data.message, receiveMsg.data.message_type)
					this.msgList.push(receiveMsg.data)
					this.$nextTick(() => {
						setTimeout(() => {
							this.scrollToBottom()
						}, 50)
					})
				}

				if (data.type === 'history') {
					let receiveMsg = data.data
					this.msgList = receiveMsg.map(item => {
						item.to_headimgurl = item.toid === uni.getStorageSync('token') ? item.from_headimgurl : item.to_headimgurl
						item.message = this.$utils.generateRichTextNode(item.message, item.message_type)

						return item
					})

					this.$nextTick().then(() => {
						setTimeout(() => {
							this.scrollToBottom()
						}, 50)
					})
				}
			})

			
			this.$hideLoading()
			this.pageShow = true
		},

		onUnload () {
			webSocket.sendSocketMessage({
				data: JSON.stringify({
					type: 'readmsg',
					data: {
						fromid: uni.getStorageSync('token'),
						toid: this.$mp.query.toId,
					}
				})
			})
		},

		onBackPress () {
			webSocket.sendSocketMessage({
				data: JSON.stringify({
					type: 'readmsg',
					data: {
						fromid: uni.getStorageSync('token'),
						toid: this.$mp.query.toId,
					}
				})
			})
		},
	
		methods: {
			sendMsg (data) {
				webSocket.sendSocketMessage({
					data: JSON.stringify({
						...data
					})
				})

				let receiveMsg = data
				receiveMsg.data.message = this.$utils.generateRichTextNode(receiveMsg.data.message, receiveMsg.data.message_type)
				this.msgList.push(receiveMsg.data)
				setTimeout(() => {
					this.scrollToBottom()
				}, 50)
			},

			onShowEmoji (val, emojiStr) {
				if (val) {
					this.showEoji = false
					this.focus = true
				} else {
					uni.hideKeyboard()
					setTimeout(() => {
						this.showEoji = true
						this.focus = false
					}, 300)
				}
			},

			hideKeyboard () {
				this.showEoji = false
				uni.hideKeyboard()
			},

			updataVal (val) {
				this.inputValue = val
			},

			onUpload () {
				this.showEoji = false
        this.$utils.chooseImg().then(response => {
          this.$loading('上传中')
          uni.uploadFile({
          	url: 'https://nycs.maitexun.cn/apicloud/find/uploadspic',
            filePath: response.tempFilePaths[0],
            name: 'file',
            success: res => {
							const data = JSON.parse(res.data)
							if (data.code === 200) {
								uni.getImageInfo({
									src: response.tempFilePaths[0],
									success: image => {
										let width = 0, height = 0
										if (image.width > 400) {
											width = uni.upx2px(400)
											height = uni.upx2px(image.height * (400 / image.width))
										} else {
											width = uni.upx2px(image.width)
											height = uni.upx2px(image.height)
										}
										
										let sendData = {
											type: 'say',
											data: {
												userType: 'customer',
												fromid: uni.getStorageSync('token'),
												toid: this.toUserId,
												message: data.data.src.wz,
												message_type: 'img',
												width: width,
												height: height
											}
										}

										this.$hideLoading()

										this.sendMsg(sendData)
									}
								})
							} else {
								this.$toast(data.msg)
							}
						},
						
						fail: err => {
							this.$hideLoading()
						}
          })
        })
			},

			getInputMessage (message) {
				let sendData = {
					type: 'say',
					data: {
						userType: 'customer',
						fromid: uni.getStorageSync('token'),
						toid: this.toUserId,
						message: message.content,
						message_type: 'text'
					}
				}

				this.sendMsg(sendData)
				this.showEoji = false
				this.inputValue = ''
			},

			scrollToBottom () {				
				var that = this;
				var query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();

				// query.select('#bottom').boundingClientRect(res => {
				// 	console.log(res.height)
				// }).exec()
				query.exec(function (res) {
					that.style.mitemHeight = 0;
					res[0].forEach(function (rect) {
						console.info(rect.height, 2222);
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					});
					console.log(that.style.mitemHeight, that.style.contentViewHeight)
					that.scrollTop  = that.scrollTop + 10000
					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.tip {
		position: fixed;
		top: 118upx;
		left: 30upx;
		z-index: 100;
		width: 690upx;
		height: 217upx;
		padding: 22upx 30upx 0 30upx;
		background: #fff;
		color: #999;
		font-size: 26upx;

		.tip-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10upx;

			i {
				color: #999;
				padding-left: 20upx;
			}

			h2 {
				font-size: 34upx;
				color: #333;
			}
		}

		span {
			color: #F23333;
			font-size: 26upx;
			line-height: 1.4;
		}
	}

	.notice {
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		width: 100%;
		height: 88upx;
		padding: 0 30upx;
		font-size: 24upx;
		background: #fff;
		color: #999;
		z-index: 100;

		image {
			width: 30upx;
			height: 30upx;
			padding-right: 6upx;
		}
	}

	.gift-btn {
		bottom: 200upx;
	}

	.chat {
		height: 100%;
		overflow: hidden;
		// min-height: 100%;
		background: #F4F4F4;

		& > div {
			min-height: 100%;
			height: 100%;
		}
    
		.active {
			padding-top: 0!important;
		}

    .content {
			height: calc(100% - 110upx)!important;
			background: #F4F4F4;

			scroll-view {
				height: 100%;
			}
    }

    .chat-footer {
      position: fixed;
      width: 100%;
      height: 110upx;
      left: 0upx;
      bottom: 0upx;
		}
		
		#bottom {
			padding-bottom: 20upx;
		}
	}
</style>
