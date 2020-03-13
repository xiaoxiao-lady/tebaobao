<template>
    <view class="index_class">
        <view class="order-deta">
            <view class="order-info-time">
                <view>  
                    <view>{{orderInfo.order_zt}}</view>
                    <view v-if="orderInfo.filter == 1">剩余{{orderInfo.sytime}}关闭</view>
                    <view v-if="orderInfo.filter == 3">剩余{{orderInfo.sysh_time}}自动收货</view>
                </view>
                <image src="../../static/images/img/addr-bao.png" />
            </view>

            <view class="phone " v-if="orderInfo.filter == 3"  @click="getnav('/pages/personalSon/logistics')">
                <view style="width:20%;display:flex;justify-content:center">
                    <i class="iconfont icon_e65e icon-bgc" ></i>
                </view>
                <view class="tap_address " >
                    <view class="addrin">订单已发货{{orderInfo.wulius.log_name}}，订单编号{{orderInfo.wulius.psnum}}，联系电话{{orderInfo.wulius.telephone}}</view>
                    <text style="color:#ccc">{{orderInfo.fh_time}}</text>
                </view>
                <i class="iconfont icon_e60c" style="width:7%;font-size:40upx;color:#ccc"></i>
            </view>

            <view class="phone">
                <view style="width:20%;display:flex;justify-content:center">
                    <i class="iconfont icon_e712 icon-bgc" ></i>
                </view>
                <view class="tap_address">
                    <view>{{orderInfo.contacts}} <text style="padding-left:30upx"> {{orderInfo.telephone}}</text></view>
                    <text>{{orderInfo.province + orderInfo.city + orderInfo.area + orderInfo.address}}</text>
                </view>
                <!-- <image class="p_bottom" src="/static/images/img/address_img.png" /> -->
            </view>

            <view class="fresh_list" >
                <view class="order_bottom" >
                    <view class="bottom_top" @click.stop="getnav('/pages/homeSon/storeDetails?shop_id='+orderInfo.shop_id )">
                        <view>
                            <i class="iconfont cart_e61d"></i>
                            {{orderInfo.shop_name}}
                        </view>
                        <i class="iconfont order_all_right"></i>
                    </view>
                    <view class="bottom_img"  @click.stop="getnav('/pages/homeSon/shop_details?id='+time2.goods_id)" v-for="(time2,index) in orderInfo.goodsinfo" :key="index" >
                         <image :src="time2.thumb_url"  />
                            
                            <view style="padding:0 40upx 0 20upx;flex:1">
                                <view class="introduce" >{{time2.goods_name}}</view>
                                <view class="arrt-str">{{time2.goods_attr_str}}</view>
                            </view>
                            <view style="font-size:24upx;text-align:right">
                                ¥{{time2.real_price}}
                                 <view style="text-align:right;color:#999">x{{time2.goods_num}}</view> 

                                <view class="shou_sure" v-if="orderInfo.filter == 2  || orderInfo.filter == 3">
                                    <view v-if="orderInfo.pinzhuangtai === 1">
                                        <span @click.stop="exchange(orderInfo.ordernumber)"
                                        >退款</span> 
                                    </view>
                                    <view v-if="orderInfo.pinzhuangtai !== 1">
                                        <view v-if="time2.th_status == 0 || time2.th_status == 8">
                                            <view v-if="orderInfo.fh_status == 1">
                                                <span 
                                                @click.stop="getnav(`/pages/personalSon/Refundtype?order_num=${orderInfo.ordernumber}&orgoods_id=${time2.id}`)"
                                                >退换</span> 
                                            </view>
                                        </view>

                                        <view v-else-if="time2.th_status != 0">
                                            <span 
                                                @click.stop="getnav(`/pages/personalSon/RefundDatecopy?order_num=${orderInfo.ordernumber}&orgoods_id=${time2.id}`)"
                                                >
                                                <text v-if="time2.th_status == 1 || time2.th_status== 2">
                                                    退款中
                                                </text>
                                                <text v-else-if="time2.th_status == 3">
                                                    商家拒绝申请
                                                </text>
                                                <text v-else-if="time2.th_status == 4">
                                                    退款完成
                                                </text>
                                                <text v-else-if="time2.th_status == 5 || time2.th_status == 6">
                                                    换货中
                                                </text>
                                                <text v-else-if="time2.th_status == 7">
                                                    商家拒绝申请
                                                </text>
                                            </span> 
                                                
                                        </view>
                                    </view>
                                </view>
                            </view>
                    </view>
                </view>
                <view class="or_number">
                    <!-- <view class="number_text">
                        实付金额:<text>¥{{orderInfo.goods_price}}</text> <i class="iconfont order_all_right"></i>
                    </view> -->
                    
                    <view class="number_sure" v-if="orderInfo.filter == 1">
                        <span @click="cancellation">取消订单</span>
                        <!-- <span @click="getnav('/pages/personalSon/logistics')">查看物流</span> -->
                        <span class="payment_order" @click.stop="hidePopup">付款</span>
                        
                    </view>
                    <!-- <view class="number_sure" v-if="orderInfo.filter == 3">
                        
                        <span class="payment_order"  @click="getqrshouhuo">确认收货</span>
                    </view> -->
                    
                </view>
            </view>

            <view class="order_list">
                <view >
                    <text>商品总价</text>
                    <text class="color">¥ {{orderInfo.goods_price}}</text>
                </view>
                <view >
                    <text>运费（快递）</text>
                    <text class="color">¥ {{orderInfo.freight}}</text>
                </view>
                <view >
                    <text>店铺优惠</text>
                    <text class="color"> -¥ {{orderInfo.youhui_price}}</text>
                </view>
                <view class="order-name">
                    <text>订单总价</text>
                    <text class="color">¥ {{orderInfo.total_price}}</text>
                </view>
            </view>

            <view class="order_list order-list-info"  style="margin:20upx 0 60upx 0;">
                <view >
                    <text>订单编号:</text>
                    <text class="color">{{orderInfo.ordernumber}}</text>
                </view>
                <view >
                    <text>交易编号:</text>
                    <text class="color">{{orderInfo.order_number}}</text>
                </view>
                <view >
                    <text>创建时间</text>
                    <text class="color"> {{orderInfo.addtime}}</text>
                </view>
                <view v-if="orderInfo.filter == 2 || orderInfo.filter == 3 || orderInfo.filter == 4">
                    <text>付款时间</text>
                    <text class="color">{{orderInfo.pay_time}}</text>
                </view>
                <view v-if="orderInfo.filter == 3 || orderInfo.filter == 4">
                    <text>发货时间</text>
                    <text class="color">{{orderInfo.fh_time}}</text>
                </view>
                <view v-if="orderInfo.filter == 4">
                    <text>收货时间</text>
                    <text class="color">{{orderInfo.coll_time}}</text>
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
                
                <view class="pay-list" @click="getpay(3)" hover-class="click-active-bgc">
                    <image src="../../static/images/img/yue.png" />
                    <text>余额支付</text>
                    <!-- <text class="money"> （￥{{cartsureInfo.wallet_price}}） </text> -->
                </view>
            </popup-layer>

             

            <txpwd v-on:cord_info="codeShow" :valShow='valShow'  v-on:backHied="hideAl"></txpwd>

        </view>
    </view>
