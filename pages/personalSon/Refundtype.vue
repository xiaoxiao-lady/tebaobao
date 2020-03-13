<template>
    <view class="index_class">
        <view class="refun-type">
            <image :src="orgoods.thumb_url" />
            <view class="refun-text">
                <view>{{orgoods.goods_name}}</view>
                <text>{{orgoods.goods_attr_str}}</text>
                <text class="color">￥{{orgoods.price}} x {{orgoods.goods_num}}</text>
            </view>
        </view>
        <view class="comp-list" @click="getnav(`/pages/personalSon/RefundDate?th_cate=${item.id}&orgoods_id=${orgoods.id}&order_num=${orgoods.ordernumber}`)" v-for="(item,index) in type" :key="index">
            <view>
                <view class="comp-title">{{item.cate_name}}</view>
                <text>{{item.desc}}</text>
            </view>
            <i class="iconfont icon_e60c"></i>
        </view>
        

    </view>
</template>

<script>
let pageAgur = ''
export default {
    onLoad(option){
        if(option) {
            pageAgur = option
            this.getthtypeShop(pageAgur)
        }
        console.log(option)
       
    },
        
    data(){
        return {
            orgoods:'',
            type:[]
        }
    },

    methods: {
        getthtypeShop(data){
            this.$http.getthtypeShop(data).then(res=>{
                if(res.status == 200) {
                    this.orgoods = res.data.orgoods
                    this.type = res.data.type
                }
            })
        }
    },
}
</script>

<style>

</style>
