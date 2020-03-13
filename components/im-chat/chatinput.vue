<template>
	<div class="footer">
		<div class="footer-left">
			<i class="iconfont" @click="uploadImg">&#xe66d;</i>
			<i class="iconfont" @click="onTap">&#xe64d;</i>
		</div>
		<div class="footer-center">
			<input :focus="focus" class="input-text" placeholder="请输入您要咨询的问题" type="text" confirm-type="send" v-model="val" />
		</div>
		<div class="footer-right" @tap="sendMessge">发送</div>
	</div>
</template>

<script>
	export default {
		name: 'chat-input',
		data () {
			return {
				val: ''
			}
		},

		props: ['focus', 'inputValue', 'isShow'],

		methods: {
			sendMessge () {
				if (this.val.trim() == '') {
					this.val = ''
				} else {
					this.$emit('send-message', {
						type: 'text',
						content: this.val
					})

					this.val = ''
					uni.hideKeyboard()
				}
			},

			// 切换表情页面
			onTap () {
				this.$emit('show-emoji')
				this.$emit('updata-val', this.val)
			},

			uploadImg () {
				this.$emit('on-upload')
			}
		},

		watch: {
			isShow (val) {
				this.val = this.inputValue
			}
		},
	}
</script>

<style lang="less" scoped>
	.footer {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 0 30upx;
		box-shadow: 0px 0px 2upx rgba(0,0,0,0.16);
		overflow: hidden;
		box-sizing: border-box;
		background: #fff;
	}

	.footer-left {
		display: flex;
		justify-content: center;
		align-items: center;

		.face {
			width: 64upx;
			height: 64upx;
		}

		.album {
			width: 68upx;
			height: 55upx;
		}

		i {
			font-size: 60upx;
			color: #333;
			padding-right: 30upx;

			&:last-child {
				position: relative;
				top: 3upx;
				padding-right: 0;
			}
		}
	}
	.footer-right {
		font-size: 34upx;
		color: #333;
	}

	.footer-center {
		// width: 444upx;
		flex: 1;
		height: 72upx;
		margin: 0 16upx;
	}

	.footer-center .input-text {
		height: 72upx;
		background: #E9E9E9;
		border: solid 1upx #D2D2D2;
		overflow: hidden;
		padding: 0 36upx;
		border-radius: 36upx;
		font-size: 28upx;
	}
</style>
