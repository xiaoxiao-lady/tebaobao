<template>
    <view class="index_class">
        <view class="hd-date">
            <!-- <image class="bgc-img"  src="../../static/images/tabbar/banner-1.png" /> -->
            <view style="color:#fff;font-size:40upx;position: relative;z-index:2">{{promoinfos.hd_name}}</view>
            <view style="color:#fff;font-size:26upx;margin-top:30upx;position: relative;z-index:2">
                活动仅剩
                <uni-countdown 
                        @timeuptime="timeuptime"
                        color="#FFFFFF" 
                        background-color="#000" 
                        border-color="#000" 
                        :day="activity_time.day" 
                        :hour="activity_time.hour" 
                        :minute="activity_time.minute" 
                        :second="activity_time.second"
                        :show-day="activity_time.day ? true : false "
                        :show-colon="false">
                </uni-countdown>
            </view>
        </view>
        <view class="dateRules">
            <view>{{promoinfos.hd_name}}</view>
            <view class="pop" @click="showPopupBottom=true">活动规则详情</view>
        </view>

        <view class="type-fliter">
			<view class="r-list">
				<view class="r-items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/shop_details?id=' + item.id)" v-for="(item, index) in goodsList" :key="index">
					<image :src="item.thumb_url" />
					<text style="text-align:left">{{ item.goods_name }}</text>
					<view class="r-money">
						<text>¥{{ item.zs_price }}</text>
						<!-- <i>348人已抢</i> -->
					</view>
					<view class="r-bottom">
						<image v-if="item.coupon" src="../../static/images/img/juan.png" />
						<text v-if="item.is_activity === 1">秒杀</text>
						<text v-if="item.is_activity === 2">团购</text>
                        <text v-if="item.leixing === 1">自营</text>
					</view>
				</view>					
			</view>
			<!-- <loadMore :loadingType="loadingStatus"></loadMore> -->
		</view>

        <uni-popup :show="showPopupBottom" @hidePopup="hidePopup">
            <view class="popup-coupon" >
                <view class="popup-title">规则详情</view>
                <view class="coupon-list" >
                    <view class="guarantee" >
                        
                        <view class="guar-cont">
                            <view style="color:#F46C53">活动时间:</view>
                            <view style="color:#999;margin-top:10upx;">{{promoinfos.time}}</view>
                        </view>
                    </view>
                    <view class="guarantee" >
                        
                        <view class="guar-cont">
                            <view style="color:#F46C53">活动规则:</view>
                            <view style="color:#999;margin-top:10upx;">{{promoinfos.hd_name}}</view>
                        </view>
                    </view>
                    
                </view>

                <view class="popup-com">
                    <button @click="showPopupBottom = false">关闭</button>
                </view>
            </view>
        </uni-popup> 

        <loadMore :loadingType="loadingType" ></loadMore>
    </view>
</template>

<script>
import uniCountdown from "../../components/uni-countdown.vue"; 
import uniPopup from "../../components/uni-popup.vue"
 let page =1
export default {
    onLoad(option) {
        page = 1
        this.goodsList = []
        this.loadListId = option
        this.getprolst() 
        this.getprominfo()
    },
    data(){
        return {
            goodsList:[],
            promoinfos:'',
            showPopupBottom: false,
            loadListId:{},
            activity_time:{
                hour:0,
                minute:0,
                second:10
            },  // 秒杀时间
            loadingType:0,
            valueStatus: 0,  // 更新页面状态 防止页面卡死
        }
    },
    components:{
        uniCountdown,
        uniPopup
    },
    showPopupBottom(){
        /**
         * 更新页面状态 防止页面卡死
         */
        
        this.statusMath(this)
    },
    onReachBottom:function(){
        // 上拉加载更多
        if(this.loadingType == 1 || this.loadingType == 2) { return false }
        this.loadingType = 1
        page++
		this.getprolst()
	},
    methods: {
        timeuptime(){
            page = 1
            this.goodsList = []
            this.loadListId = option
            this.getprolst()
            this.getprominfo()

        },
        hidePopup(){
            this.showPopupBottom = false
        },
        /**
         * 获取店铺活动商品列表接口
         */
        getprolst(){
            this.$http.getprolst({...this.loadListId,page:page}).then(res=>{
                if(res.status == 200) {
                    this.statusMath(this)
                    if(res.data.length == 0) {
                        this.loadingType = 2
                        return false
                    }
                    this.goodsList = [...this.goodsList,...res.data]
                    this.loadingType = 0   
                }
            })
        },
        /**
         * 
         * 获取商家促销活动信息接口
         */
        getprominfo(){
            this.$http.getprominfo(this.loadListId).then(res=>{
                if(res.status == 200) {
                    this.promoinfos = res.data
                    let str = Number(this.promoinfos.end_time) - Number(this.promoinfos.dqtime)
                    let  strArr = this.$formatSeconds(str).split('-')
                    console.log(strArr)
                    this.activity_time = {
                        day: parseInt(strArr[0] / 24),
                        hour:Number(strArr[0] % 24),
                        minute:Number(strArr[1]),
                        second:Number(strArr[2])
                    }
                }
            })
        }
    },
}
</script>

<style scope>
.index_class {
    background-color: #fff!important;
}
.uni-countdown__splitor {
    font-size: 26upx!important;
    color: #fff!important;
}
.type-fliter {
    position: relative!important;
}
</style>
