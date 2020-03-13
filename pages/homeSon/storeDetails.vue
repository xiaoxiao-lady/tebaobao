<template>
    <view class="index_class">
       
        <view class="bus-top">
			<view class="status"></view>
			<view class="to-tltle">
                <i class="iconfont icon_e675 back" @click="getback()"></i>
				<view class="shop-search" >
                    <i class="icon iconfont icon_e819"></i>
					<input placeholder="请输入关键词搜索" />
					<view class="bus-tap">搜索</view>
                </view>
				<view class="delete">
                    <i class="iconfont icon_e64c" @click="getnav('/pages/homeSon/shopfilter?shop_id=' +shops.id)"> </i>
                </view>
			</view>

		</view>
        <view class="store-content" v-if="shops">
            <view class="coupon">
                <view class="pos-coupon" >
                    <view class="cou-top">
                        <view class="left" @click="getnav('/pages/homeSon/shopintroduce?shop_id=' + shopId)">
                            <image :src="shops.logo" />
                            <view>
                                <text class="text">{{shops.shop_name}}</text>
                                <view class="title">
                                    <text>品牌直营</text>
                                    好评:{{shops.praise_lv}} | 成交量{{shops.deal_num}}
                                </view>
                            </view>
                        </view>
                        <view class="right" @tap="clickcoll">
                            <i class="iconfont icon_e646" :class="{'iconColor' : shops.coll_shops}"></i>
                            <view> {{shops.coll_shops == 0? '收藏' : '已收藏'}}</view>
                        </view>
                    </view>   
                    <view class="cou-btn">
                        <view class="btn-box" v-for="(time,index) in couponres" :key="index" @click="lingqu(time)">
                            <view >
                                ￥{{time.dec_price}}
                               满￥{{time.man_price}}可用
                            </view>
                            <text>
                                {{time.start_time}}至{{time.end_time}}
                            </text>
                            <image v-if="time.have == 1" class="pos-top-img" src="/static/images/img/lingjuan.png"></image>
                        </view>
                    </view>  
                </view>
            </view>

            <view class="promot" @click="getnav(`/pages/homeSon/huodongDate?shop_id=${shops.id}&prom_id=${time.id}&goods_id=${time.goods_id}`)" v-for="(time,index2) in promotionres" :key="index2">
                <image :src="time.pic_url"  />
            </view>

            <view class="type-fliter" v-if="cxgoodres.length" >
                <view style="padding: 15upx 20upx;font-size:30upx;">今日必抢</view>
                <view class="r-list">
                    <view class="r-items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/shop_details?id='+item.id)" v-for="(item, index) in cxgoodres" :key="index">
                        <image :src="item.thumb_url" />
                        <text style="text-align:left">{{ item.goods_name }}</text>
                        <view class="r-money">
                            <text>¥{{ item.zs_price }}</text>
                            
                        </view>
                        <view class="r-bottom">
                            <image v-if="item.coupon" src="../../static/images/img/juan.png" />
                            <text v-if="item.is_activity === 1">秒杀</text>
                            <text v-if="item.is_activity === 2">团购</text>
                            <text v-if="item.leixing === 1">自营</text>
                        </view>
                    </view>					
                </view>
                
               
            </view>
            <view class="header-filter" :class="{'header-filter-active':position}">
				<view @click="searchIndex(1,'zonghe')" class="items " :class="[showIndex == 1? 'filter-active' : '']">综合排序</view>
				<view @click="searchIndex(2,'deal_num')" class="items" :class="[showIndex == 2? 'filter-active' : '']">销量优先</view>
                 <view @click="searchIndex(3,'praise_lv')" class="items money_al" :class="[showIndex === 3?'filter-active':'']"  >
					<text>价格</text>
					<view class="over">
							<i class="iconfont icon_eb15" :class="{'ac-color': filteAl === 1}"></i>
							<i class="iconfont icon_eb14" :class="{'ac-color': filteAl === 2}" ></i>
					</view>
				</view>
				<view @click="searchIndex(4,'new')" class="items" :class="[showIndex == 4? 'filter-active' : '']">新品</view>
               
                <view @click="getnav('/pages/homeSon/shopfilter?shop_id=' +shops.id)">分类</view>
				
			</view>

            <view class="type-fliter">
                <view class="r-list">
                    <view class="r-items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/shop_details?id='+item.id)" v-for="(item, index) in goodres" :key="index">
                        <image :src="item.thumb_url" />
                        <text style="text-align:left">{{ item.goods_name }}</text>
                        <view class="r-money">
                            <text>¥{{ item.zs_price }}</text>
                            
                        </view>
                        <view class="r-bottom">
                            <image v-if="item.coupon" src="../../static/images/img/juan.png" />
                            <text v-if="item.is_activity === 1">秒杀</text>
                            <text v-if="item.is_activity === 2">团购</text>
                        </view>
                    </view>					
                </view>
                <view class="depot" v-if="goodres.length == 0">
                    <image class="img" src="../../static/images/img/cartinfo.png" />
                    <view class="tps" style="margin-top:15upx;">暂无商品</view>
                    <!-- <view class="stroll" @click="getnav('/pages/homeSon/classification')">到处逛逛</view> -->
                </view>
                <!-- <loadMore :loadingType="loadingStatus"></loadMore> -->
            </view>
            <loadMore :loadingType="loadingType" ></loadMore>
            
        </view>    
    </view>
