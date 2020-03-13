<template>

	<view class="dialog" :class="{ 'dialog-visibility':isVisibility }">
		<view class="dialog-model" v-if="overlay"></view>
		<view class="dialog-wrap">
			<view class="dialog-title" v-if="title!='false' ">{{ title }}</view>
			<view class="dialog-content">
				<view class="dialog-content_message" :style="{'text-align': messageAlign}">
					<rich-text :nodes="message" bindtap="tap"></rich-text>
				</view>		
			</view>
			<view class="dialog-hairline--top dialog-footer">
				<text class="footer-btn footer-cancel" 
					v-if="showCancelButton"
					@click="handleClose"
				>{{ cancelButtonText }}</text>
				<text class="footer-btn footer-success" 
					:class="{'dialog-hairline--left': showCancelButton}" 
					v-if="showConfirmButton"
					@click="handleConfirm"
				>{{ confirmButtonText }}</text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		
		props: {
			title: {
				type: String,
				default: '提示'
			},
			message: {
				type: String,
				default: '123'
			},
			// 内容对齐方式 center | left | right
			messageAlign: {
				type: String,
				default: 'center'
			},
			// 是否显示确认按钮
			showConfirmButton: {
				type: Boolean,
				default: true
			},
			// 是否显示取消按钮
			showCancelButton: {
				type: Boolean,
				default: false
			},
			// 确定按钮的文案
			confirmButtonText: {
				type: String,
				default: '确定'
			},
			// 取消按钮的文案
			cancelButtonText: {
				type: String,
				default: '取消'
			},
			// 是否显示蒙层
			overlay: {
				type: Boolean,
				default: true
			},
			// 点击蒙层是否关闭弹窗
			closeOnClickOverlay: {
				type: Boolean,
				default: false
			}
		},
		
		data() {
			return {
				isVisibility: false,
				animationData:{}
			};
		},
		
		methods: {
			__show () {
				this.isVisibility = true
			},
			__close () {
				this.isVisibility = false
			},
			alert (option) {				
				this.__show()
				this.showCancelButton = false
				
				if(Object.keys(option).length !=0 ) {
					this.title = option.title
					this.message = option.message
					this.overlay = option.overlay
					this.closeOnClickOverlay = option.closeOnClickOverlay
				}
			},
			confirm (option) {

				this.showCancelButton = true
				this.__show()
				console.log(option)
				if(Object.keys(option).length !=0 ) {
					this.title = option.title
					this.message = option.message
					this.overlay = option.overlay
					this.closeOnClickOverlay = option.closeOnClickOverlay
				}
			},
			handleClose () {
				this.__close()
				this.$emit('cancelButton')
			},
			handleConfirm () {
				this.__close()
				this.$emit('confirmButton')
			}
		}
		
	}
</script>

<style lang="less" scoped>
	// [class*='dialog-hairline']::after {
	// 	content: ' ';
	// 	position: absolute;
	// 	pointer-events: none;
	// 	box-sizing: border-box;
	// 	top: -50%;
	// 	left: -50%;
	// 	right: -50%;
	// 	bottom: -50%;
	// 	-webkit-transform: scale(0.5);
	// 	transform: scale(0.5);
	// 	border: 0 solid #ebedf0;
	// }
	.dialog {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		opacity: 0;
		visibility: hidden;
		-webkit-transition: all 0.3s ease;
		&.dialog-visibility {
			visibility: visible;
			opacity: 1;
		}
		.dialog-model {
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9999999;
		}
		.dialog-wrap {
			width: 85%;
			position: absolute;
			left: 50%;
			top: 50%;
			overflow: hidden;
			background: #ffffff;
			border-radius: 8rpx;
			-webkit-transform: translate3d(-50%, -50%, 0);
			transform: translate3d(-50%, -50%, 0); 
			-webkit-backface-visibility: hidden;
			backface-visibility: hidden;
			z-index: 9999999;
			.dialog-title {
				font-weight: 500;
				padding-top: 50rpx;
				text-align: center;
				color: #303133;
			}
			.dialog-content {
				.dialog-content_message {
					padding: 30rpx;
					font-size: 30rpx;
					line-height: 1.5;
					overflow-y: auto;
					-webkit-overflow-scrolling: touch;
					color: #606266;
				}
			}
			.dialog-hairline--top::after {
				border-top-width: 1px;
			}
			.dialog-footer {
				overflow: hidden;
				position: relative;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				.footer-btn {
					height: 100rpx;
					font-size: 32rpx;
					text-align: center;
					line-height: 100rpx;
				}
				.footer-success {
					width: 100%;
					color: #F56C5F;
				}
				.footer-cancel {
					width: 100%;
					color: #303133;
				}
			}
		}
	}
</style>
