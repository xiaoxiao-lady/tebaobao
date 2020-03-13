<template>
	<view class="index_class">
		<view class="bus-top">
			<view class="status" :style="{position:headerPosition}"></view>
			<view class="to-tltle" :style="{position:headerPosition}">附近商家</view>
			<view class="bus-title-search">
				<view class="bus-search">
					<i class="icon iconfont icon_e819"></i>
					<input placeholder="请输入关键词搜索" />
					<view class="bus-tap" @click="getnav('/pages/homeSon/typeSelection')">搜索</view>
				</view>
			</view>
			<view class="header-filter">
				<view class="items" :class="{'filter-active':showingIndex == 1}" @tap="showOptions1">附近<i class="iconfont icon_e65a"></i></view>
				<view class="items" :class="{'filter-active':showingIndex == 2}" @tap="showOptions2">分类<i class="iconfont icon_e65a"></i></view>
				<view class="items" :class="{'filter-active':showingIndex == 3}" @tap="showOptions3">智能信息<i class="iconfont icon_e65a"></i></view>
				
				<!-- 第一个选项 -->
				<view class="filter-options" v-if="showingIndex == 1">
					<view class="options-itens" @tap="changeOrder" :class="{'options-active': orderIndex==0}" data-itemid="0">
						<text>500米</text>
						<i class="iconfont icon_e648"></i>
					</view>
					<view class="options-itens" @tap="changeOrder" :class="{'options-active': orderIndex==1}" data-itemid="1"> 
						<text>1000米</text>
						<i class="iconfont icon_e648"></i>
					</view>
					<view class="options-itens" @tap="changeOrder" :class="{'options-active': orderIndex==2}" data-itemid="2">
						<text>2000米</text>
						<i class="iconfont icon_e648"></i>
					</view>
					
				</view>

				<!-- 第二个选项 -->
				<view class="filter-options" v-if="showingIndex == 2">
					<view class="options-itens options-active">
						<text>平台独立店铺服装鞋帽等居家用品类</text>
						<i class="iconfont icon_e648"></i>
					</view>
					<view class="options-itens">
						<text>平台独立店铺服装鞋帽等居家用品类</text>
						<i class="iconfont icon_e648"></i>
					</view>
					<view class="options-itens">
						<text>平台独立店铺服装鞋帽等居家用品类</text>
						<i class="iconfont icon_e648"></i>
					</view>
					
				</view>

				<!-- 第三个选项 -->
				<view class="filter-options" v-if="showingIndex == 3">
					<view class="options-itens options-active">
						<text>距离最近</text>
						<i class="iconfont icon_e648"></i>
					</view>
					<view class="options-itens">
						<text>距离最近</text>
						<i class="iconfont icon_e648"></i>
					</view>
					<view class="options-itens">
						<text>距离最近</text>
						<i class="iconfont icon_e648"></i>
					</view>
					
				</view>
			</view>
		</view>
		
		<!--  分类商品列表 -->
		<view class="filter-scroll">
			<!--  app 端状态栏站位 -->
			<view class="status-active"></view>  
			
			<view class="scroll-title">
				<i class="iconfont icon_e79f"></i>
				推荐商家
			</view>
			<view class="scroll-items">
				<view class="item-top" @click="getnav('/pages/businessSon/business')">
					<image class="img" src="../../static/images/img/shop_al.png" />
					<view class="text">
						<view class="title">好多绿蔬菜</view>
						<view>分类:平台自营店铺生鲜海鲜厨房用 品等食品类</view>
						<view>地址:湖北省孝感市汉川市霍城大道新汉都1号城</view>
					</view>
				</view>
				<view class="item-bottom">
					<image class="img" src="../../static/images/img/tel.png" />
					<view class="bgc"></view>
					<image class="img" src="../../static/images/img/address.png" />
				</view>
			</view>

			<view class="scroll-items">
				<view class="item-top">
					<image class="img" src="../../static/images/img/shop_al.png" />
					<view class="text">
						<view class="title">好多绿蔬菜</view>
						<view>分类:平台自营店铺生鲜海鲜厨房用 品等食品类</view>
						<view>地址:湖北省孝感市汉川市霍城大道新汉都1号城</view>
					</view>
				</view>
				<view class="item-bottom">
					<image class="img" src="../../static/images/img/tel.png" />
					<view class="bgc"></view>
					<image class="img" src="../../static/images/img/address.png" />
				</view>
			</view>
			<view class="scroll-items">
				<view class="item-top">
					<image class="img" src="../../static/images/img/shop_al.png" />
					<view class="text">
						<view class="title">好多绿蔬菜</view>
						<view>分类:平台自营店铺生鲜海鲜厨房用 品等食品类</view>
						<view>地址:湖北省孝感市汉川市霍城大道新汉都1号城</view>
					</view>
				</view>
				<view class="item-bottom">
					<image class="img" src="../../static/images/img/tel.png" />
					<view class="bgc"></view>
					<image class="img" src="../../static/images/img/address.png" />
				</view>
			</view>
			<view class="scroll-items">
				<view class="item-top">
					<image class="img" src="../../static/images/img/shop_al.png" />
					<view class="text">
						<view class="title">好多绿蔬菜</view>
						<view>分类:平台自营店铺生鲜海鲜厨房用 品等食品类</view>
						<view>地址:湖北省孝感市汉川市霍城大道新汉都1号城</view>
					</view>
				</view>
				<view class="item-bottom">
					<image class="img" src="../../static/images/img/tel.png" />
					<view class="bgc"></view>
					<image class="img" src="../../static/images/img/address.png" />
				</view>
			</view>
			<view class="scroll-items">
				<view class="item-top">
					<image class="img" src="../../static/images/img/shop_al.png" />
					<view class="text">
						<view class="title">好多绿蔬菜</view>
						<view>分类:平台自营店铺生鲜海鲜厨房用 品等食品类</view>
						<view>地址:湖北省孝感市汉川市霍城大道新汉都1号城</view>
					</view>
				</view>
				<view class="item-bottom">
					<image class="img" src="../../static/images/img/tel.png" />
					<view class="bgc"></view>
					<image class="img" src="../../static/images/img/address.png" />
				</view>
			</view>

			<view class="depot">
				<image class="img" src="../../static/images/img/time.png" />
				<view style="margin-top:20px">暂无商家</view>
				<view class="stroll">到处逛逛</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
export default {
	data(){
		return {
			showingIndex:0,  // 别展示的菜单
			orderIndex:0
		}
	},
	methods: {
		showOptions1:function(){
			if(this.showingIndex != 0){this.showingIndex = 0; return ;} this.showingIndex = 1;
		},
		showOptions2:function(){
			if(this.showingIndex != 0){this.showingIndex = 0; return ;} this.showingIndex = 2;
		},
		showOptions3:function(){
			if(this.showingIndex != 0){this.showingIndex = 0; return ;} this.showingIndex = 3;
		},
		// 选择分类
		changeOrder:function(e){
			var tapIndex = e.target.dataset.itemid
			this.orderIndex = tapIndex
			this.showingIndex = 0;
		}
	},
}
	
</script>

<style>

</style>
