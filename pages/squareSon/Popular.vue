<template>
    <view class="index_class">
        <view class="pop-conent">
            <!--  app 端状态栏站位 -->
			<view class="status-active"></view> 
            <view class="pop-box">
                <view class="pop-item" hover-class="click-active-bgc" v-for="(time,index) in hottalkList" :key="index" @click="getnav('/pages/squareSon/Catcher?mid=' + time.mid)">
                    <image :src="time.pathurl" />
                    <view class="pop-right">
                        <view class="pop-title">{{time.user_name}}</view>
                        <view class="pop-time">{{time.createtime}}</view>
                        <view class="pop-text">{{time.describe}}</view>
                    </view>
                </view>
                
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return {
            hottalkList:[]
        }
    },
    onShow(){
        this.gethottalk()
    },
    methods: {
        gethottalk(){
            this.$http.gethottalk().then(res=>{
                if(res.status === 200) {
                    this.hottalkList = res.data.data
                }
            })
        }
    },
}
</script>

<style>

</style>
