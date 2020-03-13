<template>
	<view >
		<view class="uni-mask" v-show="show" :style="{top:offsetTop + 'px'}" @click="hide" catchtouchmove="return"></view>
		<view :class="['uni-popup','uni-popup-bottom']"  v-show="show">
			{{msg}}
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				//top - 顶部， middle - 居中, bottom - 底部
				default: 'middle'
			},
			msg: {
				type: String,
				default: ""
			}
		},
		data() {
			let offsetTop = 0;
			//#ifdef H5
			offsetTop = 44;
			//#endif
			return {
				offsetTop: offsetTop
			}
		},
		methods: {
			hide: function() {
				this.$emit('hidePopup');
			}
		}
	}
</script>
<style>
	.uni-mask {
		height:100vh;
		position: fixed;
		z-index: 9998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
		
	}

	.uni-popup {
		position: absolute;
		z-index: 9999;
		background-color: transparent;
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.uni-popup-bottom {
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		text-align: center;

	}
	
</style>
