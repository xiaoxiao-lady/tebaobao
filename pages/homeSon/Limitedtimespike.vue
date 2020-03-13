<template>
    <view class="index_class">
        <view class="spike-fixed">
            <scroll-view   class="scroll-view_H" scroll-x="true" scroll-with-animation="true"  :scroll-into-view="'active'+toId">
                <view class="spike-list" :id="'active' + index" :class="[timeList.show == 1?'active' : '' ]"  v-for="(timeList,index) in limitList" :key="index" @click="clickTime(timeList.time)">
                    <view>{{timeList.time }}</view>
                    <view v-if="timeList.cuxiao == 0">即将开始</view>
                    <view v-if="timeList.cuxiao == 1">抢购中</view>
                </view>
                
            </scroll-view>

            <view class="fiexd-left" :class="[limitdeIndex == 1? 'ac_color' : '']" @click="limitdeClick(1)" >
                    昨日 <br />特卖
            </view>
            <view class="fiexd-right" :class="[limitdeIndex == 2? 'ac_color' : '']" @click="limitdeClick(2)">
                明日 <br /> 开抢
            </view>
        </view>
        <view class="spike-content"> 
           <view class="spike-time" v-if="cuxiao == 0">
               <view>限时限量 好货低价</view>
               <view>距本场开始 
                   <uni-countdown 
                            @timeuptime="timeuptime"
                            color="#FFFFFF" 
                            background-color="#FF6262" 
                            border-color="#FF6262" 
                            :day="0" 
                            :hour="countDown.hour" 
                            :minute="countDown.minute" 
                            :second="countDown.second"
                            :show-day="false"
                            :show-colon="false">
                    </uni-countdown>
               </view>
           </view>
           <view class="spike-time" v-if="show == 1">
               <view>限时限量 好货低价</view>
               <view>距本场结束 
                   <uni-countdown 
                            @timeuptime="timeuptime"
                            color="#FFFFFF" 
                            background-color="#FF6262" 
                            border-color="#FF6262" 
                            :day="0" 
                            :hour="countDown.hour" 
                            :minute="countDown.minute" 
                            :second="countDown.second"
                            :show-day="false"
                            :show-colon="false">
                    </uni-countdown>
               </view>
           </view>
           <view class="cont-list spike-scroll-list" :class="{'greenColor': cuxiao===0}" v-for="(goods,index) in goodres" :key="index">
                <view class="cont-info" @click.stop="settes(goods.goods_id,goods.id)">
                    <image :src="goods.thumb_url" />
                    <view class="cont-col">
                        <text class="title">{{goods.goods_name}}</text>
                        <!-- <view>贝贝精选 优选质量 气质新款</view> -->
                        <view class="col-btn">
                            <view>
                                <view class="perice">¥{{goods.price}}</view>
                                <view class="per-e">¥{{goods.shop_price}}</view>
                            </view>
                            
                            <view class="button-go" @click.stop="btnClick" v-if="cuxiao===0">
                                {{cuxiao===0? cuStr:'马上抢'}}
                                <view class="progress" v-if="cuxiao != 0">
                                    <view class="pro-left">已售数量{{goods.sold}}</view>
                                    <view class="progress-num"  :style="'width:'+ goods.yslv +'%'">

                                    </view>
                                </view>
                            </view>
                            <view class="button-go"  v-else>
                                马上抢
                                <view class="progress" v-if="cuxiao != 0">
                                    <view class="pro-left">已售数量{{goods.sold}}</view>
                                    <view class="progress-num"  :style="'width:'+ goods.yslv +'%'">

                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
           </view>
            <loadMore :loadingType="loadingType" ></loadMore>
        </view>
        
    </view>
</template>