</template>

<script>
let order_num = '' // 订单编号
let page = 1 // 页码
let providerList = []; // 支付通道
// let paydataYue = ''
let backindex = ''
import txpwd from '../../components/txpwd.vue'
import uniPopup from '../../components/uni-popup.vue';
export default {
    components:{
        uniPopup,
        txpwd
    },
    onShow(){
        this.getMyorderinfo()
    },
    onLoad(option){
        order_num = option.order_num
        backindex = option.backindex
         // #ifdef APP-PLUS
        // 获取支付通道
        uni.getProvider({
            service: "payment",
            success: (e) => {
                console.log("payment success:" + JSON.stringify(e));
                
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
    onBackPress() {  
        console.log(backindex)
        if(backindex == 2) {
            uni.switchTab({
                url: '/pages/tabBar/Cart'
            });
            return true
        } 
    },  
    data(){
        return {
            orderInfo:{}, // 订单详情
            valShow:false,
            valueStatus: 0,  // 更新页面状态 防止页面卡死
        }
    },
    watch: {
        valShow(){
            
            this.statusMath(this)
        }
    },
    methods: {
        exchange (ordernum) {
            console.log(ordernum)
            this.$Dialog.confirm({
                message: '确认退款吗？'
            }).then(() => {
                this.$loading()
                this.$http.exchange({
                    order_num: ordernum
                }).then(res => {
                    if (res.status === 200) {
                        this.$toast(res.mess)
                    }
                })
            })
        }, 
        getbacktel(){
            console.log(backindex)
            if(backindex == 2) {
                uni.switchTab({
                    url: '/pages/tabBar/Cart'
                });
                
            } else {
                this.getback()
            }
        },
        /**
         * 确认收货
         */
        // getqrshouhuo(){
        //     this.$showModal({content:'确认收货吗?'}).then(res=>{
        //         if(res.confirm) {
        //             this.$http.getqrshouhuo({order_num:order_num}).then(result=>{
        //                 if(result.status == 200) {
        //                     this.$toast(result.mess)
        //                     setTimeout(()=>{
        //                         this.getback()
        //                     },1000)
        //                 }
        //             })
        //         }
        //     })
            
        // },
        getMyorderinfo(){
            this.$loading()
            this.$http.getMyorderinfo({order_num}).then(res=>{
                if(res.status == 200) {
                    this.orderInfo = res.data
                } 
            })
        },
        /**
         * 取消订单
         */
        cancellation(){
            this.$showModal({content:'确认取消订单吗？'}).then(res=>{
                if(res.confirm) {
                    this.$loading()
                    this.$http.getMyOrderquxiao({order_num}).then(res=>{
                        if(res.status == 200) {
                            this.$toast(res.mess)
                            this.getback()
                        }
                    })
                }
            })
            
        },
        /**
         * 获取支付订单数据
         */
        orderInfoStr(typeIndex,pwd){
            let dataType = {
                order_nums:[order_num],
                zf_type:typeIndex

            }
            return new Promise(reslove=>{
                this.$http.getzhifuorder(dataType).then(res=>{
                    if(res.status == 200) {
                        this.$http.getzhifu({
                            order_number: res.data.order_number,
                            zf_type:res.data.zf_type,
                            pay_password:pwd
                        }).then(res=>{
                            console.log(JSON.stringify(res),'888888888888')
                             reslove(res)
                         })  
                    }else {
                        this.$toast(res.mess)
                    }
                })
            })
            
        },
        /**
         * 支付
         */
        async getpay(index){
            let orderInfo = ''
            if(this.address == ''){
                this.$toast('请选择收货地址')
                return false
            }
            // if(providerList.length <= 0){
            //     this.$toast('获取支付通道失败')
            //     return false
            // }
            
            let requestPaymentid = ''
            if(index == 1)  {
                // 支付宝支付
                requestPaymentid = providerList[0].id
                orderInfo = await this.orderInfoStr(1)
               
            } else if(index == 2) {
                // 微信支付
                requestPaymentid = providerList[1].id
                orderInfo = await this.orderInfoStr(2)
               
            }else {
                // 余额
                this.$http.getpdpaypwd().then(res=>{
                    if(res.status == 200) {
                        if(res.data.zhifupwd == 0) {
                            this.$toast('请先设置支付密码')
                            setTimeout(()=>{
                                this.getnav('/pages/personalSon/setupZfpwd')
                            },1000)
                            
                        } else {
                            this.$refs.popupRef.close() // 关闭
                            this.valShow = true

                        }
                    }
                })
                return false
            }

            uni.requestPayment({
                provider: requestPaymentid,
                orderInfo: orderInfo.data.wxpayinfos,
                success: (e) => {
                    
                    uni.showToast({
                        title: "感谢您的赞助!"
                    })
                    
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
        },
        /**
         * 
         */
        hidePopup(){
            this.$refs.popupRef.show() 
        },
        /**
         * 余额支付
         */
        async codeShow(index) { // 接受子组件传的值  点击的六位密码值
            /**
             * 确认支付
             */
            this.$loading()
            let  paydata = await this.orderInfoStr(3,index.cord)

            if(paydata.status == 200) {
                this.$toast(paydata.mess)
                setTimeout(()=>{
                    this.getback()
                },1000)
            }else {
                this.$toast(paydata.mess)
            }
            
            console.log(paydata)
            
        },
        hideAl(bal) {
            this.valShow = false
           
        },

    },
}
</script>

<style lang="less">
.shou_sure {
    span {
        display: block;
        // width: 100upx;
        height: 40upx;
        padding: 0 20upx;
        line-height: 40upx;
        border-radius: 20upx;
        border: 1upx solid #999;
        color: #999;
        text-align: center;
        font-size: 24upx;
    }
}
.order-list-info {
    >view {
        text:nth-child(2) {
            display: block;
            flex: 1;
            text-align: left;
        }
        text:nth-child(1) {
            display: block;
            width: 30%;
            text-align: left;
        }
    }
}
</style>
