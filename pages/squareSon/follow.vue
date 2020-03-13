<template>
    <view class="index_class">
        <view class="bus-top">
			<view class="status"></view>
			<view class="to-tltle">
                <i class="iconfont icon_e675 back" @click="getback()"></i>
				我的关注
				<!-- <text class="delete">发布动态</text> -->
			</view >
			<!-- <view class="bus-title-search">
				<view class="bus-search">
					<i class="icon iconfont icon_e819"></i>
					<input placeholder="请输入关键词搜索" />
					<view class="bus-tap">搜索</view>
				</view>
			</view> -->
	
		</view>
        <view class="myFollow">
            <!--  app 端状态栏站位 -->
			<view class="status-active"></view> 
            <view class="seg-top" @click="getnav('/pages/squareSon/Personal')" v-for="(item2,index) in myfollow2" :key="index"> 
                <view class="seg-left" >
                    <image :src="item2.headimgurl" />
                    <view>
                        <text>{{item2.user_name}}</text>
                        <text class="datatime">{{item2.summary ? item.summary: ''}}</text>
                    </view>
                </view>
                <!-- <view class="follow">关注</view> -->
            </view>

        </view>
    </view>
</template>
<script>
export default {
    dsta(){
        return {
            myfollow2:''
        }
    },
    onShow(){
        this.getmyfollowlist()
    },
    methods: {
        getmyfollowlist(){
            this.$http.getmyfollow().then(res=>{
                if(res.status == 200) {
                    this.myfollow2 = res.data.data
                    console.log(this.myfollow2)
                }
            })
        }
    },
}
</script>
<style lang="">
    
</style>