</template>

<script>
// let filterTop = '' // header-filter  元素距离页面顶部的距离
let  statusBarHeight = 0
let dataObj = {
    shop_id:'',
    // shcate_id:'',
    sort:'zonghe',
    page: 1
}
export default {
    onLoad(option){
        console.log(option)
        dataObj.page = 1
        dataObj.shop_id = option.shop_id
        this.shopId = option.shop_id
        this.$loading()
        this.getallgoods(dataObj)
        this.getshopinfo()
       
    },
    onShow(){
        if(!this.filterTop) {
            setTimeout(res=>{
                let view = uni.createSelectorQuery().select(".header-filter");
                view.boundingClientRect(data => {
                    this.filterTop = data.top
                }).exec();
                // #ifdef APP-PLUS
                uni.getSystemInfo({
                    success:function(res){
                    statusBarHeight = res.statusBarHeight
                    }
                })
                // #endif
            },800)
        }  
    },
    /**
     * 监听页面滚动生命周期
     */
    onPageScroll(op_time){
       
        if(op_time.scrollTop > this.filterTop - 100 - statusBarHeight) {
            this.position = true
        } else {
            this.position = false
        }
    },
    data() {
        return {
            loadingType: 0, // 分页
            showIndex:1,
            // fabShow:true,
            cxgoodres:[],  // 今日必抢
            shops: '', // 商家信息
            couponres:[], // 商家优惠信息
            promotionres:[], // 商家活动推广图片
            goodres:[], // 全部商品
            showPopupBottom: false,
            position: false,
            filteAl: 0,
            valueStatus: 0,  // 更新页面状态 防止页面卡死
            filterTop:'',
            shopId: ''

        }
    },
    watch: {
        showPopupBottom(){
            /**
             * 更新页面状态 防止页面卡死
             */
            
            this.statusMath(this)
        }
    },
    onReachBottom:function(){
        // 上拉加载更多
        if(this.loadingType == 1 || this.loadingType == 2) { return false }
        this.loadingType = 1
        
        dataObj.page++
		this.getallgoods(dataObj)
	},
    methods: {
        lingqu(datatime) {
            // 领取优惠券
            if(datatime.have == 0) {
                this.$loading()
                this.$http.getcoupons({
                    coupon_id:datatime.id,
                    shop_id:datatime.shop_id
                }).then(res=>{
                    if(res.status == 200) {
                        this.$toast(res.mess)
                        this.couponres.forEach((element,index) => {
                            if(element.id == datatime.id) {
                                element.have = 1
                            }
                        });
                    }
                })
            }
        },
        searchIndex(index,str){
            this.showIndex = index
            dataObj.sort = str
            dataObj.page = 1
            this.loadingType = 0

            if (index === 3) {
                if (this.filteAl === 1) {
                    this.filteAl = 2
                    dataObj.sort = 'height_low'
                } else {
                    this.filteAl = 1
                    dataObj.sort = 'low_height'
                }
            }
            this.getallgoods(dataObj)
        },
        /**
         * 获取商家商品列表
         */
        getallgoods(data){
            this.$http.getallgoods(data).then(res=>{
                if(res.status == 200) {

                    if(dataObj.page > 1) {
                        if(res.data.length == 0) { 
                            this.loadingType = 2 
                            return false
                        }
                        this.goodres = [...this.goodres,...res.data] 
                        this.loadingType = 0 

                        return false
                    }
                     
                    this.goodres = res.data
                    this.statusMath(this)
                }
            })
        },

        /**
         * 获取商家信息接口
         */
        getshopinfo(){
            
            this.$http.getshopinfo({shop_id:dataObj.shop_id}).then(res=>{
                if(res.status == 200) {
                    this.shops = res.data.shops
                    this.couponres = res.data.couponres
                    this.promotionres = res.data.promotionres
                    this.cxgoodres = res.data.cxgoodres
                }
            })
        },

        /**
         * 收藏
         */
        clickcoll(){
            if(!uni.getStorageSync('token')) {
                uni.redirectTo({
                    url: '/pages/loginSon/login?islogin=' + 0
                });
                return false
            }

            if(this.shops.coll_shops == 1) {
                // 取消收藏
                this.$loading()
                this.$http.getshopcancelcoll({shop_id:dataObj.shop_id}).then(res=>{
                    if(res.status == 200) {
                        this.$toast(res.mess)
                        this.shops.coll_shops = 0
                    }
                })
            } else {
                 //收藏商家
                 this.$loading()
                this.$http.getshopcoll({shop_id:dataObj.shop_id}).then(res=>{
                    if(res.status == 200) {
                        this.$toast(res.mess)
                        this.shops.coll_shops = 1
                    }
                })
            }
            

        }
    },
    
}
</script>

