<template>
    <view class="index_class">
         <view class="bus-top">
			<view class="status"></view>
			<view class="to-tltle">
                <i class="iconfont icon_e675 back" @click="getback()"></i>
				商品详情
				<!-- <text class="delete">发布动态</text> -->
			</view>

		</view>
        <view class="details">
            
            <!-- 商品详情 -->
            <swiper class="grace-swiper" autoplay="true" indicatorDots="true"  indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#FF1212" :style="'height:' + heightImg" interval="3000">
                <swiper-item v-for="(item, index) in swiperItems" :key="index">
                    
                    <image :src='item.img_url' style="height:100%" class="image_height"></image>
                    
                </swiper-item>
            </swiper>
            <!-- <graceSwiper swiperId="garce-swiper-1" :indicatorDots="true" :interval="3000" :items="product.imgs"></graceSwiper> -->
            <view class="garce-padding grace-nowrap" style="background:#FFF; padding:30upx 2%;">
                <view class="grace-product-title">
                    <text class="activity_info" v-if="product.is_activity == 1">限时秒杀</text>
                    <text class="activity_info" v-if="product.is_activity == 2">团购</text>
                    <!-- <text class="activity_info" v-if="product.is_activity == 3">正常售卖</text> -->
                     {{product.goods_name}}</view>
                <!-- #ifdef APP-PLUS -->
                <!-- <view class="grace-product-share grace-iconfont icon-share3" @tap="share"></view> -->
                <!-- #endif -->
            </view>
            <view class="grace-product-price garce-padding" style="color:green">
                ￥{{product.price}}<text>￥{{product.shop_price}}</text>
            </view>
            <view class="grace-time-press" v-if="product.is_activity == 1 || product.is_activity == 2">
                <view class="datatime-left" style="color:green">距离开始
                    <!-- <graceCountd :timer="activity_time" :endDo="endTime"></graceCountd> -->
                    <uni-countdown 
                            @timeuptime="timeuptime"
                            color="#FFFFFF" 
                            background-color="#FF6262" 
                            border-color="#FF6262" 
                            :day="activity_time.day" 
                            :hour="activity_time.hour" 
                            :minute="activity_time.minute" 
                            :second="activity_time.second"
                            :show-day="activity_time.day"
                            :show-colon="false">
                    </uni-countdown>
                </view>
                <view class="progress-right" style="background-color:#ccc">
                    <!-- <view class="active-pro" :style="'width:' + activity_info.yslv"></view>
                    已售30% -->
                    秒杀限量{{activity_info.num}}
                </view>
            </view>

            <view class="order-shop">
                <view class="order_list" @click="coupon(1)" v-if="couponinfos.is_show === 1" >
                    <view class="juan">
                        <text>领劵</text>
                        <text class="color" style="padding-left:20upx;" v-for="(coupon,coukey) in couponinfos.infos " :key="coukey">
                            满{{coupon.man_price}}减{{coupon.dec_price}}
                        </text>
                    </view>

                    <i class="iconfont icon_e60c order_color"></i>

                </view>
                <view class="order_list"  @click="coupon(2)" v-if="huodong.is_show === 1">
                    <view class="juan">
                        <text>活动</text>
                        <text style="padding-left:20upx;flex:1">{{huodong.infos}}</text>
                    </view>

                    <i class="iconfont icon_e60c order_color"></i>

                </view>
                <view class="order_list"  @click="coupon(3)" v-if="sertions.is_show === 1">
                    <view class="juan">
                        <text>服务</text>
                        <text style="padding-left:20upx" v-for="(sertionsItem,sertionsKey) in sertions.infos" :key="sertionsKey">{{sertionsItem.ser_name}}</text>
                    </view>

                    <i class="iconfont  order_color"></i>

                </view>

                <uni-popup :show="showPopupBottom" @hidePopup="hidePopup">
                    <view class="popup-coupon" v-show="PopupIndex===1">
                        <view class="popup-title">优惠</view>
                        <view class="coupon-list" >
                            <view class="items" v-for="(conList,conKey) in getcouponlst" :key="conKey">
                                <view class="coupon-left">
                                    <view>￥ <text>{{conList.dec_price}}</text>店铺优惠券</view>
                                    <text >满{{conList.man_price}}使用</text>
                                    <text >有限期{{conList.start_time}}-{{conList.end_time}}</text>
                                </view>
                                <view class="coupon-right">
                                    <text @click="Receive(conList.id)" v-if="conList.have == 0">立即领取</text>
                                    <text style="background:#999" v-if="conList.have == 1">已领取</text>
                                </view>
                            </view>
                            
                        </view>

                        <view class="popup-com">
                            <button  @click="showPopupBottom = false">完成</button>
                        </view>
                    </view>

                     <view class="popup-coupon" v-show="PopupIndex===2">
                        <view class="popup-title">促销</view>
                        <view class="coupon-list" @click="getnav(`/pages/homeSon/huodongDate?shop_id=${product.shop_id}&prom_id=${huodong.prom_id}&goods_id=${goodsId}`)">
                            <view class="cuxiao">
                                <text class="title">促销</text>
                                <view class="content">
                                    <view style="font-size:22upx">{{huodonginfo.promotion_name}}</view>
                                    <view style="color:#999;margin-top:10upx;">{{huodonginfo.time}}</view>
                                </view>
                                <i class="iconfont icon_e60c"></i>
                            </view>
                        </view>

                        <view class="popup-com">
                            <button  @click="showPopupBottom = false">完成</button>
                        </view>
                    </view>

                    <view class="popup-coupon" v-show="PopupIndex===3">
                        <view class="popup-title">基础保障</view>
                        <view class="coupon-list" >
                            <view class="guarantee" v-for="(serlstList,serlstKey) in serlst" :key="serlstKey">
                               <image />
                               <view class="guar-cont">
                                   <view>{{serlstList.ser_name}}</view>
                                   <view style="color:#999;margin-top:10upx;">{{serlstList.ser_remark}}</view>
                               </view>
                            </view>
                            
                        </view>

                        <view class="popup-com">
                            <button @click="showPopupBottom = false">完成</button>
                        </view>
                    </view>
                </uni-popup>    
            </view>

            <!-- 进店 -->
            <view class="enterShop">
                <!-- <i class="iconfont icon_e678"></i> -->
                <image :src='shopinfos.logo' style="width:120upx;height:120upx" />
                <view style="width:55%;" >
                    <view>{{shopinfos.shop_name}}</view>
                    <text>{{shopinfos.shop_desc}}</text>
                </view>
                <view class="enter_btn" :id="shopinfos.id" @click="getnav('/pages/homeSon/storeDetails?shop_id='+ shopinfos.id)">进店逛逛</view>

                <view class="enter-btn">
                    <text>宝贝评分 {{shopinfos.goods_fen}}</text>
                    <text>服务评分 {{shopinfos.fw_fen}}</text>
                    <text>物流评分 {{shopinfos.wuliu_fen}}</text>
                </view>
            </view>

             <!-- 店铺推荐 -->
            <view class="shop_recom" v-if="remgoodres.length > 0">
                <view class="title"> 
                    <text>店铺推荐</text>
                    <view @click="getnav('/pages/homeSon/storeDetails?shop_id='+ shopinfos.id)">查看全部<i class="iconfont icon_e60c order_color"></i></view>
                </view>
                <view class="contlist">
                    <view class="itemshop" @click="getnav('/pages/homeSon/shop_details?id='+items.id)" v-for="(items,index9) in remgoodres" :key="index9">
                        <image mode="aspectFill" :src="items.thumb_url" />
                        <view >{{items.goods_name}}</view>
                        <view class="color">￥ {{items.zs_price}}</view> 
                    </view>
                    
                </view>
                
            </view>

            <view class="grace-product-menu">
                <view :class="[active == 1 ? 'active' : '']" @tap="showInfo(1)">商品详情</view>
                <view :class="[active == 2 ? 'active' : '']" @tap="showInfo(2)">商品评论（0）</view>
            </view>
            <!-- 详情 -->
            <view class="grace-product-info" :hidden="active == 2">
                
                <rich-text :nodes="product.goods_desc"></rich-text>
            </view>
            <!-- 评论 -->
            <view class="grace-product-info" :hidden="active == 1">
                <view style="text-align:center;color:#999">暂无评论信息</view>
            </view>
            <view style="height:60px;"></view>
            <!-- 底部 -->
            <view class="grace-footer">
                <view style="width:40%;" class="grace-nowrap">

                    <view class="icons_bottom" @tap="home">
                        <view class="icon_cart iconfont icon_e614" :class="{'iconColor' : product.coll_goods }" ></view>
                        <text>{{product.coll_goods==0 ? '收藏' : '已收藏'}}</text>
                    </view>
                    <view class="icons_bottom" @click="getnav('/pages/homeSon/storeDetails?shop_id='+ shopinfos.id)">
                        <view class="icon_cart iconfont icon_e678"></view>
                        <text>店铺</text>
                    </view>
                    <view class="icons_bottom" @click="getTab('/pages/tabBar/Cart')">
                        <view class="icon_cart iconfont icon_e611"></view>
                        <text>购物车</text>
                        <text class="cart_index">{{ userCartNum }}</text>
                    </view>
                    

                </view>
                <view  class="grace-product-btn" style="background:#433D3D;" @click="getnav('/pages/homeSon/shop_details?id='+goodsId)" >原价购买</view>
                <view class="grace-product-btn" style="background-color:green" @click="settitle">设置提醒</view>
            </view>
            <!-- 商品属性  start -->
            <view class="grace-mask" style="z-index:5;" v-if="attrIsShow" catchtouchmove="return">
                <view class="grace-product-attr" v-if="attrIsShow">
                    <form @submit="attrSubmit" class="grace-form">
                        <!-- 关闭按钮  -->
                        <view class="grace-product-attr-close" @click="closeAttr">
                            <text class="grace-iconfont icon-close2"></text>
                        </view>
                        <!-- 头部商品信息 -->
                        <view class="grace-product-attr-info" style="height:200upx;">
                            <image :src="product.thumb_url" style="width:200upx;width200upx" mode="widthFix"></image>
                            <view class="title">
                                <text style="color:#FF1212;font-size:40upx">￥{{product.zs_shop_price}}</text>
                                <text>\n库存 : {{proNumber}}件</text>
                                <view>{{product.goods_name}}</view>
                                
                            </view>
                        </view>
                        <!-- 属性列表区 -->
                        <view style="height:calc(100% - 155px); overflow-y:auto;">
                            <view class="grace-product-attr-list" v-for="(tiems,keys) in radioattr" :key="keys">
                                <view class="title">{{tiems[0].attr_name}}</view>
                                <view class="grace-select-tips">
                                    <view  name="type">
                                        <view class="select-items" @click="typeChange(item.attr_value,keys)" v-for="(item, index3)  in tiems" :key="index3" :class="[item.check==='true' ? 'grace-checked' : '']">
                                            {{item.attr_value}}
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="grace-items" style="margin-top:8px;">
                                <view class="grace-label">购买数量</view>
                                <!-- input 用于记录购买数量隐藏形式并参与表单提交 -->
                                <!-- <input type="number" name="buynum" :value="buyNum" style="display:none;" /> -->
                                <!-- <graceNumberBox :value="buyNum" v-on:change="buyNumChange"></graceNumberBox> -->
                                <uni-number-box  :value="buyNum"  :min="1"  :max="activity_info.xznum ? activity_info.xznum : proNumber" v-on:change="buyNumChange"></uni-number-box>
                            </view>
                        </view>
                        <view class="grace-product-attr-btn" >
                            <button type="warn" formType="submit" >确定</button>
                        </view>
                    </form>
                </view>
            </view>
            <!-- 商品属性 end -->
        </view>

        <view class="skeleton" v-if="skeleton == 'show'">
            <view class="status" ></view>
            <image src="../../static/images/skeleton-img.png"></image>
        </view>
    </view>
