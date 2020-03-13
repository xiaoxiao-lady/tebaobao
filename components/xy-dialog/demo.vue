<template>
	<view class="xydialig">	
		<text class="xydialig-title">消息提示</text>
		<view class="xydialig-content">
			<button type="primary" @click="handleAlert01">有标题提示</button>
			<button type="primary" @click="handleAlert02">无标题提示</button>
		</view>		
		
		<text class="xydialig-title">消息确认</text>
		<view class="xydialig-content">
			<button type="primary" @click="handleAlert03">确认消息提示</button>
		</view>
		
		<!-- 有标题提示组件 -->
		<xy-dialog 
			ref="xyDialog01" 
			@cancelButton="handleClose" 
			@confirmButton="handleConfirm"
		></xy-dialog>
		
		<!-- 无标题提示组件 -->
		<xy-dialog 
			ref="xyDialog02" 
			title="false"
			@cancelButton="handleClose" 
			@confirmButton="handleConfirm"
		></xy-dialog>
		
		<!-- 消息确认提示组件 -->
		<xy-dialog 
			ref="xyDialog03" 
			@cancelButton="handleClose" 
			@confirmButton="handleConfirm"
		></xy-dialog>
		
	</view>
</template>

<script>
	// 引入组件
	import xyDialog from '../../components/xy-dialog/xy-dialog.vue'
	export default {
		components: {
			xyDialog
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 有标题提示方法
			handleAlert01 () {
				this.$refs.xyDialog01.alert()
			},
			// 无标题提示方法
			handleAlert02 () {
				this.$refs.xyDialog02.alert()
			},
			// 消息确认提示方法
			handleAlert03 () {
				this.$refs.xyDialog03.confirm()
			},
			// 关闭按钮方法
			handleClose () {
				console.log('点击关闭按钮')
				uni.showToast({
					title: '点击关闭按钮,触发自定义事件',
					icon: 'none'
				})
			},
			// 确定按钮方法
			handleConfirm () {
				console.log('点击确定按钮')
				uni.showToast({
					title: '点击确定按钮,触发自定义事件',
					icon: 'none'
				})
			}
		}
	}
</script>

<style>
	.xydialig {
		padding: 30upx;
	}
	.xydialig-title {
		padding: 30upx 0;
		color: #606266;
	}
	.xydialig-content {
		padding: 30upx 0;
	}
	.xydialig-content button {
		margin-bottom: 10upx;
	}
</style>