<style scope lang="less">
.promot {
    width: 100%;
    height:380upx;
    image {
        width: 100%;
        height: 100%;
    }
}
.index_class {
    background-color: #fff!important;
}
.type-fliter,.header-filter {
    position: relative!important;
}
.header-filter-active {
    position: fixed!important;
    width: 100%;
    left: 0;
    top: 100upx;
    z-index: 9;
    /*  #ifdef  APP-PLUS  */
    top: calc(44px + var(--status-bar-height));
    /*  #endif  */
}
.shop-search {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 93upx;
    height: 60upx;
    width: 550upx;
    background-color: #EEEFEF;
    border-radius: 30upx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .iconfont {
        height: 60upx;
        line-height: 60upx;
        width: 60upx;
        text-align: center;
        color: #999;
    }
    .bus-tap {
        height: 60upx; 
        line-height: 60upx;
        width: 100upx;
        text-align: center;
        color: #333333;
    }
    input {
        flex: 1;
        color: #999;
        text-align: left;
    }
}
.delete {
    display: flex;
    align-items: center;
    
    // .share {
    //     display: inline-block;
    //     position: relative;
    //     >i {
    //          width: 15upx;
    //     } 
    //     .share-fab {
    //         position: absolute;
    //         width: 166upx;
    //         // height: 530upx;
    //         background: rgba(0,0,0,0.9);
    //         border-radius: 10upx;
    //         top: 100upx;
    //         right: -10upx;
            
    //         &::before {
    //             position: absolute;
    //             content:'';
    //             display: block;
    //             height: 15upx;
    //             width: 15upx;
    //             background-color: rgba(0,0,0,0.9);
    //             top: -5upx;
    //             right: 20upx;
    //             transform: rotateZ(45deg);
    //         }
    //         .fab-list {
    //             position: relative;
    //             height: 88upx;
    //             width: 100;
    //             font-size: 30upx;
    //             color: #D2D2D2;
    //             border-bottom: 1upx solid rgba(216,216,216,0.2);
    //             z-index: 9;
    //             i {
    //                 margin-right: 10upx;
    //             }
    //         }
    //     }
    // }
    
    .icon_e64c {
        font-size: 50upx;
    }
}

</style>
