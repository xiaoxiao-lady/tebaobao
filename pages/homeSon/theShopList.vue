<template>
	<view class="index_class">

		<view class="bus-top">
			<view class="status"></view>
			<view class="to-tltle">
				<i class="iconfont icon_e675 back" @click="getback()"></i>
				<view class="shop-search">
					<i class="icon iconfont icon_e819"></i>
					<input placeholder="请输入关键词搜索" v-model="searchData.keyword_name" />
					<view class="bus-tap" @click="searchKeyWord">搜索</view>
				</view>
				<!-- <text class="delete">发布动态</text> -->
			</view>

			<view class="header-filter">
				<view @click="searchIndex(1,'zonghe')" class="items " :class="[showIndex == 1? 'filter-active' : '']">综合排序</view>
				<view @click="searchIndex(2,'deal_num')" class="items" :class="[showIndex == 2? 'filter-active' : '']">销量优先</view>
				<view @click="searchIndex(3,'praise_lv')" class="items" :class="[showIndex == 3? 'filter-active' : '']">好评率</view>

			</view>
		</view>
		<view class="the-content">
			<view class="shop-list" v-for="(time,index) in shopList" :key="index">
				<view class="the-title">
					<view class="list-left">
						<image :src="time.logo" />
						<view>
							<view class="color">{{time.shop_name}}</view>
							<view class="text">好评率:{{time.praise_lv}}% <text>{{time.deal_num}}</text> 人已抢</view>
						</view>
					</view>
					<view class="theshop" hover-class="click-active-bgc" @click="getnav('/pages/homeSon/storeDetails?shop_id='+time.id )">进入店铺</view>

				</view>

				<view class="the-ban">
					<view class="items" v-for="(shopitem,index2) in time.goodres" :key="index2">
						<image :src="shopitem.thumb_url" />
						<view class="text">{{shopitem.goods_name}}</view>
						<view class="money">￥{{shopitem.zs_price}}</view>
					</view>

				</view>
			</view>

			<view class="depot" v-if="isshow">
				<image class="img" src="../../static/images/img/cartinfo.png" />
				<view class="tps" style="margin-top:15upx;">暂无商家</view>
				<!-- <view class="stroll" @click="getnav('/pages/homeSon/classification')">到处逛逛</view> -->
			</view>
			<loadMore :loadingType="typeLoding"></loadMore>

		</view>
	</view>
</template>

<script>
	let page = 1
	export default {
		data() {
			return {
				searchData: {},
				shopList: [], // 店铺列表
				typeLoding: 0,
				showIndex: 0,
				Keyword: '',
				isshow: false
			}
		},
		onShow() {
			page = 1
		},
		onLoad() {
			page = 1
			this.getShopList()

		},
		onReachBottom() {
			if (this.typeLoding !== 0) return false
			if (!this.Keyword) {
				this.getShopList()

				return false
			}

			this.typeLoding = 1
			page++
			this.getsearchshops()
		},
		methods: {
			getShopList() {
				this.$http.getShopList({
					page: page
				}).then(res => {
					if (res.status === 200) {

						if (res.data.length == 0) {
							this.typeLoding = 2
						}

						this.shopList.push(...res.data)
						page = page + 1
					} else {
						this.typeLoding = 0
					}
				})
			},

			getsearchshops(name = '') {
				let data = {
					keyword_name: this.searchData.keyword_name,
					sort: this.Keyword,
					page: 1
				}
				this.$loading()
				this.$http.getsearchshops(data).then(res => {
					if (res.status == 200) {

						if (res.data.length == 0) {
							this.typeLoding = 2
						}
						this.typeLoding = 0
						this.shopList = [...this.shopList, ...res.data]
						if (this.shopList.length == 0) {
							this.isshow = true
						} else {
							this.isshow = false
						}
					} else {
						this.typeLoding = 0
					}
				})
			},
			searchIndex(index, Keyword) {
				// this.showIndex = index
				// this.Keyword = Keyword
				var showIndex = index
				var Keyword = Keyword
				this.Keyword = Keyword;
				this.shopList = []
				this.getsearchshops()

			},
			searchKeyWord() {
				this.showIndex = 0
				page = 1
				this.shopList = []
				this.Keyword = ''
				this.getsearchshops()
			}
		},
	}
</script>

<style scope lang="less">
	page {
		height: 100%;
	}

	.index_class {
		height: 100%;

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
</style>
