<template>
    <view class="index_class">
       
        <view class="bus-top">
			<view class="status"></view>
			<view class="to-tltle">
                <i class="iconfont icon_e675 back" @click="getback()"></i>
				<view class="shop-search" >
                    <i class="icon iconfont icon_e819"></i>
					<input placeholder="请输入关键词搜索"  v-model="searchKey" />
					<view class="bus-tap" @click="searchchGoods()">搜索</view>
                </view>
				<!-- <text class="delete">发布动态</text> -->
			</view>
			<!-- <view class="bus-title-search">
				<view class="bus-search">
					<i class="icon iconfont icon_e819"></i>
					<input placeholder="请输入关键词搜索" />
					<view class="bus-tap">搜索</view>
				</view>
			</view> -->
			<view class="header-filter">
				<view @click="search_id = 1" :class="['items' ,search_id === 1? 'filter-active':'']" >商品</view>
				<view @click="search_id = 2" :class="['items',search_id === 2? 'filter-active':'']">店铺</view>
			</view>
		</view>
        <view class="search-all">
            <view class="search-list">
                <view class="sea-tit">
                    <text>最近搜索</text>
                    <i class="iconfont " :class="[searchAll.length? 'icon_e63a': '']" @click="delect"></i>
                </view>
                <view class="sea-tag">
                    <text @click="searchchGoods(time)" v-for="(time,index) in searchAll" :key="index">{{time}}</text>
                    
                </view>
            </view>
            
        </view>
    </view>
</template>

<script>
let searchList = []  // 所有搜索关键词数组
export default {
    onLoad(option){
       
        this.search_id = Number(option.search_id)
        
    },
    data(){
       return {
            search_id: 1,
            searchKey:'',
            searchAll:uni.getStorageSync('searchList') ? JSON.parse(uni.getStorageSync('searchList')) : []
       }
    },
    methods: {
        /**
         * 搜索店铺，商品和记录搜索历史
         */
        searchchGoods(value){
            searchList = []
            if(value) {
                this.searchKey = value
            }
            if(!this.searchKey) {
                this.$toast('请输入搜索关键词')
                return false
            }
            if(uni.getStorageSync('searchList')) {
                searchList = JSON.parse(uni.getStorageSync('searchList'))
                
                if(!searchList.includes(this.searchKey)) {
                    searchList.push(this.searchKey)
                }
            }else {
                searchList.push(this.searchKey)
            }
            uni.setStorageSync('searchList', JSON.stringify(searchList));
            let data = {
                keyword_name:this.searchKey,
                type: 2  
            }
            if(this.search_id == 1) {
                this.getnav('/pages/homeSon/searchTypeSelection?searchObj=' + JSON.stringify(data))
            }else {
                this.getnav('/pages/homeSon/theShop?searchObj=' + JSON.stringify(data))
            }
            
        },
        /**
         * 删除搜索记录
         */
        delect(){
            this.$showModal({content:'确认删除历史记录吗？'}).then(res=>{
                if(res.confirm) {
                    uni.removeStorageSync('searchList');
                    this.searchAll = []
                }
            })
        }
    },
}
</script>

<style scope lang="less">
page {
    background-color: #fff!important;
}
.status,.to-tltle {
    background-color: #fff!important;
}
.back {
    color: #333333;
}
.shop-search {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20upx;
    height: 60upx;
    width: 620upx;
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
.header-filter {
    padding:  0 185upx!important;
}
</style>
