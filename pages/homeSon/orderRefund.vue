<template>
    <view class="index_class">
        <view class="bus-top">
			<view class="status"></view>
			<view class="to-tltle">
                <i class="iconfont icon_e675 back" @click="getback()"></i>
				申请退款
				<!-- <text class="delete">发布动态</text> -->
			</view>
	
	
		</view>
        <view class="order-refund">
            <div class="refund_table">
                <text>处理方式</text>
                <input type="text" disabled="disabled" placeholder="退款(仅退款不退货)" style="padding-left:20upx;">
                <i class="iconfont icon_e60c"></i>
            </div>
            <div class="refund_table">
                <text>退款原因</text>
                <input type="text" disabled="disabled" placeholder="不想要了" style="padding-left:20upx;">
                <i class="iconfont icon_e60c"></i>
            </div>
            <div class="refund_table">
                <text>退款说明</text>
                <input type="text" placeholder="选填" >
                <i></i>
            </div>
            <div class="refund_table">
                <text>退款金额</text>
                <input type="text" placeholder="请输入需要退款的金额" >
                <i></i>
            </div>
            <div class="refund_table">
                <text>上传凭证</text>
                <i class="iconfont icon_e645" style="width:70%;font-size:40upx;color:#999;"></i>
                <i></i>
            </div>
            <div class="refund_table">
                <text style="font-size:22upx; color:#999;">提示：</text>
                <view style="width:85%;font-size:22upx; color:#999;">您可退的最大金额为¥0.47,该商品退款需要0.03元手续费</view>
                <i></i>
            </div>
            <div class="refund_btn">
                <span>提交申请</span>
                <span style="background-color:#D6D6D6;">取消</span>

            </div>
        </view>
    </view>
</template>

<script>
export default {

}
</script>

<style>

</style>
