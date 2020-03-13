<template>
    <view class="index_class">
        <view class="details">
            
            <!-- 商品详情 -->
            <swiper class="grace-swiper" autoplay="true" indicatorDots="true"  indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#FF1212" :style="'height:' + heightImg" interval="3000">
                <swiper-item v-for="(item, index) in swiperItems" :key="index">
                    
                    <image :src='item.img_url' style="height:100%" class="image_height"></image>
                    
                </swiper-item>
            </swiper>
            <view class="fight-group" v-if="product.is_activity == 3">
                <view class="fight-group__left">
                    <view>¥<text>{{ product.zs_shop_price }}</text></view>
                </view>
                <view class="fight-group__middle">
                    <view class="fight-group__middle--top">拼团优惠价</view>
                    <view class="fight-group__middle--bottom">¥{{ datainfo.goodsinfo.zs_market_price }}</view>
                </view>
                <view v-if="activity_info.assem_type == 1 && activity_info.zhuangtai == 0" 
                    class="fight-group__right" style="color: #fff;">{{ activity_info.pin_num }}人团</view>
                <uni-countdown
                v-if="(activity_info.assem_type == 3 && activity_info.zhuangtai == 1) ||(activity_info.assem_type == 2 && activity_info.zhuangtai == 0) || (activity_info.assem_type == 1 && activity_info.zhuangtai == 2)"
                :day="activity_time.day" 
                :hour="activity_time.hour" 
                :minute="activity_time.minute" 
                :second="activity_time.second"
                :show-day="activity_time.day"
                splitor-color="#fff"
                background-color="#FF8300"
                border-color="#FF8300"
                color="#fff">
                </uni-countdown>
            </view>
           
            <view class="garce-padding grace-nowrap " style="background:#FFF; padding:30upx 2%;" >
                <view class="grace-product-title">
                    <text class="activity_info"  v-if="product.leixing == 1">自营</text>
                    <text class="activity_info"  v-if="product.is_activity == 1">限时秒杀</text>
                    <text class="activity_info"  v-if="product.is_activity == 2">团购</text>
                     {{product.goods_name ?product.goods_name: '' }}
            <view
                class="fight-group__right"
                v-if="(activity_info.assem_type == 3 && activity_info.zhuangtai == 1) ||(activity_info.assem_type == 2 && activity_info.zhuangtai == 0) || (activity_info.assem_type == 1 && activity_info.zhuangtai == 2)"
                style="color: #FF5959;">{{ activity_info.pin_num }}人团</view></view>
                <!-- #ifdef APP-PLUS -->
                <!-- <view class="grace-product-share grace-iconfont icon-share3" @tap="share"></view> -->
                <!-- #endif -->
            </view>
            <view class="grace-product-price garce-padding" style="color: #FA3F3F" v-if="product.is_activity != 3">
                {{product.zs_shop_price ? '￥' +product.zs_shop_price : ''  }}<text>{{product.zs_market_price?'￥' +product.zs_market_price : ''}}</text>
            </view>
            <view class="grace-time-press" v-if="product.is_activity == 1|| product.is_activity == 2">
                <view class="datatime-left">距离结束
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
                <view class="progress-right">
                    <view class="active-pro" :style="'width:' + activity_info.yslv?activity_info.yslv: 0"></view>
                    已售{{activity_info.yslv?activity_info.yslv: 0}}
                </view>
            </view>

            <view class="order-shop">
                <view class="order_list" >
                    <view class="juan">
                        <text>发货</text>
                        <text class="color" style="padding-left:20upx;" >
                            {{product.freight}}
                        </text>
                    </view>
                    
                    <i class="iconfont order_color"  style="font-size:26upx!important;">月销量 {{product.salenum?product.salenum : '0'}}</i>

                </view>
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

                    <i class="iconfont icon_e60c order_color"></i>

                </view>
                <view class="order_list" @click="buyNow('guige')" v-if="radioattr.length">
                    <view class="juan">
                        <text>选择</text>
                        <text style="padding-left:20upx;flex:1" >{{guige}}</text>
                    </view>

                    <i class="iconfont icon_e60c order_color"></i>

                </view>
                <view class="checkimg" v-if="colores.length"  @click="buyNow('guige')">
                    <image  :src="imgitem" v-for="(imgitem,index9) in colores" :key="index9" v-if="imgitem" />
                    <text class="text"> 共{{datainfo.colores.length}}中颜色可选 </text>
                </view>


                <view class="order_list"  @click="coupon(4)" v-if="datainfo.uniattr.length">
                    <view class="juan">
                        <text>参数</text>
                        <text style="padding-left:20upx" >{{ datainfo.uniattr[0] ? datainfo.uniattr[0].attr_name  : ''}}...</text>
                    </view>

                    <i class="iconfont icon_e60c order_color"></i>

                </view>
                <popup-layer ref="popupRef" :direction="'top'" @on-close="closePopup">
                    <view class="popup-coupon" v-show="PopupIndex==1">
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
                            <button  @click="hidePopup">完成</button>
                        </view>
                    </view>

                     <view class="popup-coupon" v-show="PopupIndex==2">
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
                            <button  @click="hidePopup">完成</button>
                        </view>
                    </view>

                    <view class="popup-coupon" v-show="PopupIndex==3">
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
                            <button @click="hidePopup">完成</button>
                        </view>
                    </view>


                     <view class="popup-coupon" v-show="PopupIndex==4">
                        <view class="popup-title">产品参数</view>
                        <view class="coupon-list uniattr" >
                            <view class="items" v-for="(datainfoitems, index6) in datainfo.uniattr" :key="index6">
                                <text>{{datainfoitems.attr_name}}</text>
                                <text>{{datainfoitems.attr_value}}</text>
                            </view>
                           
                        </view>

                        <view class="popup-com">
                            <button  @click="hidePopup">完成</button>
                        </view>
                    </view>

                    <view class="popup-coupon"  v-show="PopupIndex==5" >
                        <view class="grace-product-attr" >
                            <form @submit="attrSubmit" class="grace-form">
                                <!-- 关闭按钮  -->
                                <view class="grace-product-attr-close" @click="closeAttr">
                                    <text class="grace-iconfont icon-close2"></text>
                                </view>
                                <!-- 头部商品信息 -->
                                <view class="grace-product-attr-info" style="height:240upx;">
                                    <image :src="product.thumb_url" style="width:200upx;height:200upx" ></image>
                                    <view class="title">
                                        <div style="color:#FF1212;font-size:40upx;dispaly:inline-block;margin: 0;padding: 0" v-if="product.is_activity === 3">{{ getPrice }}<span class="tag-name" v-if="isPT == 2 || isPT == ''">拼团</span></div>
                                        <div style="color:#FF1212;font-size:40upx" :data-isPt="isPt" v-if="product.is_activity != 3" >￥{{ product.zs_shop_price }}
                    <text class="activity_info tag-name" v-if="product.is_activity == 1">秒杀</text>
                    <text class="activity_info"   v-if="product.is_activity == 2">团购</text></div>
                                        <div style="font-size:24rpx;line-height:60rpx;">\n库存 : {{proNumber}}件</div>
                                        <view>选择{{guige}} </view>
                                    </view>
                                </view>
                                <!-- 属性列表区 -->
                                <view style="height:calc(100% - 250px); overflow-y:auto;"  >
                                    <view class="grace-product-attr-list" v-for="(tiems,keysin) in radioattr" :key="keysin">
                                        <view class="title">{{tiems[0]? tiems[0].attr_name : ''}}</view>
                                        <view class="grace-select-tips">
                                            <view  name="type" class="select">
                                                <view class="select-items" @click="typeChange(item.id,keysin)" v-for="(item, index3)  in tiems" :key="index3" :class="[item.check === 'true' ? 'grace-checked-color' : '']">
                                                <image v-if="item.attr_pic" class="img" :src="item.attr_pic" /> {{item.attr_value}}
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="grace-items" style="margin-top:8px;">
                                        <view class="grace-label">购买数量</view>
                                        <!-- input 用于记录购买数量隐藏形式并参与表单提交 -->
                                        <!-- <input type="number" name="buynum" :value="buyNum" style="display:none;" /> -->
                                        <!-- <graceNumberBox :value="buyNum" v-on:change="buyNumChange"></graceNumberBox> -->
                                        <uni-number-box v-if="product.is_activity === 1" :value="buyNum"  :min="1"  :max=" activity_info == '' ? 10000: activity_info.xznum" v-on:change="buyNumChange"></uni-number-box>
                                        <uni-number-box v-else  :value="buyNum"  :min="1"  :max="1000000" v-on:change="buyNumChange"></uni-number-box>
                                    </view>
                                </view>
                                <view class="pt-tip" v-if="isPT == 2 && product.is_activity != 3">
                                    抱歉所选商品规格不能发起拼团，仅支持单独购买
                                </view>
                                <view class="grace-product-attr-btn" v-if="isPT == '' && product.is_activity != 3">
                                    <button type="warn" @click="submitOrder(false, 1)">确定</button>
                                </view>
                                <view class="grace-product-attr-btn flex" v-if="isPT == '' && product.is_activity == 3">
                                    <button type="warn" class="flex1" style="margin-right: 20upx;" @click="submitOrder(false, 1)">单独购买</button>
                                    <button type="warn" class="right-htn flex1" @click="submitOrder(false, 2)">{{ getBtnText }}</button>
                                </view>
                                <view class="grace-product-attr-btn" v-if="isPT == 1">
                                    <button type="warn"  @click="submitOrder(false, 1)">单独购买</button>
                                </view>
                                <view  v-if="isPT == 2 && product.is_activity != 3"></view>
                                <view class="grace-product-attr-btn flex" v-if="isPT == 2">
                                    <button type="warn" class="flex1" v-if="product.is_activity == 3" @click="submitOrder(false, 2)">{{ getBtnText }}</button>
                                    
                                    <button type="warn" @click="submitOrder(true)" class="flex1" v-if="product.is_activity != 3">加入购物车</button>
                                    <button type="warn" class="flex1 right-htn" @click="submitOrder(false, 1)" v-if="product.is_activity != 3" style="margin-left: 20upx;">立即购买</button>
                                    
                                </view>
                            </form>
                        </view>
                    </view>
                 </popup-layer>   
               
            </view>
            <!-- 拼团 -->
            <view class="fight-group__step" v-if="product.is_activity == 3">
                <view class="fight-group__step--header" @click="getnav('/pages/homeSon/fightGroupRule')">
                    <text>拼团</text>
                    <view class="middle">查看拼团规则</view>
                    <i class="iconfont icon_e60c"></i>
                </view>
                <view class="fight-group__step--middle">
                    <image :class="[item.pin_type == 1 ? 'user-active' : '']" :src="item.headimgurl" v-for="(item, index) in avatarList.imgs" :key="index"></image>
                    <view>{{ avatarList.title }}</view>
                </view>
                <view class="fight-group__step--list">
                    <view class="fight-group__step--item step-item__active">
                        <image src="../../static/images/img/fight-group.png" />
                        <text>发起拼团</text>
                    </view>
                    <view class="fight-group__step--item" :class="[activity_info.zhuangtai > 0 ? 'step-item__active' : '']">
                        <image :src="activity_info.zhuangtai > 0 ? '../../static/images/img/fight-group.png' : '../../static/images/img/fight-group-disable.png'" />
                        <text>邀请好友参团</text>
                    </view>
                    <view class="fight-group__step--item" :class="[activity_info.zhuangtai == 2 ? 'step-item__active' : '']">
                        <image :src="activity_info.zhuangtai == 2 ? '../../static/images/img/fight-group.png' : '../../static/images/img/fight-group-disable.png'" />
                        <text>拼团成功</text>
                    </view>
                </view>
            </view>
            <view class="fight-group__step" style="height: auto" v-if="product.is_activity == 3">
                <view class="fight-group__step--header" @click="getnav('/pages/homeSon/fightGroupRule')">
                    <text>拼团</text>
                    <view class="middle">立即参加Ta人的已开团，可快速成团</view>
                    <i class="iconfont icon_e60c"></i>
                </view>
                <view class="fight-group__list" v-for="(item, index) in userList" :key="index">
                    <image :src="item.headimgurl" />
                    <view class="fight-group__list--middle">
                        <h2>{{ item.user_name }}</h2>
                        <span>还差{{ item.pin_num - item.tuan_num }}人距结束{{ item.pin_time_out }}</span>
                    </view>
                    <view class="fight-group__list--item" @click="join(item.pin_number)">参加拼团</view>
                </view>
            </view>
            <!-- 进店 -->
            <view class="enterShop">
                <!-- <i class="iconfont icon_e678"></i> -->
                <view class="entershop-wrap">
                    <image :src='shopinfos.logo' style="width:120upx;height:120upx" />
                    <view class="entershop-middle">
                        <view>{{shopinfos.shop_name}}</view>
                        <text style="font-size:24upx"></text>
                    </view>
                    <view class="enter_btn" :id="shopinfos.id" @click="getnav('/pages/homeSon/storeDetails?shop_id='+ shopinfos.id)">进店逛逛</view>
                </view>
                <view class="enter-btn">
                    <text>宝贝评分 &nbsp;&nbsp; {{shopinfos.goods_fen ? shopinfos.goods_fen : '0'}}</text>
                    <text>服务评分 &nbsp;&nbsp; {{shopinfos.fw_fen ? shopinfos.fw_fen: '0'}}</text>
                    <text>物流评分 &nbsp;&nbsp; {{shopinfos.wuliu_fen? shopinfos.wuliu_fen: '0'}}</text>
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
                <view style="width:40%;" class="grace-nowrap" v-if="product.is_activity != 3">
                    <view class="icons_bottom" @tap="chat">
                        <!-- <view class="icon_cart iconfont icon_e614" :class="{'iconColor' : product.coll_goods }" ></view> -->
                        <view class="icon_cart iconfont icon-kefu1">&#xe686;</view>
                        <text>客服</text>
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
                <view class="grace-product-btn left-htn"   @click="buyNow(true, '')">加入购物车</view>
                <view class="grace-product-btn right-htn"  @click="buyNow(false, '')">立即购买</view>
            </view>
            <view class="grace-footer grace-footer_fightgroup" style="" v-if="product.is_activity == 3">
                <view style="width:40%;" class="grace-nowrap">
                    <view class="icons_bottom" @tap="chat">
                        <!-- <view class="icon_cart iconfont icon_e614" :class="{'iconColor' : product.coll_goods }" ></view> -->
                        <view class="icon_cart iconfont icon-kefu1">&#xe686;</view>
                        <text>客服</text>
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
                <view class="grace-product-btn left-htn" @click="buyNow(false, 1)">
                    <view>单独购买</view>
                    <text>¥{{ activity_info.dandu_price }}</text>
                </view>
                <view class="grace-product-btn right-htn" :class="[getBtnText === '邀请好友' ? 'right-htn__active' : '' ]"  @click="buyNow(false, 2)">
                    <view>{{ getBtnText }}</view>
                    <text v-if="getBtnText != '邀请好友'">¥{{ product.zs_shop_price }}</text>
                </view>
            </view>
            <!-- 商品属性  start -->
           
            <!-- 商品属性 end -->
        </view>

        <view class="skeleton" v-if="skeleton == 'show'">
            
            <image src="../../static/images/skeleton-img.png"></image>
        </view>
    </view>
