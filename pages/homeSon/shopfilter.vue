<template>
    <view class="index_class">
        <view >
            <view class="shoptype-list" v-for="(time,keys) in shopType" :key="keys" >
                <view class="list-title">
                    {{time.cate_name}}
                    <text v-if="time.pid === 0" @click="getnav(`/pages/homeSon/shopGoods?shcate_id=${time.id}&shop_id=${shop_id}`)">查看全部</text>
                </view>

                <view class="type" >
                    <view @click="getnav(`/pages/homeSon/shopGoods?shcate_id=${shoplist.id}&shop_id=${shop_id}` )" v-for="(shoplist,index) in time.twocate" :key="index">{{shoplist.cate_name}}</view>
                </view>
            </view>
        </view>
        
        <view v-if="shopType.length == 0" >
            <View style="padding: 20upx 0; text-align:center; color:#999;">
                没有更多分类了
            </View>
            
        </view>
        
    </view>
</template>

<script>

export default {
    onLoad(option){
        if(option.shop_id) {
            this.shop_id = option.shop_id
        }
        this.getshopcates()
    },
    data(){
        return {
            shopType:[],
            shop_id:15
        }
    },
    methods: {
        getshopcates(){
            this.$http.getshopcates({shop_id:this.shop_id}).then(res=>{
                if(res.status == 200) {
                    this.shopType = res.data.cateres
                }
            })
        }
    },
}
</script>

<style>

</style>
