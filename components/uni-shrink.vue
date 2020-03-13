<template>
    <view class="uni-shrink">
        <view class="type-text" v-for="(time,index) in lists" :key="index">
            <view class="type-title" @click="getHeight(time.id)" hover-class="item-active-hover">
                <text>{{time.title}}</text>
                <i class="iconfont icon_eb17"></i>
            </view>
            <view class="type-add ">
                <view class="text-over"   :style="{'height': time.height,'transition': 'all 0.3s ease-out'}">
                    <text @click="getId()" class="type-list" :class="{'active': index2 == alId }"  v-for="(times,index2) in time.user" :key="index2">{{times}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name:'uni-shrink',
    data(){
        return {
            alId:''
        }
    },
    props:{
        lists:{
            type:Array,
            default: [
                {
                    title:'品牌',
                    id:1,
                    height:uni.upx2px(150) + 'px',
                    user:[
                        '贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营'
                    ]
                },{
                    title:'衣长',
                    id:2,
                    height:uni.upx2px(150) + 'px',
                    user:[
                        '贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营'
                    ]
                },{
                    title:'厚薄',
                    id:3,
                    height:uni.upx2px(150) + 'px',
                    user:[
                        '贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营','贝贝自营'
                    ]
                },
            ]
        }
    },
    methods: {
        getHeight(id){
            this.lists.forEach(element => {
                if(element.id == id) {
                    if(element.height == uni.upx2px(150) + 'px') {
                        let view = uni.createSelectorQuery().select(".type-list");
                        view.fields({
                        size: true,
                        scrollOffset: true
                        }, data => {
                            
                            element.height = uni.upx2px((Number(data.height) + 50 ) * 4)  +'px'
                            
                        }).exec();
                    } else {
                        element.height = uni.upx2px(150) + 'px'
                    }
                    
                    
                }
            });
        },
        getId(data,index2,times){
                 
            this.alId = index2 
            console.log(this.alId)
            console.log(index2 )
        }
    },
}
</script>

<style>

</style>
