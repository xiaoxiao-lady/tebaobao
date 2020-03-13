<template>
    <view class="per_page index_class">
        <view class="personal">
            <view class="per-head">
                <view class="per-data">
                    <view class="per-left">
                        <image mode="aspectFill" :src="info.headimgurl ?info.headimgurl: '../../static/images/img/timg.png' " />
                        <view>{{info.user_name?info.user_name: '用户名' }} 
                            <image src="../../static/images/img/per_data.png"  /> </view>
                    </view>
                    <view class="login_right" @click="getnav('/pages/personalSon/signin')"><text>积分签到</text></view>
                </view>
            </view>  
            <view class="per-number">
                <view class="per-position">
                    <view @click="getnav('/pages/moneyCartSon/Collection')">
                        <view>{{info.coll_num}}</view>
                        <view>我的收藏</view>
                    </view>
                    <view @click="getnav('/pages/personalSon/ChatList')">
                        <view>0</view>
                        <view>消息通知</view>
                    </view>
                </view>
            </view>
            <view class="mywallet">
                <view class="wall-title" @click="getnav('/pages/moneyCartSon/Mywallet')">
                    <view>我的钱包</view>
                    <view class="ti-right">资金管理 <i class="iconfont icon_e60c"></i></view>
                </view>
                <view class="wall-info">
                    <view>
                        <text @click="getnav('/pages/moneyCartSon/Mywallet')">{{info.wallet_price}}</text>
                        <text @click="getnav('/pages/moneyCartSon/Coupon')">{{info.coupon_num}}</text>
                        <text @click="getnav('/pages/personalSon/signin')">{{info.integral}}</text>
                    </view>
                    <view>
                        <text @click="getnav('/pages/moneyCartSon/Mywallet')">余额</text>
                        <text @click="getnav('/pages/moneyCartSon/Coupon')">优惠券</text>  
                        <text @click="getnav('/pages/personalSon/signin')">积分</text>
                    </view>
                </view>
                <view class="wall-title">
                    <view>我的订单</view>
                    <view class="ti-right" @click="getnav('/pages/homeSon/allOrder')">全部订单 <i class="iconfont icon_e60c"></i></view>
                </view>

                <view class="myorder">
                    <view @click="getnav('/pages/homeSon/allOrder?index=1')">
                        <image src="../../static/images/img/order5.png" />
                        <view>待付款</view>
                        <!-- <view class="badeg">9</view> -->
                    </view>
                    <view @click="getnav('/pages/homeSon/allOrder?index=2')">
                        <image src="../../static/images/img/order1.png" />
                        <view>待发货</view>
                       
                    </view>
                    <view @click="getnav('/pages/homeSon/allOrder?index=3')">
                        <image src="../../static/images/img/order2.png" />
                        <view>待收货</view>
                        
                    </view>
                    <view @click="getnav('/pages/homeSon/allOrder?index=4')">
                        <image src="../../static/images/img/order3.png" />
                        <view>待评价</view>
                    </view>
                    <view @click="getnav('/pages/homeSon/tuikuan')">
                        <image src="../../static/images/img/order4.png" />
                        <view>退款/退货</view>
                    </view>
                </view> 
            </view>
            <view class="per-lists">
                <!-- <view class="items">
                    <view>
                        <image src="../../static/images/img/img-7.png" />
                        我的发现
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view> -->
                <view class="items" hover-class="bg-hover" @click="getnav('/pages/moneyCartSon/Mybankcard')">
                    <view>
                        <image src="../../static/images/img/img-1.png"  />
                        我的银行卡
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view>
                <view class="items" hover-class="bg-hover" @click="getnav('/pages/personalSon/address')">
                    <view>
                        <image src="../../static/images/img/img-10.png" />
                        地址管理
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view>
                <view class="items" hover-class="bg-hover" @click="confirm">
                    <view>
                        <image src="../../static/images/img/img-11.png" />
                        我要开店
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view>
                
  
                <view class="items" hover-class="bg-hover" @click="getnav('/pages/moneyCartSon/evaluate')">
                    <view>
                        <image src="../../static/images/img/img-5.png" />
                        我的评价
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view>
                
                <!-- <view class="items">
                    <view>
                        <image src="../../static/images/img/img-7.png" />
                        积分兑换
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view> -->
                <view class="items" hover-class="bg-hover" @click="getnav('/pages/personalSon/record')">
                    <view>
                        <image src="../../static/images/img/img-8.png" />
                        我的签到
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view>
                <view class="items" hover-class="bg-hover" @click="getnav('/pages/personalSon/Browserecord')">
                    <view>
                        <image src="../../static/images/img/img-6.png" />
                        浏览记录
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view>
                <view class="items" hover-class="bg-hover" @click="getnav('/pages/personalSon/myDistribution')">
                    <view>
                        <image src="../../static/images/img/img-2.png" />
                        我的分销
                    </view>
                    <i class="iconfont icon_e60c"></i>
                </view>
                
                <view class="items" hover-class="bg-hover" @click="checkUpdate">
                    <view>
                        <image src="../../static/images/img/update.png" />
                        升级
                    </view>
                    <view>
                        <span>{{ version }}</span>
                        <i class="iconfont icon_e60c"></i>
                    </view>
                </view>
            </view>
        </view>
        <login :islogin="islogin"></login>
    </view>
