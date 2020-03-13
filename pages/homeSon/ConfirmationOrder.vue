<template>
    <view class="index_class">
        <view class="cont-order">
            <div class="tip flex" v-if="isShow">
                <i class="iconfont">&#xe603;</i>
                <span>开团24小时内拼团成功，商家发货；若人数不足，系统自动退款关单；</span>
            </div>
            <view class="phone" @click="getnav('/pages/personalSon/address?isconfirm=true')"> 
                <i class="iconfont icon_e712"></i>
                <view class="tap_address" v-if="address">
                    <view class="flex-align">{{address.contacts}} <text> {{address.phone}}</text></view>
                    <text>{{address.pro_name}}{{address.city_name}}{{address.area_name}}  {{address.address}}</text>
                </view>
                <view class="tap_address" v-else>
                    请添加收货地址
                </view>
                <i class="iconfont icon_e60c phone-iconfont"></i>
                <image class="p_bottom" src="/static/images/img/address_img.png" />
            </view>
            <view v-for="(goodtime,keys) in goodinfo" :key="keys">
                <view class="fresh_list">
                    <view><i class="iconfont">&#xe735;</i>{{goodtime.goodres[0].shop_name}}</view>
                    <view v-for="(time,index) in goodtime.goodres" :key="index">
                        <image class="fresh_img" :src="time.thumb_url" />
                        <view class="fresh_banner">
                            <!-- <view class="fresh_tip">好多绿蔬菜</view> -->
                            <view class="fresh_text">{{time.goods_name}}</view>
                            <text class="attr_color">{{time.goods_attr_str}}</text>
                            <view class="address" >
                                <view class="pirve">
                                    ¥{{time.shop_price}}<text>/1件</text>
                                </view>
                                <view class="shop"> 数量:{{time.goods_num}}</view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="adds_list">
                    <view @click="coupon(1,goodtime)">
                        <text>优惠</text>
                        <view >¥ {{goodtime.youhui_price}}<i class="iconfont icon_e60c"></i></view>
                    </view>
                    
                    <view @click="coupon(2,goodtime)">
                        <text>运费</text>
                        <view >¥ {{goodtime.freight}} {{goodtime.freight ==0 ? '(免运费)': ''}}<i class="iconfont icon_e60c"></i></view>
                    </view>
                    <view>
                        <text>商品小计</text>
                        <view >¥ {{goodtime.xiaoji_price}}<i class="iconfont icon_e60c" style="color:transparent!important"></i></view>
                    </view>
                    
                </view>
                
            </view>
            <popup-layer ref="popupCopun" :direction="'top'">
                <view class="popup-coupon" v-if="pop == 1">
                        <view class="popup-title">优惠</view>
                        <view class="coupon-list" >
                            <view class="cuxiao" >
                                <text class="title">优惠</text>
                                <view class="content">
                                    <!-- <view style="font-size:22upx">safgasfsd</view> -->
                                    <view style="color:#999;font-size:22upx" >{{infoCoupon.coupon_str? infoCoupon.coupon_str:'暂无优惠信息'}}</view>
                                </view>
                                <i class="iconfont "></i>
                            </view>
                            <view class="cuxiao" v-if="infoCoupon.cxhuodong">
                                <text class="title">促销</text>
                                <view class="content">
                                    <!-- <view style="font-size:22upx">safgasfsd</view> -->
                                    <view style="color:#999;font-size:22upx;margin-bottom:20upx;" v-for="(cou,index9) in infoCoupon.cxhuodong" :key="index9">{{cou}}</view>
                                    
                                </view>
                                <i class="iconfont "></i>
                            </view>
                        </view>

                        <view class="popup-com">
                            <button  @click="hidePopup">完成</button>
                        </view>
                    </view>

                    <view class="popup-coupon" v-if="pop == 2">
                        <view class="popup-title">配送方式</view>
                        <view class="coupon-list" >
                            <view class="cuxiao" >
                                <text class="title">配送</text>
                                <view class="content">
                                    <!-- <view style="font-size:22upx">safgasfsd</view> -->
                                    <view style="color:#999;font-size:22upx" >{{infoCoupon.freight_str}}</view>
                                </view>
                                <i class="iconfont "></i>
                            </view>
                           
                        </view>

                        <view class="popup-com">
                            <button  @click="hidePopup">完成</button>
                        </view>
                    </view>
            </popup-layer>
            <view class="grace-footer">
                <view style="width:60%; line-height:90upx; text-indent:1em;" >
                    合计 <text style="font-size:36upx; color:#F00;">￥{{cartsureInfo.zsprice}}</text>
                </view>
                <!-- getnav('/pages/homeSon/SubmissionOrder') -->
                <view style="width:40%;">
                    <button type="warn" class="tor-btn" @click="showBottomPopup" >提交订单</button>
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
                    <text class="money"> （￥{{cartsureInfo.wallet_price}}） </text>
                </view>
            </popup-layer>
        </view>        
        <txpwd v-on:cord_info="codeShow" :valShow='valShow'  v-on:backHied="hideAl"></txpwd>        
    </view>
