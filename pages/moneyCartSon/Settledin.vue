<template>
    <view class="index_class">
        <view class="tedp">
            <view class="tenumber">
                <view :class="{'active': applys.zhuangtai==2}">
                    <text class="te-index">1</text>
                    <text>审核</text>
                </view>
                <view :class="{'active': applys.zhuangtai==3}">
                    <text class="te-index">2</text>
                    <text>签合同</text>
                </view>
                <view :class="{'active': applys.zhuangtai==4}">
                    <text class="te-index">3</text>
                    <text>支付保证金</text>
                </view>
                <view :class="{'active': applys.zhuangtai==5}">
                    <text class="te-index">4</text>
                    <text>已开通</text>
                </view>
            </view>

            <view class="sett-status">
                入驻状态：
                <text v-if="applys.zhuangtai == 1">待审核</text>
                <text v-if="applys.zhuangtai == 2">待签署合同</text>
                <text v-if="applys.zhuangtai == 3">待支付保证金</text>
                <text v-if="applys.zhuangtai == 4">待开通</text>
                <text v-if="applys.zhuangtai == 5">已开通</text>
                <text v-if="applys.zhuangtai == 6">申请已被拒绝</text>
            </view>
        </view>

        <view class="settled" v-if="applys.zhuangtai == 6">
            <text class="son">拒绝原因:{{applys.remarks}}</text>
            <view class="person-button">
                <button type="warn" class="btn">重新申请入驻</button>
            </view>
        </view>

        <view class="settled">
            <text class="son">{{applys.xinxi}}</text>
           <view v-if="applys.zhuangtai == 3">
                <view class="son-list" style="margin-top:20upx;">您申请的行业为:{{industrys.industry_name}}</view>
                <view class="son-list">费率:千分之{{industrys.remind}}</view>
                <view class="son-list" style="border:0">缴纳的保证金:{{industrys.ser_price}}元</view>
                <view class="person-button" style="margin-top:100upx;">
                    <button type="warn" class="btn" @click="hidePopup">缴纳保证金</button>
                </view>
           </view>
        </view>

        <popup-layer ref="popupRef" :direction="'top'">
            <view class="pay-list" @click="getpay(2)" hover-class="click-active-bgc">
                    <image src="../../static/images/img/wx.png" />
                    <text>微信支付</text>
                </view>
                <view class="pay-list" @click="getpay(1)" hover-class="click-active-bgc">
                    <image  src="../../static/images/img/zifubao.jpg"/>
                    <text>支付宝支付</text>
                </view>
        </popup-layer>
         
    </view>
</template>

<script>
import uniPopup from '../../components/uni-popup.vue';
let providerList = []
export default {

    components:{
        uniPopup

    },
    onShow(){
        providerList = []
        this.getapplystatus()

        // #ifdef APP-PLUS
        // 获取支付通道
        uni.getProvider({
            service: "payment",
            success: (e) => {

                e.provider.map((value) => {
                    switch (value) {
                        case 'alipay':
                            providerList.push({
                                name: '支付宝',
                                id: value,
                                loading: false
                            });
                            break;
                        case 'wxpay':
                            providerList.push({
                                name: '微信',
                                id: value,
                                loading: false
                            });
                            break;
                        default:
                            break;
                    }
                })
                
            },
            fail: (e) => {
                this.$toast(`获取登录通道失败：${e}`)
            }
        });
        // #endif
    },
    onBackPress(){
        uni.switchTab({
            url: '/pages/tabBar/PersonalCenter'
        });
        
        return true
    },
    data(){
        return {
            applys:{},
            industrys:{},

        }
    },
    watch:{
      
    },
    methods: {
        getapplystatus(){
            this.$http.getapplystatus().then(res=>{
                if(res.status == 200) {
                    this.applys = res.data
                    this.industrys = res.data.industrys
                }
            })
        },
        /**
         * 支付保证金
         */
        getpay(index){
            this.$loading()
            this.$http.getorderzhifu({zf_type:index}).then(res=>{
                
                if(res.status == 200) {
                    let requestPaymentid = ''
                    this.$refs.popupRef.close() // 关闭
                    if(providerList.length == 0) { this.$toast('获取支付通道失败'); return false}
                    console.log(JSON.stringify(providerList),'99')
                    if(index == 1) {
                        requestPaymentid = providerList[0].id
                    } else {
                        requestPaymentid = providerList[1].id
                    }

                    uni.requestPayment({
                        provider: requestPaymentid,
                        orderInfo: res.data.wxpayinfos,
                        success: (e) => {
                            
                            uni.showToast({
                                title: "感谢您的赞助!"
                            })
                            this.getapplystatus()
                        },
                        fail: (e) => {
                            console.log("fail", e);
                            uni.showModal({
                                content: "支付失败,原因为: " + e.errMsg,
                                showCancel: false
                            })
                        },
                        complete: () => {
                            this.$refs.popupRef.close() // 关闭   
                        }
                    })
                }
            })
        },
         hidePopup(){
            this.$refs.popupRef.show() // 弹出
        },
    },
}
</script>

<style>
.sett-status {
    padding-left: 30upx;
    margin-top: 30upx;
    color: #999;
    font-size: 26upx;
}
</style>