</template>

<script>
    import uniNumberBox from '../../components/uni-number-box.vue'
    import graceSwiper from "../../graceUI/components/graceSwiper.vue"
    import uniCountdown from "../../components/uni-countdown.vue"; 

    let shopId = null  // 商品 id
    let arr = []
    let buyNowNum = ''
    //记录用户选择的属性
    let strRadio = []
    var dateObj = new Date();
    
	export default {
        onLoad(option){
            shopId = option.id
            this.goodsId =  option.id
            this.rush_id = option.rush_id
            this.userCartNum = this.$store.state.userCartNum
            this.getgoodsinfoList()
            strRadio = []
        },
		data() {
			return {
                heightImg:'330px',
                datainfo:{
                    uniattr:[]
                },  //商品详情
                swiperItems:[], // 轮播图
                product: '',  // 商品详情
                shopinfos:'',  // 商家店铺
                guige:'',
                couponinfos:'',   // 商品优惠券
                remgoodres:'', // 商家推荐商品
                huodong:'',   // 活动
                sertions:'', // 服务
                radioattr:[],  // 商品属性
                getcouponlst:[], //优惠券列表
                huodonginfo:'',  // 活动促销列表
                serlst:[],  // 商品服务列表
                goodsId:null, // 商品 id
                colores:[], // 商品颜色
                activity_info: '',  // 限时秒杀
				active:1,
				// attrData : null, // attrdata用于记录用户选择的属性
                proNumber: 0,    //  获取库存信息
                buyNum : 1,
                activity_time:{},  // 秒杀时间
                pin_id: '',
                tuan_id: '',
                PopupIndex:0,
                userList: [],
                userCartNum: 0,
                choosePinNum: '',
                isPT: '',
                isJoin: false,
                skeleton:'show',
                valueStatus: 0,  // 更新页面状态 防止页面卡死
			};
        },
        computed: {
            avatarList() {
                if (this.activity_info.assem_type == 1) {
                    if (this.activity_info.zhuangtai === 2) {
                        return {
                            imgs: this.activity_info.member_assem,
                            title: '拼团成功'
                        }
                    }

                    return {
                        imgs: this.activity_info.member_assem,
                        title: '开团后邀请好友组团'
                    }
                }

                if (this.activity_info.assem_type == 2) {
                    return {
                        imgs: this.activity_info.member_assem,
                        title: this.activity_info.member_assem[0].pin_type == 1 ? `欢迎来到${this.activity_info.member_assem[0].user_name}开的团` : '欢迎参团'
                    }
                }

                if (this.activity_info.assem_type == 3) {
                    return {
                        imgs: this.activity_info.member_assem,
                        title: '邀请好友参团'
                    }
                }
            },
            getBtnText() {
                if (this.activity_info.assem_type == 1 && !this.isJoin) {
                    return '发起拼团'
                }

                if (this.activity_info.assem_type == 2 || this.isJoin) {
                    return '立即参团'
                }

                if (this.activity_info.assem_type == 3 && !this.isJoin) {
                    return '邀请好友'
                }
            },
            getPrice() {
                if (this.isPT == 2 || this.isPT == '') {
                    return `￥${this.product.zs_shop_price}`
                } 
                if (this.isPT == 1) {
                    return `￥${this.activity_info.dandu_price}`
                }
            }
        },
        mounted() {
            
            
        },
        onShow(){
            
        },
        watch: {

        },
		methods:{
            closePopup () {
                this.isJoin = false
            },
            join (num) {
                this.isJoin = true
                this.PopupIndex = 5
                this.isPT = 2
                this.choosePinNum = num
                this.$refs.popupRef.show()
            },
            hidePopup(){
                this.isJoin = false
                this.$refs.popupRef.close() // 关闭
                
            },
            // 1 优惠劵  2 活动 3 服务
            async coupon(index){
                
                this.PopupIndex = index
                this.$refs.popupRef.show() // 弹出
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
                let isLogin =  this.getIsLogin() // 判断是否登录
                if(!isLogin) {return false} // 判断是否登录
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
            getgoodsinfoList(){
                this.$loading()
                this.$http.getgoodsinfo({goods_id:shopId, rush_id: this.rush_id}).then(res=>{
                    if(res.status == 200) {
                        this.datainfo = res.data
                        this.swiperItems = res.data.gpres
                        this.product = res.data.goodsinfo
                        this.shopinfos = res.data.shopinfos
                        this.couponinfos = res.data.couponinfos
                        this.huodong = res.data.huodong
                        this.sertions = res.data.sertions
                        this.radioattr  = res.data.radioattr
                        this.proNumber = res.data.pronum
                        this.pin_id = res.data.pin_id
                        this.tuan_id = res.data.tuan_id
                        this.userList = res.data.memberpinres
                        
                        this.remgoodres = res.data.remgoodres
                        this.guige = res.data.guige.join(',')
                        if(res.data.activity_info.length != 0) {
                            this.activity_info = res.data.activity_info
                        }

                        this.colores = res.data.colores.length > 5 ? res.data.colores.slice(0,5): res.data.colores
                        if(res.data.activity_info.end_time) {
                            let str = Number(this.activity_info.end_time) - Number(this.activity_info.dqtime)
                            let  strArr = this.$formatSeconds(str).split('-')
                            this.activity_time = {
                                day: parseInt(strArr[0] / 24),
                                hour: parseInt(strArr[0] % 24),
                                minute: parseInt(strArr[1]),
                                second: parseInt(strArr[2])
                            }
                           
                        } else {
                            this.activity_time = ''
                        }
                        var str = ''
                        if(res.data.goods_attr) {
                            let checkAttr = res.data.goods_attr.split(',')
                            strRadio = res.data.goods_attr.split(',')
                           
                            for(let keys of checkAttr ) {
                                this.radioattr = res.data.radioattr.map(item => {
                                    const item1 = item.map(i => {
                                        if (i.id == keys) {
                                            i.check = 'true'
                                            res.data.guige.forEach((j, index) => {
                                                if (j === i.attr_name) {
                                                    var str1 = res.data.guige.length - 1 === index ? '' : ','
                                                    str = str + j + ':' + i.attr_value + str1
                                                }
                                            })
                                        }

                                        return i
                                    })

                                    return item1
                                })
                            }
                        }
                        this.radioattr = res.data.radioattr.map(item => {
                            const item1 = item.map(i => {
                                if (item.length === 1) {
                                    i.check = 'true'
                                    strRadio.push(i.id)
                                    this.guige = `${this.guige}:${i.attr_value}`
                                }

                                return i
                            })

                            return item1
                        })
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
                        /**
                         * 更新页面状态 防止页面卡死
                         */
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
			
			buyNow : function(type, status){
                if (this.getBtnText === '邀请好友' && type !== 'guige' && status === 2) {
                    this.getnav(`/pages/homeSon/invite?pin_id=${this.pin_id}&tuan_id=${this.tuan_id}`)

                    return false
                }

                if (type === 'guige' && this.product.is_activity == 3) return
                // if (this.datainfo.goodsinfo.is_activity === 3) return
                this.PopupIndex = 5
                this.isPT = status
                this.$refs.popupRef.show() // 弹出
                buyNowNum = type  // true加入购物车，  false直接购买b
                
            },
            submitOrder (status, type) {
                if (this.getBtnText === '邀请好友' && type !== 'guige' && type === 2) {
                    this.getnav(`/pages/homeSon/invite?pin_id=${this.pin_id}&tuan_id=${this.tuan_id}`)

                    return false
                }
                if (buyNowNum) {
                    this.attrSubmit(type)
                } else {
                 buyNowNum = status
                 this.attrSubmit(type)
                }
            },
			// 确认属性
			attrSubmit : function(type){
                let isLogin =   this.getIsLogin() // 判断是否登录
                if(!isLogin) {return false} // 判断是否登录
                //后续操作
                let data = {}
                if (this.getBtnText === '立即参团') {
                    data = {
                        goods_id: shopId,
                        goods_attr:strRadio.join(','),
                        num: this.buyNum,
                        fangshi: 2,
                        pin_number: this.choosePinNum
                    }
                } else {
                    data = {
                        goods_id:shopId,
                        goods_attr:strRadio.join(','),
                        num:this.buyNum,
                        fangshi: type
                    }
                }
                this.$loading()
				if(buyNowNum ) {
                    this.$http.getaddcart(data).then(res=>{
                        if(res.status == 200) {
                            this.$toast(res.mess)
                            //关闭
                            this.$store.dispatch('contentnum')
                            this.$refs.popupRef.close() // 关闭

                            setTimeout(()=>{
                                this.userCartNum = this.$store.state.userCartNum
                            },800)
                        }
                    })
                } else {
                    this.$http.getpurbuy(data).then(res=>{
                        if(res.status == 200) {
                            this.getnav(`/pages/homeSon/ConfirmationOrder?pur_id=${res.data.pur_id}&type=1&fangshi=${res.data.fangshi}&pin_number=${res.data.pin_number}`)
                        }
                    })
                    
                }
                
                
			},
			closeAttr : function(){
                this.isJoin = false
				this.$refs.popupRef.close() // 关闭
			},

			typeChange: function (checkVal,key) {
                let radioObaject = this.radioattr
                strRadio = []

                let guigearr = []
                for(let keys in radioObaject ) {
                    if(key == keys) {
                        for(var i=0; i < radioObaject[keys].length; i++) {
                            if (radioObaject[keys][i].id == checkVal && radioObaject[keys][i].attr_pic) {
                                this.$set(this.product, 'thumb_url', radioObaject[keys][i].attr_pic)
                            }
                            if(radioObaject[keys][i].id == checkVal) {
                                radioObaject[keys][i].check = 'true'
                                if(!guigearr.includes(radioObaject[keys][i].attr_name+ ":" + radioObaject[keys][i].attr_value)) {
                                    guigearr.push(radioObaject[keys][i].attr_name+ ":" + radioObaject[keys][i].attr_value)
                                }
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

                           if(!guigearr.includes(radioObaject[keys2][i].attr_name + ":" +radioObaject[keys2][i].attr_value)) {
                                guigearr.push(radioObaject[keys2][i].attr_name + ":" +radioObaject[keys2][i].attr_value)
                            }
                        } 
                    }  
                }

                if(Object.keys(radioObaject).length == strRadio.length) {
                    const apiName = this.isPT == 1 || (this.isPT == 2 && this.product.is_activity === 3) || (this.isPT == '' && this.product.is_activity === 3) ? 'getpingoodsPrice' : 'getgoodsPrice'
                    this.$http[apiName]({goods_attr:strRadio.join(','),goods_id:shopId, fangshi: this.isPT != 1 && this.product.is_activity == 3 ? 2 : 1}).then(res=>{
                        if(res.status == 200) {
                            this.proNumber = res.data.attrinfos.goods_number
                            this.pin_id = res.data.pin_id
                            this.tuan_id = res.data.tuan_id
                            this.guige = guigearr.join(',')
                            this.isJoin = false
                            this.userList = res.data.memberpinres
                            if(res.data.activity_info.length != 0) {
                                this.activity_info = res.data.activity_info
                            }
                            this.buyNum = 1
                            if ((res.data.fangshi != 1 && this.isPT != 1) || !this.isPT || this.isPT == 2 &&　res.data.fangshi == 1) {
                                this.product.is_activity = res.data.attrinfos.is_activity
                            }
                            // this.$set
                            this.product.goods_name = res.data.attrinfos.goods_name
                            this.product.zs_shop_price = res.data.attrinfos.zs_shop_price
                            this.product.thumb_url = res.data.attrinfos.attr_pic ?res.data.attrinfos.attr_pic:this.product.thumb_url      
                            
                            if(res.data.activity_info.end_time) {
                                let str = Number(this.activity_info.end_time) - Number(this.activity_info.dqtime)
                                let  strArr = this.$formatSeconds(str).split('-')
                                
                                this.activity_time = {
                                    day: parseInt(strArr[0] / 24),
                                    hour:strArr[0] % 24,
                                    minute:strArr[1],
                                    second:strArr[2]
                                }
                            
                            } else {
                                this.activity_time = ''
                            }
                        }
                    })
                }
				// this.radioattr = this.radioattr;
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
            chat () {
                if (!uni.getStorageSync('token')) {
                    this.getnav('/pages/loginSon/login')

                    return false
                }

                this.getnav('/pages/businessSon/chat?toId=' + this.datainfo.goodsinfo.shop_token)
            },
            // 收藏
            home(){
                let isLogin =  this.getIsLogin() // 判断是否登录
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
            uniCountdown
		}
	}
</script>

<style lang="less">
.pt-tip {
    display: block;
    line-height: 60upx;
    text-align: center;
    padding: 0 0.1rem;
    color: #fff;
    background: #000;
}
.select {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.select-items {
    display: flex;
    padding: 5upx 20upx;
    background-color: #f4f4f4;
    align-items: center;
    margin-right: 15upx;
    border-radius: 10upx;
    border: 1upx solid #f4f4f4;
    .img {
        height: 60upx;
        width: 60upx;
        margin-right: 10upx;
        padding: 10upx;

    }
}
.grace-product-attr-info {
    .title {
        text {
            font-size: 26upx;
        }
    }
}
.index_class .grace-footer_fightgroup .right-htn__active {
    line-height: 90upx!important;
}
.grace-product-attr {
    height: 80vh!important;
    position: absolute!important;
}
.grace-mask {
    position: relative!important;
}
.uni-countdown__splitor {
    color: #000;
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
.entershop-wrap {
    width: 100%;
    display: flex;
    align-items: center;
}

.entershop-wrap > image {
    border-radius: 50%;
    margin-right: 10upx;
}

.entershop-wrap .entershop-middle {
    flex: 1;
}

// 拼团
.fight-group {
    display: flex;
    align-items: center;
    padding: 0 24upx;
    height: 87upx;
    background:#FA3F3F;
    color: #fff;
    font-size: 28upx;
}

.fight-group__left {
    margin-right: 20upx;
    font-size: 30upx;

    i {
        font-size: 46upx;
    }
}

.fight-group__middle {
    flex: 1;

    .fight-group__middle--top {
        margin-bottom: 6upx;
        font-size: 24upx;    
    }
    .fight-group__middle--bottom {
        display: inline-block;
        height: 34upx;
        line-height: 34upx;
        padding: 0 14upx;
        text-decoration: line-through;
        background: #FA3F3F;
    }
}

.fight-group__step {
    height: 522upx;
    margin-top: 20upx;
    padding: 32upx 0 50upx 0;
    background: #fff;
}
.fight-group__step--header {
    display: flex;
    align-items: center;
    margin-bottom: 40upx;
    padding: 0 24upx;
    color: #999;
    font-size: 26upx;

    .middle {
        flex: 1;
        padding-left: 36upx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.fight-group__step--middle {
    margin-bottom: 69upx;
    color: #999999;
    font-size: 28upx;
    text-align: center;

    image {
        position: relative;
        width: 104upx;
        height: 104upx;
        margin-bottom: 24upx;
        border-radius: 50%;
    }

    .user-active:after {
        display: block;
        position: absolute;
        bottom: 0upx;
        left: 50%;
        transform: translateX(-50%);
        content: '团长';
        color: #fff;
        padding: 4upx 2upx;
        text-align: center;
        background: #FA3F3F;
        font-size: 22upx;
    }
}

.fight-group__step--list {
    display: flex;
    .step-item__active {
        color: #FA3F3F!important;
    }

    .fight-group__step--item {
        flex: 1;
        color: #999999;
        font-size: 24upx;
        text-align: center;

        &:last-child image::after {
            display: none;
        }
        image {
            position: relative;
            z-index: 1;
            width: 40upx;
            height: 40upx;
            overflow: inherit!important;
            margin-bottom: 24upx;

            &::after {
                position: absolute;
                left: 40upx;
                top: 50%;
                width: 239upx;
                height: 2upx;
                background: #E8E8E8;
                content: '';
                transform: translateY(-50%);
            }
        }
        text {
            display: block;
        }
    }
}

.grace-footer_fightgroup {
    height: 136upx;

    .left-htn {
        height: 136upx;
        line-height: 1;
        background: #FA3F3F!important;
        view {
            padding: 26upx 0 18upx 0;
        }
    }

    .right-htn {
        height: 136upx!important;
        line-height: 1;
        background: #FF5959!important;
        view {
            padding: 26upx 0 18upx 0;
        }
    }
}

.tag-name {
    display: inline-block;
    font-size: 22upx;
    border: 1upx solid #FA3F3F; 
    width: 59upx;
    height: 29upx;
    line-height: 29upx;
    margin-left: 10upx;
    text-align: center;
    border-radius: 4upx;
    color: #FA3F3F!important;
}

.fight-group__list {
    display: flex;
    align-items: center;
    height: 98upx;
    padding: 0 30upx;

    .fight-group__list--middle {
        flex: 1;
        padding: 0 10 0 20upx;
        color: #999;
        font-size: 24upx;
        
        h2 {
            margin-bottom: 10upx; 
            font-size: 30upx;
            color: #333;
        }
    }

    image {
        width: 88upx;
        height: 88upx;
        margin-right: 20upx;
        border-radius: 50%;
    }


    .fight-group__list--item {
        font-size: 28upx;
        color: #fff;
        width: 150upx;
        height: 58upx;
        line-height: 58upx;
        text-align: center;
        border-radius: 30upx;
        background: #FA3F3F;
    }
}
</style>
