<template>
    <mescroll-uni :down="downOption"  :up="upOption" @up="upCallback" @init="mescrollInit">
        <view class="index_class">
            <view class="record">
                <div class="record_list" v-for="(time,index) in recoList" :key="index">
                    <div class="roc_title">{{time.log}} 积分</div>
                    <div class="roc_time">{{time.time}}</div>
                </div>  
            </view>
        </view>
    </mescroll-uni>
</template>

<script>
import MescrollUni from "mescroll-uni/mescroll-uni.vue";
// loadingType 0 上拉加载更多
// loadingType 1 加载中
// loadingType 2 已经加载全部数据
 
export default {
    components:{
        MescrollUni
    },
    data(){
        return {
            recoList:[],
            mescroll: null, //mescroll实例对象
            // 下拉刷新的配置
            downOption: { 
                use: false, // 是否启用下拉刷新; 默认true
                auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
            },
            // 上拉加载的配置
            upOption: {
                use: true, // 是否启用上拉加载; 默认true
                auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
                isLock: false, // 是否锁定上拉加载 (可用于不触发upCallback,只保留回到顶部按钮的场景)
                page: {
                    num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                    size: 10 // 每页数据的数量,默认10
                },
                noMoreSize: 3, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
                empty: {
                    tip: '暂无相关数据'
                }
            },
        }
    },
    onReachBottom:function(){
        // 页面触底加载事件
        //避免多次触发
        this.mescroll && this.mescroll.onReachBottom();
       
    },

    // 必须注册列表滚动事件,使下拉刷新生效
    onPageScroll(e) {
        this.mescroll && this.mescroll.onPageScroll(e);
    },
    methods: {
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        /*上拉加载的回调*/
        upCallback(mescroll) {
            // 此时mescroll会携带page的参数:
            var pageNum = mescroll.num; // 页码, 默认从1开始
            var pageSize = mescroll.size; // 页长, 默认每页10条
            let prams = {
                page:pageNum
            }
            this.$http.recordList(prams).then(res=>{
                this.mescroll.endByPage(res.data.length, Math.ceil(Number(res.data.length) / pageSize) ); 

                if(pageNum == 1) this.recoList = []; //如果是第一页需手动制空列表
                this.recoList = this.recoList.concat(res.data); //追加新数据

            }).catch(err=>{
                // 失败隐藏下拉加载状态
                this.mescroll.endErr()
            })
        },
   
    },
    onShow(){
   
    },
    created() {
        
    },
}
</script>

<style>

</style>
