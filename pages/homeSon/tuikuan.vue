<template>
    <view class="index_class">
        <view class="all-order" style="padding-top:0;">
        <mescroll-uni top="0" style="padding-top:0!important" :up="upOption" @up="upCallback" @down="downCallback" @init="mescrollInit" @emptyclick="emptyClick">
            <view  style="background-color:#f4f4f4">
                <view class="order_list" v-for="(item,index) in list" :key="index" >
                    <view class="order_bottom" >
                        <view class="bottom_top" @click.stop="getnav('/pages/homeSon/storeDetails?shop_id='+item.shop_id )">
                            <view>
                                {{item.shop_name}}
                                <i class="iconfont icon_e60c"></i>
                            </view>
                            <i class="iconfont order_all_right"></i>
                        </view>
                        <view class="bottom_img"  >
                            <image style="background-color:#fff" :src="item.orgoods.thumb_url" />
                            
                            <view style="padding:0 40upx 0 20upx;flex:1">
                                <view class="introduce" >{{item.orgoods.goods_name}}</view>
                                <view class="arrt-str">{{item.orgoods.goods_attr_str}}</view>
                            </view>
                            <view style="font-size:24upx;">
                               
                                <view style="text-align:right;color:#999">x{{item.tui_num}}</view> 
                                
                            </view>
                        </view>
                        <view style="font-size:26upx;padding:20upx 0 20upx 30upx;">
                            <block v-if="item.thfw_id == 1">仅退款</block>
                            <block v-else-if="item.thfw_id == 2">退货退款</block>
                            <block v-else-if="item.thfw_id == 3">换货</block>  
                            <text style="margin-left:20upx;">{{item.order_zt}}</text>
                        </view>
                    </view>
                    <view class="or_number">
                        <view class="number_sure" >
                            <span class="payment_order" @click="getnav('/pages/personalSon/refundCopy?th_number='+item.th_number)">查看详情</span>
                        </view>
                        
                    </view>
                </view>

                
                
            </view>


        </mescroll-uni>
        </view>
    </view>
</template>

<script>
import MescrollUni from "mescroll-uni/mescroll-uni.vue";

export default {
    components:{
        MescrollUni
    },
    data(){
        return {
            list:[],
            mescroll: null, //mescroll实例对象
            upOption:{
                page: {
                	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                	size: 10 // 每页数据的数量
                },
                noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
                // empty: {
                //     use: true, // 是否显示空布局
                //     icon: "http://www.mescroll.com/img/mescroll-empty.png", // 图标路径
                //     tip: '~ 暂无相关数据 ~', // 提示
                //     btnText: '去逛逛 >' // 按钮
                // }
                empty:{
                    tip: '~ 暂无数据 ~', // 提示
                    btnText: '去看看'
                }
            },
        }
    },
    onShow(){
        this.list = []
        this.mescroll && this.mescroll.resetUpScroll() 
    },
     onReachBottom:function(){
        this.mescroll && this.mescroll.onReachBottom();
    },
    //注册列表滚动事件,用于下拉刷新
    onPageScroll(e) {
        this.mescroll && this.mescroll.onPageScroll(e);
    },
    methods: {
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        // 下拉刷新的回调
        downCallback(mescroll){
            mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
        },
        /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
        upCallback(mescroll) {
            var pageNum = mescroll.num; // 页码, 默认从1开始
            var pageSize = mescroll.size; // 页长, 默认每页10条
            this.$http.getMyOrder({
                filter:5,
                page:pageNum
            }).then(res=>{
                if(res.status == 200) {
                    this.mescroll.endByPage(res.data.length, Math.ceil(Number(res.data.length) / pageSize) );
                    if(pageNum == 1) this.list = [];  //如果是第一页需手动制空列表
                    this.list = this.list.concat(res.data); //追加新数据 
                }
            }).catch(err=>{
                // 失败隐藏下拉加载状态
                this.mescroll.endErr()
            })

        },
        //点击空布局按钮的回调
        emptyClick(){
           this.getnav('/pages/homeSon/classification')
        },
    },
}
</script>

<style scope>
.payment_order {
    background-color: transparent!important;
    color: #FA3F3F!important;
}
.bottom_img {
    padding: 20upx!important;
    background-color: #F9F9F9!important;
}
.or_number {
    border-top: 1upx solid #f4f4f4;
}
.number_sure {
    margin-top: 0!important;
}
</style>