<script>
import uniCountdown from "../../components/uni-countdown.vue"; 
let dataObj = {
    nowtime: '',
    page:1
}
export default {
    data(){
        return {
            limitList:[],
            scrollLeft:0,
            toId:'',
            countDown:{
                hour:0,
                minute:0,
                second:10
            },
            goodres:[], // 商品列表
            loadingType:0,
            cuxiao: 0,  //0即将开始  1以开始
            cuStr:'提醒我',
            limitdeIndex:0,
            show:0
        }
    },
    onShow(){
        if(!this.goodres.length ) {
            dataObj.page = 1
            this.loadingType = 0
            this.goodres = []
            this.getrushtime()
        }
        

    },
    onReachBottom:function(){
        // 上拉加载更多
        if(this.loadingType == 1 || this.loadingType == 2) { return false }
        this.loadingType = 1
        
        dataObj.page++
		this.getActivity(dataObj)
	},
    watch: {

    },
    
    methods: {
        btnClick(){
           
                this.$toast('设置提醒成功')
                
           
        },
        settes(id,id2){
            console.log(this.cuxiao)
            if(this.cuxiao === 0) {
                this.getnav('/pages/homeSon/spike_details?id='+id+ '&rush_id=' + id2)
            } else {
                this.getnav('/pages/homeSon/shop_details?id='+id+ '&rush_id=' + id2)
            }
        },
        /**
         * 点击选中时间段
         */
        clickTime(time){
            this.limitList.forEach( (el,index)=>{
                el.show = 0
                if(time == el.time) {
                    this.limitdeIndex = 0
                    el.show = 1
                    this.toId = index
                    dataObj.timeDate = el.countTime
                    dataObj.page = 1
                    this.loadingType = 0
                    this.goodres = []
                    this.$loading()
                    this.getActivity(dataObj)
                }
                
            })
        },
        getrushtime(){
            this.$http.getrushtime().then(res=>{
                if(res.status == 200) {
                 
                    for(var i=0;i<res.data.length;i++) {
                        let element = res.data[i]
                        const date  = new Date(element.time * 1000)
                        const day = date.getDate()
                        const getHours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
                        element.countTime = element.time
                        if(element.show == 1) {
                            this.toId = i
                            dataObj.timeDate = element.time
                            console.log(element.time)
                            this.getActivity(dataObj)
                        }
                        element.time = `${getHours}:00`
                    }
                    this.limitList = res.data
                    
                }
            })
        }, 
        getActivity(data){
            this.$http.getActivity({nowtime:data.timeDate,page:data.page}).then(res=>{
                if(res.status == 200) {
                    this.cuxiao = res.data.cuxiao
                    this.show = res.data.show
                    if(Number(res.data.hdtime) > Number(res.data.dqtime)) {
                        let str = Number(res.data.hdtime) - Number(res.data.dqtime)
                        let  strArr = this.$formatSeconds(str).split('-')
                        this.countDown = {
                            hour:Number(strArr[0]),
                            minute:Number(strArr[1]),
                            second:Number(strArr[2])
                        }   
                    } else if(Number(res.data.hdtime) <= Number(res.data.dqtime) && res.data.show == 1) {
                        let str = Number(res.data.end_time) - Number(res.data.dqtime)
                        let  strArr = this.$formatSeconds(str).split('-')
                        this.countDown = {
                            hour:Number(strArr[0]),
                            minute:Number(strArr[1]),
                            second:Number(strArr[2])
                        }   
                    }
                    
                    if(res.data.goodres.length == 0) {
                        this.loadingType = 2
                        return false
                    }

                    this.goodres = [...this.goodres,...res.data.goodres]
                    this.loadingType = 0
                    
                }
            })
        },
        /**
         * 倒计时结束
         */
        timeuptime(){
            if(this.cuxiao == 0) {
                dataObj.page = 1
                this.loadingType = 0
                this.goodres = []
                this.getrushtime()
            }
            
        },
        limitdeClick(i){
            this.limitdeIndex = i
            dataObj.timeDate = i
            dataObj.page = 1
            this.loadingType = 0
            this.goodres = []
            this.$loading()
            this.getActivity(dataObj)
        }
    },
    components:{
        uniCountdown
    }
}
</script>

<style lang="less">
page {
    height: 100%;
}
.spike-content {
    height: 100%;
    background-color: #f4f4f4;
}
.greenColor {
    .button-go {
        border-color:green!important; 
        color:green!important;
    }
    .perice {
        color:green!important;
    }
}
.ac_color {
    color: #fff!important;
}
.uni-countdown__number {
    background-color: green!important;
    border-color:green!important; 
}
</style>
