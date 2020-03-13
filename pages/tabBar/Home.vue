<template>
	<view class="index_class">
		<div class="home-header">
			<image src="/static/images/home/bg.png" />
			<view class="swip_banner">
				<swiper class="grace-swiper" autoplay="true" indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#FF1212"
				 style="height:180px" interval="3000">
					<swiper-item v-for="(item, index) in swiperItems" :key="index">
						<image :src='item.pic' @click="getnav('/pages/homeSon/'+item.canshu)" style="height:100%" class="image_height"></image>
					</swiper-item>
				</swiper>
			</view>
		</div>

		<view class="bu_class">
			<!-- <view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/classification')">
				<image src="../../static/images/img/item1.png"/>
				<view>新品上市</view>
			</view> -->
			<view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/Limitedtimespike')">
				<image src="../../static/images/img/chaojimiaosha.png" />
				<view>超级秒杀</view>
			</view>
			<view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/fightGroupList')">
				<image src="../../static/images/img/renrenpintuan.png" />
				<view>人人拼团</view>
			</view>
			<view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/tgList')">
				<image src="../../static/images/img/remaibaokuan.png" />
				<view>热卖爆款</view>
			</view>
			<view class="bu_items" hover-class="item-active-hover" @click="confirm">
				<image src="../../static/images/img/woyaokaidian.png" />
				<view>我要开店</view>
			</view>
			<view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/theShopList')">
				<image src="../../static/images/img/dianpujie.png" />
				<view>店铺街</view>
			</view>
			<view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/classification')">
				<image src="../../static/images/img/boshangpingtai.png" />
				<view>播商平台</view>
			</view>
			<view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/personalSon/signin')">
				<image src="../../static/images/img/meiriqiandao.png" />
				<view>每日签到</view>
			</view>
			<view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/personalSon/shareQRcode')">
				<image src="../../static/images/img/fenxiangyouli.png" />
				<view>分享有礼</view>
			</view>
			<view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/squareSon/Release')">
				<image src="../../static/images/img/fabudongtai.png" />
				<view>发布动态</view>
			</view>

			<!-- <view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/theShop')">
				<image src="../../static/images/img/item4.png"/>
				<view>优惠券</view>
			</view> -->
			<!-- <view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/classification')">
				<image src="../../static/images/img/item5.png"/>
				<view>今日活动</view>
			</view> -->


			<view class="bu_items" hover-class="item-active-hover" @click="getnav('/pages/Kefu/Kefu')">
				<image src="../../static/images/img/lianxikefu.png" />
				<view>联系客服</view>
			</view>


		</view>
		<view class="null">
		</view>
		<view class="adver">
			<view class="adver-top">
				<image :src="httUrl+pic_url" />
			</view>
			<view class="adver-bottom">
				<view class="adver-bot-list">
					<view class="bot-item" v-for="(item,index) in adverList" :key="index"  @click="getnav('/pages/homeSon/shop_details?id='+item.id)">
						<view class="bot-item-top">
							<view class="img">
								<image :src="item.thumb_url" />
							</view>
						</view>
						<view class="bot-item-text">
							<view class="name">
								{{item.goods_name}}
							</view>
							<view class="price">
								活动价<text>{{item.hd_price}}</text>元
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="null">
		</view>
		<view class="buying">
			<scroll-view scroll-x class="scroll-view" scroll-with-animation  :scroll-into-view="'active'+toId" >
				<block>
					<view class="item" :class="[timeList.show == 1?'active' : '' ]" v-for="(timeList,index) in limitList" :key="index" @click="clickTime(timeList.time)" :id="'active' + index" >
						<view style="font-size: 32upx; font-family: 'Arial';">
							{{timeList.time}}
						</view>
						<view class="">
							<view v-if="timeList.cuxiao == 0">即将开始</view>
							<view v-if="timeList.cuxiao == 1">抢购中</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="shop">
			<view class="shop_bottom">
				<view class="shop_time" @click="getnav('/pages/homeSon/Limitedtimespike')">
					<view class="shop-title">
						疯抢中 此家质优价廉 何不犒劳下自己
					</view>
					<view class="countd">
						<text style="color:#9b9794">距结束仅剩</text>
						<uni-countdown @timeuptime="timeuptime" color="#FFFFFF" background-color="#ca2a32" border-color="#ca2a32"
						 splitor-color="#fff" :hour="countDown.hour" :minute="countDown.minute" :second="countDown.second" :show-day="false"
						 :show-colon="true">
						</uni-countdown>
					</view>
				</view>
			</view>
			<!-- 	<view class="shop_banner">
				<image @click="getnav('/pages/homeSon/'+cbanner2)" class="shop_left" :src="banner2" />
				<view class="shop_right">
					<image @click="getnav('/pages/homeSon/'+cbanner3)" :src="banner3" />
					<image @click="getnav('/pages/homeSon/'+cbanner4)" :src="banner4" />
				</view>
			</view>
		 -->
		</view>
		<view class="recommend">
			<view class="type-fliter">
				<view class="r-list">
					<view class="r-items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/shop_details?id='+item.goods_id)"
					 v-for="(item, index) in goodsList" :key="index">
						<image class="" :src="item.thumb_url" />
						<view class="r-items-top">
							<view class="sale-name">
								<text v-if="item.is_activity === 1">秒杀</text>
								<text v-if="item.is_activity === 2">团购</text>
								<text v-if="item.leixing === 1">自营</text>
								<text v-if="item.is_activity === 3">拼团</text>
								{{ item.goods_name }}
							</view>
							<text class="sale-num">热销{{item.num}}件</text>
						</view>
						<div class="flex-between r-bottom__container">
							<view class="r-money">
								<text>¥{{ item.zs_price }}</text>
							</view>
							<view class="r-bottom">
								<button class="r-btn" open-type="share">分享购买</button>
							</view>
						</div>
					</view>
				</view>
				<loadMore :loadingType="loadingType"></loadMore>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCountdown from "../../components/uni-countdown.vue"
	import login from '../../components/login.vue'
	import autoUpdater from '../../utils/autoUpdater.min.js'
	let dataObj = {
		nowtime: '',
		page: 1
	}
	console.log(dataObj.page);
	export default {
		data() {
			return {
				httUrl:"https://nycs.maitexun.cn/",
				swiper_height: '150px',
				headerPosition: 'fixed',
				speakerIconImg: '../../static/images/img/redian.png',
				swiperItems: [],
				goodsList: [],
				pic_url: "",
				toId:"",
				adverList: [],
				goodsinfo: {},
				loadingType: 0,
				countDown: {
					hour: 0,
					minute: 0,
					second: 10
				},
				limitList: [],
				xm: 0,
				banner1: '',
				banner2: '',
				banner3: '',
				banner4: '',
				cbanner1: '',
				cbanner2: '',
				cbanner3: '',
				cbanner4: '',
				isShow: []
			}
		},

		components: {
			uniCountdown
		},

		onLoad() {
			this.loadingType = 0
			this.swiperItems = []
			this.goodsList = []
			this.getAdverList()
			this.gethomeInfo()
			this.banner1 = ''
			this.banner2 = ''
			this.banner3 = ''
			this.banner4 = ''
			this.cbanner1 = ''
			this.cbanner2 = ''
			this.cbanner3 = ''
			this.cbanner4 = ''
		},

		onShow() {
			dataObj.page = 1
			this.getrushtime();
			if (uni.getStorageSync('token')) {
				this.$store.dispatch('contentnum')
			}

		},

		methods: {
			// 首页活动广告	
			getAdverList() {
				this.$http.getAdverlst().then(res => {

					if (res.status == 200) {
						if (res.data.length == 0) {
							this.loadingType = 2
							return false
						}
						this.pic_url = res.pic_url;
						this.adverList = [...this.adverList, ...res.data]
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
			        this.goodsList = []
			        this.getrushtime()
			    }  
			},
			confirm() {
				this.$http.getpanduan().then(res => {
					if (res.status == 200) {
						if (res.data.zhuangtai == 2) { // 进入审核流程状态页
							this.getnav('/pages/moneyCartSon/Settledin')

						} else if (res.data.zhuangtai == 4) {
							this.getnav('/pages/loginSon/settingWx')
						} else {
							this.getnav('/pages/personalSon/TradingType')
						}
					}
				})

			},
			// 抢购事件
			clickTime(time) {
				console.log(time)
				this.limitList.forEach((el, index) => {
					el.show = 0
					if (time == el.time) {
						this.limitdeIndex = 0
						el.show = 1
						this.toId = index
						dataObj.timeDate = el.countTime
						dataObj.page = 1
						this.loadingType = 0
						this.goodsList = []
						this.$loading()
						this.getgoodlst(dataObj)
					}

				})
			},
			getrushtime() {
				this.$http.getrushtime().then(res => {
					if (res.status == 200) {
						for (var i = 0; i < res.data.length; i++) {
							let element = res.data[i]
							const date = new Date(element.time * 1000)
							const day = date.getDate()
							const getHours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
							element.countTime = element.time
							if (element.show == 1) {
								this.toId = i
								dataObj.timeDate = element.time
								console.log(dataObj.timeDate)
								this.getgoodlst(dataObj)
							}
							element.time = `${getHours}:00`
						}
						this.limitList = res.data

					}
				})
			},

			confirms() {

				window.location.href = "https://nycs.maitexun.cn/lianxi.html"
				return
			},

			getgoodlst(data) {
				this.$http.getActivity({
					nowtime: data.timeDate,
					page: data.page
				}).then(res => {
					if (res.status == 200) {
						this.cuxiao = res.data.cuxiao
						this.show = res.data.show
						if (Number(res.data.hdtime) > Number(res.data.dqtime)) {
							let str = Number(res.data.hdtime) - Number(res.data.dqtime)
							let strArr = this.$formatSeconds(str).split('-')
							this.countDown = {
								hour: Number(strArr[0]),
								minute: Number(strArr[1]),
								second: Number(strArr[2])
							}
						} else if (Number(res.data.hdtime) <= Number(res.data.dqtime) && res.data.show == 1) {
							let str = Number(res.data.end_time) - Number(res.data.dqtime)
							let strArr = this.$formatSeconds(str).split('-')
							this.countDown = {
								hour: Number(strArr[0]),
								minute: Number(strArr[1]),
								second: Number(strArr[2])
							}
						}

						if (res.data.goodres.length == 0) {
							this.loadingType = 2
							return false
						}
						this.goodsList = [...this.goodsList, ...res.data.goodres]
						console.log(this.goodsList)
						this.loadingType = 0

					}
				})
			},

			gethomeInfo() {
				this.$http.gethomeInfo().then(res => {
					if (res.status == 200) {
						this.swiperItems = [...res.data.banner_pic]
						this.banner1 = res.data.ad_pic_one.pic;
						this.banner2 = res.data.ad_pic_two.pic;
						this.banner3 = res.data.ad_pic_three.pic;
						this.banner4 = res.data.ad_pic_four.pic;
						let goodsurl = 'shop_details?id='
						let shopurl = 'storeDetails?shop_id='
						//轮播图链接处理

						//广告位1链接地址
						var cbanner1 = res.data.ad_pic_one.canshu.split(":");
						if (cbanner1[0] == 1) {
							this.cbanner1 = goodsurl + cbanner1[1]
						} else {
							this.cbanner1 = shopurl + cbanner1[1]
						}
						//广告位2链接地址
						var cbanner2 = res.data.ad_pic_two.canshu.split(":");
						if (cbanner2[0] == 1) {
							this.cbanner2 = goodsurl + cbanner2[1]
						} else {
							this.cbanner2 = shopurl + cbanner2[1]
						}
						//广告位3链接地址
						var cbanner3 = res.data.ad_pic_three.canshu.split(":");
						if (cbanner3[0] == 1) {
							this.cbanner3 = goodsurl + cbanner3[1]
						} else {
							this.cbanner3 = shopurl + cbanner3[1]
						}
						//广告位4链接地址
						var cbanner4 = res.data.ad_pic_four.canshu.split(":");
						if (cbanner4[0] == 1) {
							this.cbanner4 = goodsurl + cbanner4[1]
						} else {
							this.cbanner4 = shopurl + cbanner4[1]
						}

						const date = new Date(Number(res.data.hdinfos.hdtime) * 1000)
						const getHours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
						let str = Number(res.data.hdinfos.end_time) - Number(res.data.hdinfos.dqtime)
						this.xm = getHours
						let strArr = this.$formatSeconds(str).split('-')
						this.countDown = {
							hour: parseInt(strArr[0]),
							minute: parseInt(strArr[1]),
							second: parseInt(strArr[2])
						}
					}
				})
			},

			getTab(src) {
				uni.switchTab({
					url: src
				})
			},

			getsing() {
				if (!uni.getStorageSync('token')) {
					this.getnav('/pages/loginSon/login?islogin')
				} else {
					this.getnav('/pages/personalSon/signin')
				}
			}
		},

		onPullDownRefresh() {
			dataObj.page=1
			this.loadingType = 0
			this.goodsList = []
			this.getgoodlst(dataObj)
			this.gethomeInfo()
		},

		onNavigationBarSearchInputClicked() {
			this.getnav('/pages/homeSon/searchAll?search_id=1')
		},

		onNavigationBarButtonTap(params) {
			if (params.index === 0) {
				this.getnav('/pages/homeSon/classification')
			} else {
				this.getnav('/pages/personalSon/ChatList')
			}
		},

		onReachBottom() {
			if (this.loadingType == 1 || this.loadingType == 2) {
				return false
			}
			this.loadingType = 1
			if(dataObj.timeDate){
				dataObj.page++
				this.getgoodlst(dataObj)
			}
			
		}
	}
</script>

<style lang="less">
	.index_class {
		background-color: #FFFFFF;
	}

	.type-fliter {
		position: relative !important;
	}

	.null {
		height: 16upx;
		background-color: #f3f3f3;
	}

	.adver {
		.adver-top {
			width: 100%;
			height: 200upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.adver-bottom {
			width: 100%;
			background-color: #f7d1ce;
			padding: 17upx;
			box-sizing: border-box;

			.adver-bot-list {
				width: 100%;
				padding: 32upx 24upx;
				border-radius: 10upx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.bot-item {
					width: 210upx;
					background-color: #f0a5a0;
					border: 2upx solid #f0a5a0;
					border-radius: 10upx;

					.bot-item-top {
						width: 100%;
						height: 204upx;
						background-color: #FFFFFF;
						border-radius: 10upx;
						>view{
							width: 100%;
							height: 100%;
							border-radius: 10upx;
							display: flex;
							justify-content: center;
							align-items: center;
							image{
							width: 80%;
							height: 80%;
								margin: auto;
							}
						}
					}

					.bot-item-text {
						text-align: center;

						.name {
							color: #FFFFFF;
							font-size: 20upx;
							white-space:nowrap;/*规定段落中的文本不进行换行*/
							overflow:hidden;/*内容会被修剪，并且其余内容是不可见的。*/
							text-overflow:ellipsis;/*显示省略号来代表被修剪的文本*/
						}

						.price {
							color: #FFFFFF;
							font-size: 22upx;

							text {
								color: #fbec79;
							}
						}
					}

				}
			}

		}
	}

	.home-header {
		position: relative;
		width: 100%;
		// height: 350upx;
		margin-bottom: 44upx;

		&>image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 230upx;
		}

		.swip_banner {
			position: relative;
			z-index: 1;
			width: 100%;
			padding-top: 22upx;

			swiper {
				height: 328upx;

				image {
					display: block;
					width: 702upx;
					height: 328upx;
					margin: 0 auto;
					border-radius: 10upx;
				}
			}
		}
	}

	.scroll-view {
		width: 100%;
		height: 120upx;
		white-space: nowrap; // 滚动必须加的属性

		.item {
			padding: 26upx 0;
			display: inline-block;
			text-align: center;
			color: #000000;
			width: 138upx;
			height: 120upx;
		}

		.active {
			color: #e8353b;
		}

	}

	.shop_bottom {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #f2f2f2;

		.shop_time {
			.shop-title {
				color: #646464;
			}

		}
	}
</style>
