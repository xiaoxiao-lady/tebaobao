<template>
    <view class="index_class">
        <view class="bus-top">
            <view class="order-filter">      
                    <view class="items" :class="{'order_active':showingIndex1 == 6}" @tap="showOptions(6)">全部</view>
                    <view class="items" :class="{'order_active':showingIndex1 == 1}" @tap="showOptions(1)">待付款</view>
                    <view class="items" :class="{'order_active':showingIndex1 == 2}" @tap="showOptions(2)">待发货</view>
                    <view class="items" :class="{'order_active':showingIndex1 == 3}" @tap="showOptions(3)">待收货</view>
                    <view class="items" :class="{'order_active':showingIndex1 == 4}" @tap="showOptions(4)">待评价</view>		
            </view>	
	
		</view>
        
            <view class="all-order">
                <!--  app 端状态栏站位 -->
                 <mescroll-uni top="0" style="padding-top:0!important" :up="upOption" @up="upCallback" @down="downCallback" @init="mescrollInit" @emptyclick="emptyClick">
       
                    <view  style="background-color:#f4f4f4">
                        <view class="order_list" v-for="(item,index) in list" :key="index" >
                            <view class="order_top">
                                <text>订单号:{{item.ordernumber}}</text>
                                <view>
                                    <text class="color" >{{item.order_zt}}</text>
                                    
                                    <i class="iconfont order_all_right"></i>
                                </view>
                            </view>
                            <view class="order_bottom" >
                                <view class="bottom_top" @click.stop="getnav('/pages/homeSon/storeDetails?shop_id='+item.shop_id )">
                                    <view>
                                        <i v-if="showingIndex1 == 1" @click.stop="checkpay(item.id,item.ordernumber)" class="iconfont " :class="[item.icon ? 'icon_e632' :'icon_e741']"></i>
                                        {{item.shop_name}}
                                    </view>
                                    <i class="iconfont order_all_right"></i>
                                </view>
                                <view class="bottom_img" @click="getnav('/pages/homeSon/orderDetails?order_num=' +item.ordernumber)" v-for="(shopItem,index2) in item.goodsinfo" :key="index2">
                                    <image :src="shopItem.thumb_url" />
                                    
                                    <view style="padding:0 40upx 0 20upx;flex:1">
                                        <view class="introduce" >{{shopItem.goods_name}}</view>
                                        <view class="arrt-str">{{shopItem.goods_attr_str}}</view>
                                    </view>
                                    <view style="font-size:24upx;">
                                        ¥{{shopItem.price}} 
                                        <view style="text-align:right;color:#999">x{{shopItem.goods_num}}</view> 
                                        <view class="order-all-text">
                                            <span v-if="shopItem.th_status == 1 || shopItem.th_status == 2 || shopItem.th_status == 3 ">退款中</span>
                                            <span v-else-if="shopItem.th_status == 4">退款完成</span>
                                            <span v-else-if="shopItem.th_status == 5 || shopItem.th_status == 6 || shopItem.th_status == 7">换货中</span>
                                            <span v-else-if="shopItem.th_status == 8">换货完成</span>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="or_number">
                                <view class="number_text">
                                    实付金额：<text>¥{{item.total_price}}</text> <i class="iconfont order_all_right"></i>
                                </view>
                                <view class="number_sure" v-if="item.filter ==1">
                                    <!-- <span @click="getnav('/pages/personalSon/Refundtype')">申请退款</span> -->
                                    <span @click="cancellation(item.ordernumber)">取消订单</span>
                                    <span class="payment_order" @click="clickPay(item.ordernumber)">支付订单</span>
                                </view>
                                <view class="number_sure" v-if="item.filter ==4 && item.ping == 0">
                                    <span @tap="getnav('/pages/homeSon/fbevaluate?id='+item.id+'&img='+item.goodsinfo.thumb_url)">去评价</span>
                                </view>
                                <view class="number_sure" v-if="item.filter ==5 ">
                                    <span @click="deleteOrder(item.ordernumber)">删除订单</span>
                                </view>
                                <view class="number_sure" v-if="item.filter ==3 ">
                                    <span class="payment_order" @click="getqrshouhuo(item.ordernumber)">确认收货</span>
                                </view>
                                <view class="number_sure" v-if="item.order_type === 2 &&  item.state === 1 && item.order_status !== 2">
                                    <span @click="toPt(item.ordernumber)">拼团详情</span>
                                </view>
                            </view>
                        </view>

                        <view class="paybtn" v-if="numberpay">
                            <view @click="hebingpay">合并付款</view>
                        </view>
                    </view>
                </mescroll-uni>
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
                    <text class="money"> </text>
                </view>
            </popup-layer>
            <txpwd v-on:cord_info="codeShow" :valShow='valShow'  v-on:backHied="hideAl"></txpwd>
    </view>
