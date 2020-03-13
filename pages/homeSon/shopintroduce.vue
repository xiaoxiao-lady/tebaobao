<template>
    <view class="index_class" v-if="shopinfo">
       <view class="intro-list">
           <view class="int-left">
               <view class="l-text">
                   <image :src="shopinfo.logo" />
                   <view >
                       <view class="title">{{shopinfo.shop_name}}</view>
                        好评率:{{shopinfo.praise_lv}}
                   </view>
               </view>
               <view class="shop-icon">
                   <!-- <i class="iconfont icon_e646"></i> -->
                   
               </view>
           </view>
           <view class="inttype">{{shopinfo.shop_desc}}</view>
       </view>
       <view class="intro-list display-flex" >
           <text>好评</text>
            
            {{shopinfo.praise_lv}}%
       </view>
       <view class="intro-list evaluate" >
           <view>
                <text>宝贝评分</text>
                <view style="color:#FA3F3F">{{shopinfo.goods_fen}} </view>
           </view>
           <view>
                <text>服务态度</text>
                <view style="color:#4D9DF0">{{shopinfo.fw_fen}}  </view>
           </view>
           <view>
                <text>物流速度</text>
                <view style="color:#999999">{{shopinfo.wuliu_fen}}  </view>
           </view>
       </view>
        <view class="intro-list display-flex" >
           <text>店铺名称</text>
            {{shopinfo.shop_name}}
       </view>
       <view class="intro-list display-flex" >
           <text>营业执照</text>
            <view class="license">
                <image :src="shopinfo" />
                <i class="iconfont icon_e60c"></i>
            </view>
       </view>
    </view>    
</template>

<script>
let shop_id = '' //商家id
export default {
    onShow(){
        // this.getshops()
    },
    onLoad(option ) {
        if(option.shop_id) {
            shop_id = option.shop_id
        }
        this.getshops()
    },
    data(){
        return {
            shopinfo:''
        }
    },

    methods: {
        getshops(){
            this.$http.getshops({shop_id}).then(res=>{
                if(res.status == 200) {
                    this.shopinfo = res.data
                }
            })
        }
    },
}
</script>

<style>
 page {
     height: 100%;
     background-color: #F4F4F4;
     
 }
</style>
