<template>
    <view class="index_class ">
 
		<view class="header-filter"> 
           <view class="items" :class="{'filter-active':showingIndex1 == 1}" @click="showOptions(1)">全部</view>
			<view class="items" :class="{'filter-active':showingIndex1 == 2}" @click="showOptions(2)">收入</view>
			<view class="items" :class="{'filter-active':showingIndex1 == 3}" @click="showOptions(3)">支出</view>

        </view>
        <view class="detailed-cont">
			<mescroll-uni top="0" style="padding-top:0!important" :up="upOption" @up="upCallback" @down="downCallback" @init="mescrollInit" @emptyclick="emptyClick">
                    
            <view class="demo-content" >
				<div class="full_list" hover-class="click-active-bgc" @click="getnav('/pages/personalSon/Detailed_list')">
					<div class="f_prive">
						<span>充值金额:1000:00元</span>
						<div >2019-01-08  11:51</div>
					</div>
					<div class="f_btn">+￥20.00</div>
				</div>
				<div class="full_list" hover-class="click-active-bgc" @click="getnav('/pages/personalSon/Detailed_list')">
					<div class="f_prive">
						<span>充值金额:1000:00元</span>
						<div >2019-01-08  11:51</div>
					</div>
					<div class="f_btn">+￥30.00</div>
				</div>
			</view>
			<!-- <loadMore :loadingType="loadingType"></loadMore>  -->

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
			showingIndex1:1,
			list:[],
			mescroll: null, //mescroll实例对象
            upOption:{
                page: {
                	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                	size: 10 // 每页数据的数量
                },
                noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
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
	onReachBottom:function(){
        this.mescroll && this.mescroll.onReachBottom();
    },
    //注册列表滚动事件,用于下拉刷新
    onPageScroll(e) {
        this.mescroll && this.mescroll.onPageScroll(e);
    },
	methods: {
		showOptions:function(type){
			this.showingIndex1 = type
		},

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
            this.$http.getlist({
                filter:this.showingIndex1,
                page:pageNum
            }).then(res=>{
                if(res.status == 200) {

                    this.mescroll.endByPage(res.data.length, Math.ceil(Number(res.data.length) / pageSize) );
                    if(pageNum == 1) this.list = []; //如果是第一页需手动制空列表
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
page {
    background: #fff;
}
.header-filter {
    width: 100%;
    position: fixed!important;
    padding: 0 170upx!important;
    
}
</style>
