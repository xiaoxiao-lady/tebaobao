<template>
    <view class="index_class">
        <view class="class_scoll">
            <scroll-view class="scroll-view_H scroll_left" scroll-y="true"  scroll-left="0">
                <view id="demo1" class="scroll-view-item_H scroll_left_item " @click="clickActive(item.id, index)" :class="{'active': currIndex === index}" v-for="(item, index) in list" :key="index">
                    <view >{{ item.cate_name }}</view>
                </view>
            </scroll-view>
            <scroll-view class="scroll-view_H scroll_right" scroll-y="true"  scroll-right="0">
                <view id="demo1" class="scroll-view-item_H scroll_right_item">
                    <view class="right_scoll_items" v-for="(item, index) in goodsList" :key="index">
                        <view class="s_title">{{item.cate_name}}</view>
                        <view class="right_scoll_items_img">
                            <view @click="getnav('/pages/homeSon/typeSelection?id=' + erth.id)" class="img_items" 
                            v-for="(erth,index2) in item.three" :key="index2">
                                <image :src="erth.cate_pic" mode="aspectFit" />
                                <view>{{ erth.cate_name }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                
            </scroll-view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            list: [{
                cate_name:'推荐分类',
                id:0
            }],
            currIndex: 0,
            goodsList: [],
            // recom_cate:[]
        }
    },

    onLoad () {
        this.$http.getCategory({}).then((res) => {
            if (res.status === 200) {
                const newList = this.list.concat(res.data.cateres)
                this.list = newList
                this.goodsList = [{three:res.data.recom_cate}]
                this.clickActive(newList[0].id,0)
            } else {
                this.$toast(res.mess)
            }
        })
    },

    methods: {
        clickActive (id, index) {
            if (this.currIndex === index) return false
            this.currIndex = index
            this.$loading()
            this.$http.getCategoryList({
                cate_id: id
            }).then(res => {
                if (res.status === 200) {
                    if(id === 0) {
                        this.goodsList = [{three:res.data}]
                        return false
                    }
                    this.goodsList = res.data
                    
                }
            })
        }
    },
}
</script>

<style scope>
.icon_e64c {
    width: 120upx;
    height: 120upx;
    line-height: 120upx;
    text-align: center;
    font-size: 80upx;
    color: #CECDCD;
    flex-direction: column
}
.active {
    width: 100%!important;
    
}
.active image {
    width: 378upx!important;
    height: 378upx!important;
}
.index_class, page {
	height: 100%;
}
.s_title {
    padding-left:30rpx!important;
    padding-bottom:0!important;
}
.class_scoll {
    top: 0!important;
    height: 100%!important;
}
</style>