</template>
<script>
import login from '../../components/login.vue'
import autoUpdater from '../../utils/autoUpdater.min.js'
export default {
    onShow(){
		if(!uni.getStorageSync('token')) {
			this.islogin = 1
			return false
        }
        this.islogin = 0
        this.getreadprofile()
    },
    onPullDownRefresh(){
        if(!uni.getStorageSync('token')) {
            this.islogin = 1
            uni.stopPullDownRefresh()
			return false
        }
        this.islogin = 0
        this.getreadprofile()
    },
    data(){
        return {
            info:{},
            islogin:0,
            version: '',
            res: {},
            isNew: false
        }
    },

    onLoad () {
        /* #ifdef APP-PLUS */
        var server = `https://nycs.maitexun.cn/apicloud/version/versions`
        const res = uni.getSystemInfoSync()
        const apptype = res.platform

        var req = {
            appid: plus.runtime.appid,
            version: plus.runtime.version,
            client: apptype
        }

        this.version = plus.runtime.version

        uni.request({
            url: server,
            data: req,
            method: 'POST',
            success: (res) => {
                if (res.data.status === 1) {
                    this.isNew = true
                    this.res = res.data.data
                }
            }
        })
        /* #endif */
    },
    methods: {
        getreadprofile(){
            this.$http.getreadprofile().then(res=>{
                if(res.status == 200) {
                    uni.setStorageSync('userInfo', JSON.stringify(res.data));
                    this.info = res.data
                }
            })
        },
        confirm(){
            this.$http.getpanduan().then(res=>{
                if(res.status == 200) {
                    if(res.data.zhuangtai == 2) { // 进入审核流程状态页
                        this.getnav('/pages/moneyCartSon/Settledin')
                        
                    } else if(res.data.zhuangtai == 4) {
                        this.getnav('/pages/loginSon/settingWx')
                    }
                    else {
                        this.getnav('/pages/personalSon/TradingType')
                    }
                }
            })
            
        },
        

        checkUpdate () {
			const res = uni.getSystemInfoSync()
			const apptype = res.platform
            if (this.isNew) {
                autoUpdater.init({
                    packageUrl: this.res.url,
                    content: this.res.note,
                    contentAlign: 'left',
                    cancel: '取消',
                    cancelColor: '#007fff'
                })
                autoUpdater.show() 
                } else {
                this.$toast('当前已是最新版本')
            }
        }
 
    },
    components:{
		login
	},
  
    onNavigationBarButtonTap(params) {
        this.getnav('/pages/personalSon/setinfo')
    }
}
</script>
<style lang="less" scoped>

</style>

