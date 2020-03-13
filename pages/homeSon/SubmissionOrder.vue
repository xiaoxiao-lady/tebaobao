<template>
    <view class="index_class">
        <view class="bus-top">
			<view class="status"></view>
			<view class="to-tltle">
                <i class="iconfont icon_e675 back" @click="getback()"></i>
				提交订单
				<!-- <text class="delete">发布动态</text> -->
			</view>
			<!-- <view class="bus-title-search">
				<view class="bus-search">
					<i class="icon iconfont icon_e819"></i>
					<input placeholder="请输入关键词搜索" />
					<view class="bus-tap">搜索</view>
				</view>
			</view> -->
	
		</view>
        <view class="cont-order">
            
            <view class="order">
                <view class="order_list">
                    <text>订单编号</text>
                    <text>PT1221312124124124141</text>

                </view>
                <view class="order_list">
                    <text>订单金额</text>
                    <text style="color:#FC595F">¥ 10.00</text>
                </view>

            </view>

            <view class="payment">
                <view class="payment_list">
                    <view class="pay_type">
                        <image src="/static/images/img/wx.png" />
                        <view>
                            <text>微信支付</text>
                            <text>微信安全支付</text>
                        </view>
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view>
                <view class="payment_list">
                    <view class="pay_type">
                        <image src="/static/images/img/yue.png" />
                        <view>
                            <text>微信支付</text>
                            <text>微信安全支付</text>
                        </view>
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view>

            </view>
            <view class="grace-footer">
                <view style="width:60%; line-height:90upx; text-indent:1em;">
                    合计 <text style="font-size:36upx; color:#F00;">￥80.00</text>
                </view>
                <view style="width:40%;">
                    <button type="warn" class="tor-btn" @tap="checkout">确认订单</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {

}
</script>

<style>

</style>
