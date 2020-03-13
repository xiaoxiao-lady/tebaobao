<template>
    <view class="index_class">
        <view class="header-filter"> 
            <view class="items " @click="clickactive(1)"  :class="{'filter-active' : coponIndex == 1}" >可使用</view>
            <view class="items"  @click="clickactive(2)" :class="{'filter-active' : coponIndex == 2}">已过期</view>
        </view>

        <view class="coupon-silder">
            <view class="silder-list" v-for="(item,index) in coponList" :key="index">
               <view class="silder-shop">
                    <view class="left">
                        <image :src="item.length ? item[0].logo : ''" />
                        <text>{{ item.length ? item[0].shop_name : '' }}</text>
                    </view>
                    <view class="text" @click="getnav(`/pages/homeSon/storeDetails?shop_id=${item.length ? item[0].shop_id : ''}`)">进店</view>
               </view>
               <view class="silder-copon" v-for="(conlist,index2) in item" :key="index2">
                   <view class="item-left">
                       <image :src="conlist.logo" />
                       <view class="copon-cont">
                           <view> <text class="money">¥{{conlist.dec_price}}</text> 满{{conlist.man_price}}减{{conlist.dec_price}}</view>
                           <view style="font-size:24upx">店铺优惠券</view>
                           <view>{{conlist.start_time}}至{{conlist.end_time}}</view>
                       </view>
                   </view>
                   <view class="copon-text" @click="getnav('/pages/homeSon/storeDetails?shop_id='+ conlist.shop_id)"  v-if="conlist.filter == 1">去使用</view>
                   <view class="copon-text" @click="getnav('/pages/homeSon/storeDetails?shop_id='+ conlist.shop_id)" style="background-color:#ccc" v-if="conlist.filter == 2">已过期</view>
               </view>
            </view>

        </view>

        <loadMore :loadingType="loadingType"></loadMore>
    </view>
    
</template>

<script>
let page = 1
export default {
    data(){
        return {
            coponIndex: 1,
            coponList:[],
            loadingType:0
        }
    },
    onShow(){
        
    },
    created() {
        this.getcouponlstshop()
    },
    onReachBottom:function(){
        // 上拉加载更多
        if(this.loadingType == 1 || this.loadingType == 2) { return false }
        this.loadingType = 1

        page++
        this.getcouponlstshop()
	},
    methods: {
        getcouponlstshop(){
            this.$http.getcouponlstshop({filter:this.coponIndex,page:page}).then(res=>{
                if(res.status == 200) {
                    if(res.data.length == 0) {
                        this.loadingType = 2
                        return false
                    }
                    this.coponList = [...this.coponList,...res.data]
                    this.loadingType = 0
                }
            })
        },
        clickactive(i) {
            if(this.coponIndex == i) return false
            this.coponIndex = i
            page = 1
            this.coponList = []
            this.getcouponlstshop()
        }
    },
}
</script>

<style scope>
.header-filter {
    width: 100%;
    position: fixed!important;
    padding: 0 170upx!important;
}
.silder-list {
    padding: 0 30upx;
}
</style>