</template>

<script>
let providerList = [];
let cart_idresList = '' // 购物车商品id

 let paydataYue = '' // 提交商品订单
import uniPopup from '../../components/uni-popup.vue';
import txpwd from '../../components/txpwd.vue'

export default {
    data(){
        return {
            infoCoupon:'',
            cartsureInfo:{},
            address:'',  // 收货地址
            goodinfo:{},
            pop:1,
			isShow:false,
            valShow: false,
            valueStatus: 0,  // 更新页面状态 防止页面卡死
            params: null
        }
    },
    components:{
        uniPopup,
        txpwd
    },
    onShow(){
        paydataYue = ''
        if(this.$store.state.confirmAddress) {
            this.address = this.$store.state.confirmAddress
        }
        
    },
    onLoad(opiton){
        this.params = opiton
		let data=opiton;
        if(opiton.type == "1") {
            // 商品详情立即购买
               this.$http.getpursure({
                   pur_id: data.pur_id,
                   pin_number: data.pin_number,
                   fangshi: data.fangshi
               }).then(res=>{
                   if(res.status == 200) {
                       this.cartsureInfo = res.data
           			   this.isShow=this.cartsureInfo.assem_zt.is_show
                       this.address = res.data.address
                       this.goodinfo =res.data.goodinfo 
                   }
               })
        } else if(opiton.type =="2") {
             // 购物车购买
			 	console.log("购物车购买")
                this.$http.getcartsure({cart_idres:data.cart_idres}).then(res=>{
                    if(res.status == 200) {
                        this.cartsureInfo = res.data
                        this.address = res.data.address
                        this.goodinfo = res.data.goodinfo
                    }
                })
 
            /**
             * // 商品详情立即购买
             */
        }
        cart_idresList = opiton
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
    watch: {
        valShow() {
             /**
             * 更新页面状态 防止页面卡死
             */
            this.statusMath(this)
        }
    },
    onBackPress() {  
        // 
        if(this.valShow) {  
            this.getnav('/pages/homeSon/allOrder?backindex=2')
            return true;  
        }  
    }, 
    methods: {
        coupon(type,data){
            // if(type == 1) {
            //     // 优惠
            //     if(Number(data.youhui_price) <= 0) {
                    
            //     }
            // } else if(type == 2) {
            //      // 运费
            //     if(Number(data.freight) <= 0) {
                    
            //     }
            // }
            this.pop = type
            this.infoCoupon = data
            this.$refs.popupCopun.show()
        },
     
        /**
         * 获取支付订单数据
         *  
         */
        orderInfo(typeIndex){
            let dataType = {
                dz_id:this.address.id,
                zf_type:typeIndex
            }
             return new Promise(reslove=>{
                if(cart_idresList.type == 2) {
                    // 购物车创建订单
                    dataType.cart_idres = cart_idresList.cart_idres
                    this.$http.getaddorderPay(dataType).then(res=>{
                        if(res.status == 200) {
                           reslove(res)
                            
                        }else {
                            this.$toast('订单提交失败')
                        }
                    })
                }else if(cart_idresList.type == 1) {
                    // 立即购买创建订单
                    dataType.pur_id = cart_idresList.pur_id
                    this.$http.getpuraddorderPay({
                        ...dataType,
                        fangshi: this.params.fangshi,
                        pin_number: this.params.pin_number
                    }).then(res=>{
                        if(res.status == 200) {
                           reslove(res)
                        }else {
                            this.$toast('订单提交失败')
                        }
                    })
                }   
             })
           

        },

        payFall(paydata){
             return new Promise(resolve=>{
                this.$http.getzhifu({order_number:paydata.data.order_number,zf_type:paydata.data.zf_type}).then(res2=>{
                
                if(res2.status == 200) {
                        
                        resolve(res2)
                    }
                })
            })
        },
        /**
         * 支付
         */
        async getpay(index){
            let orderInfo = ''
            
            // if(providerList.length <= 0){
            //     this.$toast('获取支付通道失败')
            //     return false
            // }
            
            let requestPaymentid = ''
            if(index == 1)  {
                // 支付宝支付
                requestPaymentid = providerList[0].id
                let paydata = await this.orderInfo(1)
                orderInfo = await this.payFall(paydata)
                
            } else if(index == 2) {
                // 微信支付
                requestPaymentid = providerList[1].id
                let paydata = await this.orderInfo(2)
                orderInfo = await this.payFall(paydata)
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

                if(!paydataYue) {
                    paydataYue = await this.orderInfo(3)
                }
    

                return false
            }

            // console.log(JSON.stringify(orderInfo.data.wxpayinfos))
            // console.log(requestPaymentid)
            uni.requestPayment({
                provider: requestPaymentid,
                orderInfo: orderInfo.data.wxpayinfos,
                success: (e) => {
                    
                    uni.showToast({
                        title: "支付成功!"
                    })
                    this.getnav('/pages/homeSon/allOrder?index=2&backindex=2')
                },
                fail: (e) => {
                    console.log("fail", e);
                    uni.showModal({
                        content: "支付失败,原因为: " + e.errMsg,
                        showCancel: false
                    })
                    this.getnav('/pages/homeSon/allOrder?index=1&backindex=2')
                },
                complete: () => {
                    this.$refs.popupRef.close() // 关闭
                    
                }
            })
        },
        showBottomPopup(){
            if(this.address == ''){
                this.$toast('请选择收货地址')
                return false
            }
            this.$refs.popupRef.show() // 弹出
        },
        hidePopup(){
            console.log(this.$refs.popupCopun)
            this.$refs.popupCopun.close() // 关闭
        },

        /**
         * 余额支付
         */
        async codeShow(index) { // 接受子组件传的值  点击的六位密码值
            console.log(index)
            /**
             * 确认支付
             */
            this.$loading()
            this.$http.getzhifu({order_number:paydataYue.data.order_number,zf_type:paydataYue.data.zf_type,pay_password:index.cord}).then(res2=>{
                if(res2.status == 200) {
                    this.$toast(res2.mess)
                    setTimeout(()=>{
                        // this.valShow = index.backHied
                        if(res2.data.leixing == 1) {
                            this.getnav('/pages/homeSon/orderDetails?order_num='+ res2.data.order_num +'&backindex=2')
                           
                        } else if (res2.data.leixing == 2) {
                            this.getnav(`/pages/homeSon/fightGroup?order_num=${res2.data.order_num}`)
                        } else {
                            this.getnav('/pages/homeSon/allOrder?index=2&backindex=2')
                        }
                        
                        
                    },1000)
                }else {
                    this.$toast(res2.mess)
                }
            })
            console.log(paydataYue)
            
        },
        hideAl(bal) {
            this.valShow = false
            this.getnav('/pages/homeSon/allOrder?backindex=2')
        },

    },
    
}
</script>

<style lang="less">
.money {
    padding-left: 20upx;
    font-size: 24upx;
    color: #999;
}
.icon_e712 {
    text-align: center;
    font-size: 45upx;
}
.cuxiao {
    margin-bottom: 40upx;
}
.tip {
    align-items: center;
    height: 98upx;
    padding: 0 30upx;
    color: #ed6a0c;
    background: #fffbe8;
    font-size: 26upx;

    i {
        padding-right: 10upx;
    }
}

.phone {
    display: flex;
    align-items: center;
    padding: 0 30upx;
    .tap_address {
        flex: 1;
        padding: 0 10upx;
    }

    .phone-iconfont {
        position: static!important;
        padding-right: 0;
        width: auto!important;
        margin: 0;
        padding: 0!important;
    }
}
</style>
