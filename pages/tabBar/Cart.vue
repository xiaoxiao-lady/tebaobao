<template>
	<view class="grace-padding index_class">
		<view class="cart-scoll" >
			<view class="grace_class" v-for="(itemList, keys) in cartlist" :key="keys">
				<!-- 分类 -->
				<view class="cart_top" style="padding-left:22upx;">
					<view class="cart_title" >
						<i class="iconfont " style="padding-left:0;" :class="itemList.icon ? 'icon_e632' :'icon_e741'" @click="getShop(keys)"></i>
						<i class="iconfont icon_e79f"></i>
						<text @click.stop="getnav('/pages/homeSon/storeDetails?shop_id='+itemList.goodres[0].shop_id )">{{itemList.goodres[0].shop_name}}</text>
					</view>
					<!-- <i class="iconfont icon_e60c"></i> -->
					<text @click="copyjuan(itemList.goodres[0].shop_id)" v-if="itemList.couponinfos.is_show === 1">领劵</text>
					<i class="iconfont icon_e60c" v-else></i>
				</view>
				
				<view class="grace-shoppingcard" @click.stop="getnav('/pages/homeSon/shop_details?id='+cart.goods_id)" v-for="(cart, index) in itemList.goodres" :key="index">
					<!-- <view class="shop-name grace-blod">{{item.shopName}}</view> -->
					<view class="goods">
						<i class="iconfont " style="padding-left:0;" :class="cart.icon ? 'icon_e632' :'icon_e741'" @click.stop="isSelection(cart.id,cart.shop_id)"></i>
						<image :src="cart.thumb_url" ></image>
						<view class="desc">
							<view class="goods-title grace-columns" >
								<text class="to_name">{{cart.goods_name}}</text>
								<text class="to_text">{{cart.goods_attr_str}}</text>
							</view>
							<view class="goods-title grace-columns" v-if="cart.is_activity !== 0" >
								<view class="to_text">活动结束还剩{{cart.sytime}}</view>
								<view class="to_text" v-if="cart.is_activity == 1"> 限购{{cart.xznum}}件</view>
							</view>
							<view class="goods-price">
								<text class="color">￥{{cart.shop_price}}</text>
								<view class="goods-number">
								
									<uni-number-box :index="index" :value="cart.num" :idcode='cart.id' :min="1"  v-on:change="numberChange" :max="cart.is_activity == 1 ? cart.xznum : 10000"></uni-number-box>
									
								</view> 
							</view>
						
						</view>
					</view>
				</view>

				<view class="grace_discount">
					<view v-if="itemList.couponinfos.is_show == 1">
						<text class="infos_name">优惠券</text>
						<text>{{itemList.couponinfos.infos}}</text>
					</view>
					<view class="grace-disp" v-if="itemList.promotions.is_show == 1">
						<text class="infos_name">活动</text>
						<view class="infos_list">
							<text v-for="(time,is_key) in itemList.promotions.infos" :key="is_key">{{time}}</text>
						</view>
					</view>
				</view>
				

		</view>

		<view class="depot" v-if="cartlist.length == 0 && !isLoading">
			<image class="img" src="../../static/images/img/cartinfo.png" />
			<view class="tps">您的购物车空空如也~</view>
			<view class="stroll" @click="getnav('/pages/homeSon/classification')">到处逛逛</view>
		</view>
		<loadMore :loadingType="loadingType" ></loadMore>
		</view>
		<!-- 底部  -->
		<view class="grace-footer" v-if="cartlist.length" style="padding-left:22upx;">
			<i class="iconfont "  style="padding-left:0;" :class="allEle ? 'icon_e632' :'icon_e741'" @tap="allElection"></i> 全选
			<view style="width:40%; line-height:90upx; text-indent:1em;" v-show="editId == false">
				总计 <text style="font-size:36upx;" class="color">￥{{totalprice ? totalprice : 0}}</text>
			</view>
			<view style="width:40%; line-height:90upx; text-indent:1em;" v-show="editId == true">
				
			</view>
			<view style="width:40%;border:0" >
				<button type="warn" style="border:0" class="clickBgc" @tap="checkout" v-if="editId == false">立即结算</button>
				<button type="warn" style="border:0" class="clickBgc"  v-else @click="delect">删除</button>
			</view>
		</view>
		<popup-layer ref="popupRef" :direction="'top'">
			<view class="popup-coupon" >
				<view class="popup-title">优惠</view>
				<view class="coupon-list" >
					<view class="items" v-for="(getcouponlstList,getcouponlstKey) in getcouponlst" :key="getcouponlstKey">
						<view class="coupon-left">
							<view>￥ <text>{{getcouponlstList.dec_price}}</text>店铺优惠券</view>
							<text>满{{getcouponlstList.man_price}}使用</text>
							<text>有限期{{getcouponlstList.start_time}}-{{getcouponlstList.end_time}}</text>
						</view>
						<view class="coupon-right">
							<text @click="Receive(getcouponlstList.id)" v-if="getcouponlstList.have == 0">立即领取</text>
							<text style="background:#999"  v-if="getcouponlstList.have == 1">已领取</text>
						</view>
					</view>
				</view>

				<view class="popup-com">
					<button @click="hidePopup">关闭</button>
				</view>
			</view>
		</popup-layer>
		<login :islogin="islogin"></login>
	</view>
