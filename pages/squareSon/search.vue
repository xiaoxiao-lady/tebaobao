<template>
    <view class="index_class">
        <view class="tag-box">
            <view @click="check(item.cate_id)" class="tag-item" v-for="(item,index ) in goodsList" :key="index">{{item.goods_name}}</view>

        </view>
        <view v-if="goodsList.length == 0">
            <view style="padding:20upx 0; text-align:center; color:#999">
                没有更多商品
            </view>
        </view>
    </view>
</template>

<script>
export default {
    onShow(){
        this.getgoodsList()
    },
    data(){
        return {
            goodsList: []
        }
    },
    methods: {
        getgoodsList(){
            this.$http.getgoodsList().then(res=>{
                if(res.status == 200) {
                    this.goodsList = res.data
                }
            })
        },
        
    },
}
</script>

<style>

</style>
