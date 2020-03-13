<template>
    <view class="index_class">
        <view class="header-filter" >
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
            <view @click="getback">分类</view>
            
        </view>

        <view class="type-fliter">
            <view class="r-list" style="padding-top:88upx;">
                <view class="r-items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/shop_details?id='+item.id)" v-for="(item, index) in goodsList" :key="index">
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

            <view class="depot" v-if="isshow">
				<image class="img" src="../../static/images/img/cartinfo.png" />
				<view class="tps" style="margin-top:15upx;">暂无商品</view>
				<!-- <view class="stroll" @click="getnav('/pages/homeSon/classification')">到处逛逛</view> -->
			</view>
            <loadMore :loadingType="loadingType"></loadMore>
        </view>
    </view>
</template>

<script>
let dataObj = {}
export default {
    onLoad(option){
        console.log(option)
        dataObj = {
            ...option,
            sort:'zonghe',
            page:1
        }
        this.getallgoods(dataObj)
    },
    data(){
        return {
            loadingType:0,
            showIndex:1,
            filteAl: 0,
            goodsList:[],
            isshow:false
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
        searchIndex(index,str){
            this.showIndex = index
            dataObj.sort = str
            dataObj.page = 1
            this.goodsList = []
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
             this.$loading()
            this.getallgoods(dataObj)
           
        },
        getallgoods(data){
            this.$http.getallgoods(data).then(res=>{
                if(res.status == 200) {
                        
                        if(res.data.length == 0) { 
                            if(this.goodsList.length == 0) {
                                this.isshow = true
                            }
                            this.loadingType = 2 
                            return false
                        }
                        this.goodsList = [...this.goodsList,...res.data] 
                        this.loadingType = 0 
                        if(this.goodsList.length == 0) {
                            this.isshow = true
                        }

                }
            })
        }
    },
}
</script>

<style scope>
.header-filter {
    position: fixed!important;
    width: 100%;
    z-index: 999;
}
</style>
