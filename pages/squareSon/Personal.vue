<template>
    <view class="index_class">
        <view class="bus-top">
			<view class="status"></view>
			<view class="to-tltle">
                <i class="iconfont icon_e675 back" @click="getback()"></i>
				个人中心 
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
        <view class="personal-cont">
            <view class="seg-top" > 
                <view class="seg-left">
                    <image src="" />
                    <view>
                        <text>钉钉南山</text>
                        <text class="datatime">这个人太贪吃了，来不及介绍</text>
                    </view>
                </view>
                <!-- <view class="follow">关注</view> -->
            </view>

            <view class="ad-number">
                <view class="ad-items">
                    <text>28461</text>
                    <text>被关注</text>
                </view>
                <view class="ad-items">
                    <text>28461</text>
                    <text>被点赞</text>
                </view>
                <view class="ad-items">
                    <text>28461</text>
                    <text>动态</text>
                </view>
            </view>
        </view>

        <view class="seg-mend">
            <view class="seg-top" > 
                <view class="seg-left">
                    <image src="" />
                    <view>
                        <text>#捕手说#</text>
                        <text class="datatime">4小时发布</text>
                    </view>
                </view>
                <!-- <view class="follow">关注</view> -->
            </view>
            <view class="seg-text">
                苹果品种数以千计，分为酒用品种、烹调品种、鲜食品
                种3大类。3类品种的大小、颜色、香味、光滑度 （可能
                还有脆性、风味）等特点均有差别。不少品种含糖较高
                中等酸度丹宁含量很低。
            </view>
            <view class="seg-img">
                <image class="scoll-items" src="../../static/images/img/shop_al.png" />
                <image class="scoll-items" src="../../static/images/img/shop_al.png" />
                
            </view>
            <view class="seg-bottom">
                <image class="scoll-items" src="../../static/images/img/shop_al.png" />
                <text>
                        【奔腾马红刚】普通生菜3.40元/件(500
                        克左右,含运费)仅限汉川市内购买送货
                </text>
            </view>
            <view class="download">
                <view class="download-item">
                    <i class="iconfont icon_e66f"></i>
                    123
                </view>
                <view class="download-item">
                    <i class="iconfont icon_e680"></i>
                    123
                </view>
                <view class="download-item">
                    <i class="iconfont icon_e66b"></i>
                    123
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
