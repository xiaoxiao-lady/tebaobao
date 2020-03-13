<template>
    <view class="index_class">
        <view class="myrecord" hover-class="click-active-bgc" v-for="(item,index) in recordList" :key="index" @click="getnav('/pages/moneyCartSon/Presentationdetails?tx_id=' + item.id)">
            <view>
                <view class="title" v-if="item.checked == 0">待审核</view>
                <view class="title" v-if="item.checked == 1">审核通过</view>
                <view class="title" v-if="item.checked == 2">审核未通过</view>
                <view>{{item.time}}</view>
            </view>
            <view class="color">{{item.price}}￥</view>
        </view>
      <loadMore :loadingType="loadingType"></loadMore> 
    </view>
</template>

<script>
let page = 1
export default {
    onLoad(){
        page = 1
        this.getTxmxlist()
    },
    data(){
        return {
            recordList:[],
            loadingType:0
        }
    },
    onReachBottom:function(){
        // 上拉加载更多
        if(this.loadingType == 1 || this.loadingType == 2) { return false }
        this.loadingType = 1

        page++
        this.getTxmxlist()
	},
    methods: {
        getTxmxlist(){
            this.$http.getTxmxlist({page:page}).then(res=>{
                if(res.status == 200) {
                    if(res.data.length == 0) {
                        this.loadingType = 2
                    }
                    this.recordList = [...this.recordList,...res.data]
                    this.loadingType = 0
                }
            })
        }
    },
}
</script>

<style>

</style>