</template>
<script>

let shopIdList = []   // 购物车选中id
let page = 1  // 列表分页
let str = '编辑'
import uniNumberBox from '../../components/uni-number-box.vue'
import login from '../../components/login.vue'
export default {
	data() {
		return {
			//总价
			totalprice: '',
			cartlist: [],
			getcouponlst: [],
			shop_id: '',
			allEle: false,
			editId: false,
			islogin: 0,
			loadingType: 0,
			isLoading: false
		}
	},
	onLoad () {
		this.countTotoal();
	},
	onShow () {
		shopIdList=[]
		if(!uni.getStorageSync('token')) {
			this.islogin = 1
			return false
		}
		// page = 1
		
		this.islogin = 0
		this.allEle = false
		this.totalprice = 0;	
		// this.loadingType = 0
		this.$store.dispatch('contentnum')
		this.getCartList()
	},

	components:{
		uniNumberBox,
		login
	},

	methods: {
		//点击空布局按钮的回调
		emptyClick(){
				this.getnav('/pages/homeSon/classification')
		},

		copyjuan(id){
			this.shop_id = id
			
			this.$refs.popupRef.show()
			/**
			 * shop_id  :  商家id
			 * 获取优惠券列表
			 */
			this.$loading()
			this.$http.getcouponlst({shop_id:id}).then(res=>{
				if(res.status == 200) {
					this.getcouponlst = res.data
				}
			})
		},
		/**
		 * coupon_id : 优惠券id
		 * 立即领取优惠券
		 */
		Receive(id){
			this.$http.getcoupons({coupon_id:id,shop_id:this.shop_id}).then(res=>{
				if(res.status == 200) {
					this.$toast(res.mess)
					this.getcouponlst.forEach(element => {
						if(element.id == id) {
							element.have = 1
						}
					});
				}
			})
		},
		hidePopup(){
			this.$refs.popupRef.close()
			
		},

		// 商家全选
		getShop(keys)  {
			for(let k in this.cartlist) {
				if(k == keys) {
					this.cartlist[k].icon = !this.cartlist[k].icon

					if(this.cartlist[k].icon) {

						for(let l=0 ; l <this.cartlist[k].goodres.length; l++) {
							this.cartlist[k].goodres[l].icon = 1
							if(!shopIdList.includes(this.cartlist[k].goodres[l].id)) {
								shopIdList.push(this.cartlist[k].goodres[l].id)
							} 
							
						}
					} else {
						for(let l=0 ; l <this.cartlist[k].goodres.length; l++) {
							this.cartlist[k].goodres[l].icon = 0
							if(shopIdList.includes(this.cartlist[k].goodres[l].id)) {
								shopIdList.forEach( (el,index)=>{
									if(this.cartlist[k].goodres[l].id == el) {
										shopIdList.splice( index,1)
									}
								})
	
							}
							
						}
					}
				} 		
			}

			let shoplistArr = []
			for(let p in this.cartlist) {
				if(this.cartlist[p].icon) {
					shoplistArr.push(this.cartlist[p].icon)
				}
			}

			if(shoplistArr.length === Object.keys(this.cartlist).length) {
				this.allEle = 1
			} else {
				this.allEle = 0
			}
			
			this.countTotoal();
		},
        // 复选框
		isSelection (index, shopId) {
			let itList = []
			for(var k in this.cartlist) {
				if(this.cartlist[k].goodres[0].shop_id == shopId) { 
					itList = this.cartlist[k].goodres
					for (var i =0;i < itList.length;i++) {
						if (index == itList[i].id ) {
							itList[i].icon = !itList[i].icon
							if(itList[i].icon) {
								if( !shopIdList.includes(index)) {
									shopIdList.push(index)
								} 
							} else {
								if( shopIdList.includes(index)) {
									shopIdList.splice(shopIdList.indexOf(index),1)
								} 
							}
						} 	
					}
				}	
			}
			let isSelect = []
			itList.forEach(item => {
				if (item.icon) {
					isSelect.push(item.icon)
				}
			});

			if(isSelect.length == itList.length) {
				let chArr = []
				for(let k in this.cartlist) {
					for(var a=0;a <this.cartlist[k].goodres.length; a++) {
						if(this.cartlist[k].goodres[a].shop_id == shopId) {
							this.cartlist[k].icon = 1
						} 
					}	
				}
				for(let k in this.cartlist) {
					if(this.cartlist[k].icon) {
						chArr.push(chArr)
					}
				}
				
				if(chArr.length == this.cartlist.length) {
					this.allEle = 1
				} 
			} else {
				for(let k in this.cartlist) {					
					for(var a=0;a <this.cartlist[k].goodres.length; a++) {
						if(this.cartlist[k].goodres[a].shop_id == shopId) {
							this.cartlist[k].icon = 0
							
						} 
					}	
				}

				this.allEle = 0
			}
			this.countTotoal()

        },
        allElection(){
            // 全选
            this.allEle = !this.allEle
            shopIdList = []
            if(this.allEle) {
				for(let k in this.cartlist) {
					this.cartlist[k].icon = 1
					for (var i = 0; i < this.cartlist[k].goodres.length; i++){
						this.cartlist[k].goodres[i].icon = 1
						if(this.cartlist[k].goodres[i].icon) {
							if( !shopIdList.includes(this.cartlist[k].goodres[i].id)) {
								shopIdList.push(this.cartlist[k].goodres[i].id)
							} 
						} else {
							if( shopIdList.includes(this.cartlist[k].goodres[i].id)) {
								shopIdList.splice(shopIdList.indexOf(this.cartlist[k].goodres[i].id),1)
							} 
						}
					}
				} 
            } else {
                for(let k in this.cartlist) {
					this.cartlist[k].icon = 0
					for (var i = 0; i < this.cartlist[k].goodres.length; i++){
						this.cartlist[k].goodres[i].icon = 0
						
					}
				}
            }
            this.countTotoal()
        },
		//计算总计函数
		countTotoal:function(){
			var total = 0;
			for(let k in this.cartlist) {
				for (var i = 0; i < this.cartlist[k].goodres.length; i++){
					if(this.cartlist[k].goodres[i].icon == 1) {
						total += (this.cartlist[k].goodres[i].shop_price) * Number(this.cartlist[k].goodres[i].num);
					}
					
				}
			}
			
			this.totalprice = total;
		},
		numberChange:function(data,id){
			for(let k in this.cartlist) {
				for (var i = 0; i < this.cartlist[k].goodres.length; i++){
					if(this.cartlist[k].goodres[i].id == id) {
						this.cartlist[k].goodres[i].num = Number(data)
						
					}
					
				}
			}
			if(id && data) {
				this.$http.geteditcart({cart_id:id,num:data}).then(res=>{
					if(res.status == 200 ) {
						//计算总价
						// this.$store.dispatch('contentnum')
						this.countTotoal();
					}
				})
			}
			
			
		},
		checkout:function(){
			if(shopIdList.length == 0) {
				this.$toast('请先选择商品')
				return false
			}
			// 确认订单结算
			this.$http.getcartbuy({cart_idres:shopIdList.join(',')}).then(res=>{
				if(res.status == 200) {
					this.getnav('/pages/homeSon/ConfirmationOrder?cart_idres='+ res.data.cart_idres + '&type=' + 2)
				}
			})

		},
		// 删除购物车商品
		delect(){
			let isdelectList = []
			shopIdList = []
			for(let k in this.cartlist) {
				for (var i = 0; i < this.cartlist[k].goodres.length; i++){
					if(this.cartlist[k].goodres[i].icon == 1) {
						isdelectList.push(this.cartlist[k].goodres[i].id)
					}
				}
			}
			if(isdelectList.length == 0) {
				this.$toast('请先选择商品')
				return false
			}
			this.$loading()
			this.$http.getdelcart({cart_id:isdelectList.join(',')}).then(res=>{
				if(res.status == 200) {
					this.$toast(res.mess)
					page = 1
					this.allEle = false
					this.totalprice = 0;
					this.loadingType = 0
					this.$store.dispatch('contentnum')
					this.cartlist = []
					this.mescroll.resetUpScroll()
				}
			})
		},
		// 获取购物车信息
		getCartList (isFrash) {
			if (this.isLoading) return
			this.isLoading = true
			this.$http.getCartList({page:page}).then(res=>{
				if(res.status == 200) {
					this.isLoading = false
					if(page == 1) {
						this.cartlist = res.data
						return false
					}

					if(res.data.length == 0) {
						
						this.loadingType = 2
						
						return false
					}
					if (isFrash) {
						this.cartlist = res.data
					} else {
						this.cartlist = [...this.cartlist,...res.data]
					}
					this.loadingType = 0
				}
			}).catch(err => {
				this.isLoading = false
			})
		}


	},
	onPullDownRefresh(){
		page = 1
		this.loadingType = 0
		this.$nextTick(() => {
			this.getCartList(true)
		})
	},
	onReachBottom () {
		if(this.loadingType == 1 || this.loadingType == 2) { return false }
		this.loadingType = 1
		
		page++
		this.getCartList()
	},
	onNavigationBarButtonTap(e) {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			let currentWebview = page.$getAppWebview();
			let titleNView = currentWebview.getStyle().titleNView;
			// 添加文字过长截取为3个字符，请根据自己业务需求更改
			str = titleNView.buttons[0].text == "编辑"?'完成' :'编辑'
			this.editId = !this.editId
			titleNView.buttons[0].text = str;
			currentWebview.setStyle({
					titleNView:titleNView
			});
	}
}
</script>
<style lang="less">
.grace-footer {
	display: flex;
	justify-content: space-between;
	bottom: var(--window-bottom)
}
.mescroll-empty .empty-icon {
	width:75%!important;
}

</style>