</template>

<script>

let providerList = []; // 支付通道
let zf_number = [] // 支付订单号
let iconarr = [] // 合并支付订单号
let current = '' 

let backindex = ''
import MescrollUni from "mescroll-uni/mescroll-uni.vue";

import uniPopup from '../../components/uni-popup.vue';
import txpwd from '../../components/txpwd.vue'

export default {
    components:{
        uniPopup,
        txpwd,
        MescrollUni
    },
    onLoad(option){
        if(option) {
            this.showingIndex1 = option.index ? option.index : 6
            backindex = option.backindex
        }
        providerList = []
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
    onShow(){
        this.list = []
        this.mescroll && this.mescroll.resetUpScroll() 
    },
    data(){
        return {
            showingIndex1:6,
            list:[],
            valShow:false,
            numberpay:false, // 合并付款
            valueStatus: 0,  // 更新页面状态 防止页面卡死
            mescroll: null, //mescroll实例对象
            upOption:{
                page: {
                	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                	size: 10 // 每页数据的数量
                },
                noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
                // empty: {
                //     use: true, // 是否显示空布局
                //     icon: "http://www.mescroll.com/img/mescroll-empty.png", // 图标路径
                //     tip: '~ 暂无相关数据 ~', // 提示
                //     btnText: '去逛逛 >' // 按钮
                // }
                empty:{
                    tip: '~ 暂无数据 ~', // 提示
                    btnText: '去看看'
                }
            },

        }
    },
    watch: {

        valShow(){
            
            this.statusMath(this)
        }
    },
    onReachBottom:function(){
        this.mescroll && this.mescroll.onReachBottom();
    },
    //注册列表滚动事件,用于下拉刷新
    onPageScroll(e) {
        this.mescroll && this.mescroll.onPageScroll(e);
    },
    onBackPress() {  
        if(backindex == 2) {
            uni.switchTab({
                url: '/pages/tabBar/Cart'
            });
            return true
        } 
    },  
    methods: {
        toPt (order_num) {
            this.getnav(`/pages/homeSon/fightGroup?order_num=${order_num}`)
        },

        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        // 下拉刷新的回调
        downCallback(mescroll){
            mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
        },
        /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
        upCallback(mescroll) {
            var pageNum = mescroll.num; // 页码, 默认从1开始
            var pageSize = mescroll.size; // 页长, 默认每页10条
            this.$http.getMyOrder({
                filter:this.showingIndex1,
                page:pageNum
            }).then(res=>{
                if(res.status == 200) {
                    res.data.forEach(el=>{
                        el.icon = false
                    })
                    this.mescroll.endByPage(res.data.length, Math.ceil(Number(res.data.length) / pageSize) );
                    if(pageNum == 1) this.list = []; //如果是第一页需手动制空列表
                    this.list = this.list.concat(res.data); //追加新数据 
                }
            }).catch(err=>{
                // 失败隐藏下拉加载状态
                this.mescroll.endErr()
            })

        },
        //点击空布局按钮的回调
        emptyClick(){
           this.getnav('/pages/homeSon/classification')
        },
        getbacktel(){
            if(backindex == 2) {
                uni.switchTab({
                    url: '/pages/tabBar/Cart'
                });
                
            } else {
                this.getback()
            }
        },
        showOptions:function(i) {
            if(this.showingIndex1 == i) return false;
            this.showingIndex1 = i
            this.list = []// 在这里手动置空列表,可显示加载中的请求进度
			this.mescroll.resetUpScroll()// 刷新列表数据
            this.numberpay = false
            
        },
       
        /**
         * 取消订单
         */
        cancellation(or_number){
            this.$showModal({content:'确认取消订单吗？'}).then(res=>{
                if(res.confirm) {
                    iconarr = []
                    this.$loading()
                    this.$http.getMyOrderquxiao({order_num:or_number}).then(res=>{
                        if(res.status == 200) {
                            
                            this.$toast(res.mess)
                            this.list = []
                            this.mescroll.resetUpScroll()
                        }
                    })
                }
            })
            
        },

        /**
         * 获取支付订单数据
         */
        orderInfo(typeIndex,numarr,pwd = ''){
            let dataType = {
                order_nums:numarr,
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
                            console.log(JSON.stringify(res),'999999')
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
            // if(providerList.length <= 0){
            //     this.$toast('获取支付通道失败')
            //     return false
            // }
            let requestPaymentid = ''
            if(index == 1)  {
                // 支付宝支付
                requestPaymentid = providerList[0].id
                orderInfo = await this.orderInfo(1,current)
                
            } else if(index == 2) {
                // 微信支付
                requestPaymentid = providerList[1].id
                orderInfo = await this.orderInfo(2,current)
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
                provider: requestPaymentid,  // 支付通道
                orderInfo: orderInfo.data.wxpayinfos,        // 订单信息
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
                    this.showOptions(1)
                }
            })
        },
         /**
         * 余额支付
         */
        async codeShow(index) { // 接受子组件传的值  点击的六位密码值
            this.valShow = index.backHied
            console.log(index)
            /**
             * 确认支付
             */
            this.$loading()
            let orderlistinfo = await this.orderInfo(3,current,index.cord)
            
            if(orderlistinfo.status == 200) {
                this.$toast(orderlistinfo.mess)
                setTimeout(()=>{
                    this.showOptions(2)
                },)
            } else {
                this.showOptions(1)
            }
        },
        hideAl() {
            this.valShow = false
        },
        /**
         * 点击支付
         */
        clickPay(data){
            this.$refs.popupRef.show() // 弹出
            if(!zf_number.includes(data)) {
                zf_number.push(data)
            }
            current = zf_number
        },
        /**
         * 合并付款
         */
        checkpay(id,orderNumber){
            // 多选框
            
            for(var i=0; i<this.list.length;i++) {
                if(id == this.list[i].id) {
                    this.list[i].icon = !this.list[i].icon
                    if(this.list[i].icon) {
                        this.numberpay = true
                        if(!iconarr.includes(orderNumber)) {
                            iconarr.push(orderNumber)
                        }
                    } else {
                        if(iconarr.includes(orderNumber)) {
                            iconarr.splice(iconarr.indexOf(orderNumber),1)
                        }
                    }
                    
                    
                }
            }
            if(iconarr.length == 0) {
                this.numberpay = false
            }    
        },
        hebingpay(){
            this.$refs.popupRef.show() // 弹出
            current = iconarr
        },
        /**
         * 删除订单
         */
        deleteOrder(order_number){
            this.$showModal({content:'确认删除订单？'}).then(res=>{
                if(res.confirm) {
                    this.$loading()
                    this.$http.getdelorder({order_num:order_number}).then(result=>{
                        if(result.status == 200) {
                            this.$toast(result.mess)
                            
                            this.list = []
                            this.mescroll.resetUpScroll()
                        }
                    })
                }
            })
        },
        /**
         * 确认收货
         */
        getqrshouhuo(order){
            this.$showModal({content:'确认收货吗?'}).then(res=>{
                if(res.confirm) {
                    this.$loading()
                    this.$http.getqrshouhuo({order_num:order}).then(result=>{
                        if(result.status == 200) {
                            this.$toast(result.mess)
                            
                            this.list = []
                            this.mescroll.resetUpScroll()
                        }
                    })
                }
            })
            
        },
    },
}
</script>

<style lang="less">
page, .index_class {
    height: 100%;
}
.shou_sure {
    span {
        display: block;
        width: 100upx;
        height: 40upx;
        line-height: 40upx;
        border-radius: 20upx;
        border: 1upx solid #999;
        color: #999;
        text-align: center;
        font-size: 24upx;
    }
}
.padding-btn {
    padding-bottom: 80upx;
}
.all-order {
    // position: absolute;
    // top: 100upx;
    // width: 100%;
    // padding-top: 0!important;
}

</style>