</template>

<script>
    // import graceNumberBox from "../../graceUI/components/graceNumberBox.vue";
    import uniNumberBox from '../../components/uni-number-box.vue'
    import graceSwiper from "../../graceUI/components/graceSwiper.vue"
    // import graceCountd from "../../graceUI/components/graceCountd.vue"; 
    import uniCountdown from "../../components/uni-countdown.vue"; 

    import uniPopup from "../../components/uni-popup.vue"
    let shopId = null  // 商品 id
    let arr = []
    let buyNowNum = ''
    //记录用户选择的属性
    let strRadio = []
    var dateObj = new Date();
   
    // let dataTime = this.$formatDateTime()
	export default {
        onLoad(option){
            shopId = option.id
            this.goodsId =  option.id
            this.rush_id = option.rush_id
            console.log(option)
            this.userCartNum = this.$store.state.userCartNum
        },
		data() {
			return {
                heightImg:'330px',
                userCartNum:0,
                swiperItems:[], // 轮播图
                product: {},  // 商品详情
                shopinfos:{},  // 商家店铺
                remgoodres:{}, //
                couponinfos:{},   // 商品优惠券
                huodong:{},   // 活动
                sertions:{}, // 服务
                radioattr:{},  // 商品属性
                getcouponlst:[], //优惠券列表
                huodonginfo:{},  // 活动促销列表
                serlst:[],  // 商品服务列表
                goodsId:null, // 商品 id
                rush_id: null, //秒杀id
                activity_info: {},  // 限时秒杀
				active:1,
				//属性
				attrIsShow : false, //属性界面是否隐藏
				// attrData : null, // attrdata用于记录用户选择的属性
                proNumber: 0,    //  获取库存信息
                buyNum : 1,
                activity_time:{
                    hour:0,
                    minute:0,
                    second:10
                },  // 秒杀时间
                showPopupBottom:false, // 优惠券弹出层
                PopupIndex:0,
                skeleton:'show',
                 valueStatus: 0,  // 更新页面状态 防止页面卡死
			};
        },
        watch: {
            showPopupBottom(){
                /**
                 * 更新页面状态 防止页面卡死
                 */
                
                this.statusMath(this)
            },
            attrIsShow(){
                
                this.statusMath(this)
            }
        },
        mounted() {
            
            
        },
        onShow(){
            this.getrushgoodinfo()
            strRadio = []
        },
		methods:{
            settitle(){
                this.$toast('设置提醒成功')
            },
            hidePopup(){
                this.showPopupBottom = false
            },
            // 1 优惠劵  2 活动 3 服务
            async coupon(index){
                let isLogin =  await this.getIsLogin() // 判断是否登录
                if(!isLogin) {return false}
                this.PopupIndex = index
                this.showPopupBottom = true
                if(this.PopupIndex === 1) {
                    this.$loading()
                    this.$http.getcouponlst({shop_id:this.product.shop_id}).then(res=>{
                        if(res.status == 200) {
                            this.getcouponlst = res.data
                        }
                    })
                }
                if(this.PopupIndex === 2) {
                    this.$loading()
                    this.$http.gethuodonginfo({shop_id:this.product.shop_id,goods_id:shopId,prom_id:this.huodong.prom_id}).then(res=>{
                        if(res.status == 200) {
                            this.huodonginfo = res.data
                        }
                    })
                }
                if(this.PopupIndex === 3) {
                    this.$loading()
                    this.$http.getserlst({shop_id:this.product.shop_id,goods_id:shopId}).then(res=>{
                        if(res.status == 200) {
                            this.serlst = res.data
                        }
                    })
                }

            },
            /**
             * 立即领取优惠劵
             */
            Receive(id){
                this.$loading()
                this.$http.getcoupons({coupon_id:id,shop_id:this.product.shop_id}).then(res=>{
                    if(res.status == 200) {
                        this.$toast(res.mess)
                        this.getcouponlst.forEach(element => {
                            if(element.id == id) {
                                element.have = 1
                            }
                        });
                    }
                })
            },
            getrushgoodinfo(){
                this.$loading()
                this.$http.getrushgoodinfo({goods_id:shopId,rush_id:this.rush_id}).then(res=>{
                    if(res.status == 200) {
                        this.swiperItems = res.data.gpres
                        this.product = res.data.goodsinfo
                        this.shopinfos = res.data.shopinfos
                        this.couponinfos = res.data.couponinfos
                        this.huodong = res.data.huodong
                        this.sertions = res.data.sertions
                        this.radioattr  = res.data.radioattr
                        this.proNumber = res.data.pronum
                        this.activity_info = res.data.activity_info
                        this.remgoodres = res.data.remgoodres
                            let str = Number(this.activity_info.end_time) - Number(this.activity_info.dqtime)
                            let  strArr = this.$formatSeconds(str).split('-')
                            this.activity_time = {
                                day: parseInt(strArr[0] / 24),
                                hour:strArr[0] % 24,
                                minute:strArr[1],
                                second:strArr[2]
                            }
                        /**
                         * 更新banner 高度
                         */
                        setTimeout(()=>{
                            let view = uni.createSelectorQuery().select(".image_height");
                            view.fields({
                                size: true,
                                scrollOffset: true
                            }, data => {
                                console.log(data);
                                if(data && data.height > 330) {
                                    this.heightImg = data.height + 'px'
                                }
                                // console.log("节点的宽为" + data.width);
                               
                            }).exec();
                        },200)
                        setTimeout(()=>{
                            this.skeleton = 'hide'
                        },200)
                         this.statusMath(this)
                    }
                    
                })
            },

			
			showInfo: function (index) {
				this.active = index;
			},

			buyNow : function(type){
				//打开属性视图
                this.attrIsShow = true;
                buyNowNum = type  // true加入购物车，  false直接购买
                
			},
			// 确认属性
			attrSubmit : function(e){
                let isLogin =  this.getIsLogin() // 判断是否登录
                if(!isLogin) {return false}
                //后续操作
                let data = {
                    goods_id:shopId,
                    goods_attr:strRadio.join(','),
                    num:this.buyNum
                }

				if(buyNowNum ) {
                    this.$http.getaddcart(data).then(res=>{
                        if(res.status == 200) {
                            this.$toast(res.mess)
                            //关闭
                            this.attrIsShow = false;
                        }
                    })
                } else {
                    this.$http.getpurbuy(data).then(res=>{
                        if(res.status == 200) {
                            this.getnav('/pages/homeSon/ConfirmationOrder?pur_id=' + res.data.pur_id + '&type=' + 1)
                        }
                    })
                    
                }
                
                
			},
			closeAttr : function(){
				this.attrIsShow = false;
			},

			typeChange: function (checkVal,key) {
                let radioObaject = this.radioattr
                strRadio = []
                for(let keys in radioObaject ) {
                    if(key == keys) {
                        for(var i=0; i < radioObaject[keys].length; i++) {
                            if(radioObaject[keys][i].attr_value == checkVal) {
                                radioObaject[keys][i].check = 'true'
                            } else {
                                radioObaject[keys][i].check = 'false'
                            }
                        }
                    } 
                }

                for(let keys2 in radioObaject ) {
                    for(var i=0; i < radioObaject[keys2].length; i++) {
                        if(radioObaject[keys2][i].check == 'true') {
                           strRadio.push(`${radioObaject[keys2][i].id}`)
                        } 
                    }  
                }
                console.log(strRadio)
                
                if(Object.keys(radioObaject).length == strRadio.length) {
                    
                    this.$http.getgoodsPrice({goods_attr:strRadio.join(','),goods_id:shopId}).then(res=>{
                        if(res.status == 200) {
                            this.proNumber = res.data.attrinfos.goods_number

                            this.activity_info = Array.isArray(res.data.activity_info) ? {} :res.data.activity_info

                            this.buyNum = 1
                            this.product.is_activity = res.data.attrinfos.is_activity
                            this.product.goods_name = res.data.attrinfos.goods_name
                            this.product.zs_shop_price = res.data.attrinfos.zs_shop_price
                            this.product.thumb_url = res.data.attrinfos.attr_pic ?res.data.attrinfos.attr_pic:this.product.thumb_url
                            
                        }
                    })
                }
				this.radioattr = this.radioattr;
			},
			buyNumChange : function(data,id){
                // console.log(data,id)
				this.buyNum = data;
			},
			// 领取优惠券
			securities:function(){
				uni.navigateTo({
					url:'/pages/subPage/Coupon'
				})
            },
            timeuptime(){
                // 倒计时完成或执行
                this.$toast('秒杀结束')
                this.getgoodsinfoList()
                strRadio = []
            },
            getTab(src) {
                uni.switchTab({
                    url: src
                });
            },
             getIsLogin(){
                if(!uni.getStorageSync('token')) {
                    uni.redirectTo({
                        url: '/pages/loginSon/login?islogin=' + 0
                    });
                  return false
                }
                return true
            },
            // 收藏
            async home(){
                let isLogin =  await this.getIsLogin() // 判断是否登录
                if(!isLogin) {return false}
                if(this.product.coll_goods == 1) {
                    // 取消收藏
                    this.$loading()
                    this.$http.getcancelcoll({goods_id:shopId}).then(res=>{
                        if(res.status == 200) {
                            this.$toast(res.mess)
                            this.product.coll_goods = 0
                        }
                    })
                } else {
                    this.$loading()
                    this.$http.getcoll({goods_id:shopId}).then(res=>{
                        if(res.status == 200) {
                            this.$toast(res.mess)
                            this.product.coll_goods = 1
                        }
                    })
                }    
            },
		},
		components:{
			graceSwiper,
            uniNumberBox,
            uniCountdown,
			uniPopup
		}
	}
</script>

<style lang="less">
.select-items {
    display: inline-block;
    padding: 5upx 20upx;
}
.grace-product-attr-info {
    .title {
        text {
            font-size: 26upx;
        }
    }
}

.uni-countdown__splitor {
    color: #000!important;
}
.uni-countdown__number {
    background-color: green!important;
    border-color: green!important;
}
.skeleton {
    height: 100vh;
    width: 100%;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
    image {
        width: 100%;
        height: 100%;
    }
}
</style>
