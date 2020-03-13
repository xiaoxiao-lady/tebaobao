<template>
    <view class="index_class">
      <view class="bus-top">
			<!-- <view class="status"></view>
			<view class="to-tltle">
				<i class="iconfont icon_e675 back" @click="getback()"></i>
				筛选
			</view> -->
			<view class="bus-title-search" >
				<view class="bus-search" @click="getnav('/pages/homeSon/searchAll?search_id=1')">
					<i class="icon iconfont icon_e819"></i>
					<input placeholder="请输入关键词搜索" disabled="true" />
					<view class="bus-tap">搜索</view>
				</view>
			</view>
			<view class="header-filter"> 
				<view class="items" :class="{'filter-active':showingIndex1 === 1}" @tap="showOptions(1, 'zonghe')">综合</view>
				<view class="items" :class="{'filter-active':showingIndex1 === 2}" @tap="showOptions(2, 'deal_num')">销量</view>
				<view class="items money_al" :class="{'filter-active':showingIndex1 === 3}"  @tap="showOptions(3)">
					<text>价格</text>
					<view class="over">
							<i class="iconfont icon_eb15" :class="{'ac-color': filteAl === 1}"></i>
							<i class="iconfont icon_eb14" :class="{'ac-color': filteAl === 2}" ></i>
					</view>
				</view>
				 <view class="items" @click="clickType" >店铺</view>
				<view class="items"  :class="{'filter-active':showingIndex1 === 4}" @tap="showOptions4">
					筛选
					<i class="iconfont icon_e649"></i>
				</view>
						
			</view>
			<!-- 第四个选项 -->
			<view class="filter-abso" catchtouchmove="return">
				<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer" >
					<scroll-view style="height: 100%" :scroll-y="true">
						<view class="drawer-item">
							<view class="dr-title" style="padding-top: 20upx">类型</view>
							<view class="dr-types">
								<text class="type-list" :class="{'active':time.check }" @click="getCheck(i3)" v-for="(time,i3) in shop" :key="i3">{{ time.str }}</text>
								
							</view>
						</view>
						<view class="drawer-item">
							<view class="dr-title">价格区间(元)</view>
							<view class="dr-types-monry">
								<view>
									<input type="number"  v-model="low_price" placeholder="低价格">
								</view>
								<view>
									<input type="number" v-model="max_price" placeholder="高价格">
								</view>
								<view class="to-bgc"></view>
							</view>
						</view>			
						<view class="type-text" v-for="(item, index) in filteList" :key="index">
							<view class="type-title" @click="getHeight(item.id)">
								<text>{{ item.attr_name }}</text>
								<i class="iconfont icon_eb17" hover-class="item-active-hover"></i>
							</view>
							<view class="type-add">
								<view class="text-over" :style="{'height': item.height,'transition': 'all 0.3s ease-out'}">
									<text @click="getId(item.id,i,value)" :class="{ 'active': item.active === value}" class="type-list" v-for="(value, i) in item.attr_values" :key="i">{{ value }}</text>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="conmfir">
						<view @click="rightDrawerLoad">重置</view>
						<view class="complete" @click="completeSearch">确定</view>
					</view>
				</uni-drawer>
			</view>
		</view>
		<view class="type-fliter"   >
			<!-- <view class="status-active"></view> -->
			<view class="r-list" >
				<view class="r-items" hover-class="item-active-hover" @click="getnav('/pages/homeSon/shop_details?id='+item.id)" v-for="(item, index) in goodsList" :key="index">
					<image class="grace-img-lazy" :src="isShow[index] ? item.thumb_url : '../../static/logo.png'"  />
					<text>{{ item.goods_name }}</text>
					<view class="r-money">
						<text>¥{{ item.zs_price }}</text>
						
					</view>
					<view class="r-bottom">
						<image v-if="item.coupon" src="../../static/images/img/juan.png" />
						<text v-if="item.is_activity === 1">秒杀</text>
						<text v-if="item.is_activity === 2">团购</text>
						<text v-if="item.leixing === 1">自营</text>
					</view>
				</view>					
			</view>
			<view class="depot" v-if="isshow">
				<image class="img" src="../../static/images/img/shopinfo.png" />
				<view class="tps" style="margin-top:15upx;">暂无商品</view>
			</view>
			<loadMore :loadingType="loadingStatus"></loadMore>
		</view>
    </view>
</template>

<script>
import uniDrawer from '../../components/uni-drawer.vue';
// import uniShrink from "../../components/uni-shrink.vue";
var  graceLazyload = require("../../graceUI/graceLazyload.js");
let page = 1
let shopType = 'all'
let goods_attr = []
	export default {
		components:{
			uniDrawer,
			// uniShrink
		},
		data(){
			return {
				isshow: false,
				showingIndex1: 1,
				// orderIndex: 0,
				loadingStatus: 0,
				sortType: '',
				filteList: [],
				currValue: 0,
				filteAl: 0,
				indexid: 0,
				cateId: '',
				goodsList: [],
				rightDrawerVisible:false,
				shop:[{check:true,str:'全部商品',type:'all'},{check:false,str:'自营商品',type:1},{check:false,str:'活动商品',type:2}],
				low_price:'', // 最低价格
				max_price:'',  // 最高价格
				isShow:[],  //需要展示的图片记录
				valueStatus: 0,  // 更新页面状态 防止页面卡死
			}
		},
		onShow(){
			
		},
		onLoad () {
			page = 1
			this.cateId = this.$mp.query.id
			this.$loading()
			this.getGoodsList({
				page: page,
				cate_id: this.$mp.query.id
			})
		},
		onPageScroll(e){
			// 懒加载
			
			graceLazyload.load(e.scrollTop, this);
		},
		watch: {
			rightDrawerVisible(){
				/**
				 * 更新页面状态 防止页面卡死
				 */
				this.statusMath(this)
			}
		},
		methods: {
			rightDrawerLoad(){
				page = 1
				this.$loading()
				this.loadingStatus = 0
				this.shop.forEach( (el,index)=>{
					el.check = false
					if(index == 0) {
						el.check = true
					}
				})
			
				this.getGoodsList({
					page: page,
					cate_id: this.cateId
				})
			},
			closeRightDrawer() {
				
				this.rightDrawerVisible = false;
			},
			showRightDrawer() {
				this.rightDrawerVisible = true;
			},
			getGoodsList (params) {  // 获取商品分类接口
			
				this.$http.getCategoryGoodsList(params).then(res => {
					if (res.status === 200) {
						this.goodsList = res.data.goodres
						if(this.goodsList.length == 0) {
							this.isshow = true
							} else {
							this.isshow = false
						}
						this.filteList = res.data.shaixuan.map(item => {
							item.height = uni.upx2px(150) + 'px'
							item.active = null
							return item
						})
						graceLazyload.load(500, this);
						/**
						 * 更新页面状态 防止页面卡死
						 */
						this.statusMath(this)
						
					} else {
						this.$toast(res.mess)
					}
				})
			},

			showOptions (index, sortType) {
				if (index !== 3 && this.showingIndex1 === index) return false
				this.sortType = sortType
				this.loadingStatus = 0

				if (index === 3) {
					if (this.filteAl === 1) {
						this.filteAl = 2
					} else {
						this.filteAl = 1
					}
				}

				if (index !== 3) {
					this.filteAl = 0
				}
				this.showingIndex1 = index
				page = 1

				this.$loading()
				this.$http.getCategoryGoodsList({
					page: 1,
					cate_id: this.$mp.query.id,
					// goods_attr:goods_attr.join(','),
					sort: index === 3 ? this.sortOrder() : this.sortType,
					// low_price:this.low_price,
					// max_price:this.max_price,
				}).then(res => {
					if (res.status === 200) {
						
						this.goodsList = res.data.goodres
						
						this.loadingStatus = 0
					} else {
						this.goodsList = []
						this.loadingStatus = 2
						// this.$toast(res.mess)
					}
					if(this.goodsList.length == 0) {
						this.isshow = true
						} else {
						this.isshow = false
					}
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 0
					})
				})
			},

			showOptions4:function(){
				// if(this.showingIndex1 != 0){this.showingIndex1 = 0; return ;} this.showingIndex1 = 4;
				this.showRightDrawer()
			},

			sortOrder (index) {
				if (this.filteAl === 1) {
					return 'low_height'
				} else {
					return 'height_low'
				}
			},

			// 选择分类
			changeOrder:function(e){
				var tapIndex = e.target.dataset.itemid
				// this.orderIndex = tapIndex
				this.showingIndex1 = 0;
			},
			clickActive:function(i) {
				this.indexid = i
			},

			/**
			 * getHeight（）
			 *  计算商品筛选展开高度
			 */
			getHeight(id){ 
				this.filteList.forEach(element => {
					if(element.id == id) {
						const index = Math.ceil(element.attr_values.length / 3)
						
						if (element.attr_values.length <= 6) return false

						if(element.height == uni.upx2px(150) + 'px') {
							let view = uni.createSelectorQuery().select(".type-list");
							view.fields({
							size: true,
							scrollOffset: true
							}, data => {
								
								element.height = (Number(data.height) + 15) * index  +'px'
								
							}).exec();
						} else {
							element.height = uni.upx2px(150) + 'px'
						}						
					}
				})
			},
			/**
			 * getId（）
			 *  点击分类选中
			 */
			getId(id,index,value){
				this.filteList.forEach( (element,i) => {
					if(id == element.id) {
						for(var i2 =0;i2 <= element.attr_values.length -1;i2++ ) {
							if(value == element.attr_values[i2]) {	
								// element.active = element.active == null? element.attr_values[i2] :element.activ
								element.active = element.attr_values[i2]
							}
						}	
					}
				})	
					
			},
			/**
			 * completeSearch
			 *  确认筛选项
			 */
			completeSearch(){
				goods_attr = []
				this.rightDrawerVisible = false
				this.filteList.forEach(element=>{
					if(element.active) {
						goods_attr.push(element.id + ":" + element.active) 
					}
					 
				})
				let data = {
					goods_type:shopType,
					low_price:this.low_price,
					max_price:this.max_price,
					goods_attr:goods_attr.join(','),
				}
				
				page = 1
				this.loadingStatus = 0
				if (this.loadingStatus !== 0) return false

				this.loadingStatus = 1
				this.goodsList = []
				this.$loading()
				this.$http.getCategoryGoodsList({
					page: page,
					cate_id: this.$mp.query.id,
					sort: this.showingIndex1 === 3 ? this.sortOrder() : this.sortType,
					...data
				}).then(res => {
					if (res.status === 200) {
						if(this.goodsList.length == 0) {
							this.isshow = true
						} else {
                        this.isshow = false
                    }
						if(res.data.goodres.length == 0) {
							this.loadingStatus = 2
							return false
						}
						this.goodsList = res.data.goodres
						this.loadingStatus = 0
						
					} else {
						// this.$toast(res.mess)
					}
					
				}).catch(() => {
					this.loadingStatus = 0
				})
			},
			getCheck(index){
				this.shop.forEach( (el,i)=>{
					el.check = false
					if(index == i) {
						el.check = true
						shopType = el.type
					}
				})
			},
			/**'
			 * 店铺分类 
			 */
			clickType(){
				let searchObj = {
					cate_id: this.cateId,
					type:1
				}
				console.log(searchObj)
				this.getnav('/pages/homeSon/theShop?searchObj=' + JSON.stringify(searchObj))
			}
			
		},

		onReachBottom () {
			if (this.loadingStatus !== 0) return false

			this.loadingStatus = 1
			this.$http.getCategoryGoodsList({
				page: page + 1,
				cate_id: this.$mp.query.id,
				sort: this.showingIndex1 === 3 ? this.sortOrder() : this.sortType,
				low_price:this.low_price,
				max_price:this.max_price,
				goods_attr:goods_attr.join(','),
			}).then(res => {
				if (res.status === 200) {

					if(res.data.goodres.length == 0) {
						this.loadingStatus = 2
						return false
					}
					graceLazyload.load(500, this); 
					this.goodsList = this.goodsList.concat(res.data.goodres)
					this.loadingStatus = 0
					page = page + 1
				} else {
					// this.$toast(res.mess)
				}
			}).catch(() => {
				this.loadingStatus = 0
			})
		},
		
	}
</script>

<style scope>
page {
	background: #f4f4f4;
}


.index_class, page {
	height: 100%;
}
.to-tltle {
	padding:0!important;
	margin:0!important;
}
.status {
	background-color:red!important;
	position: relative!important;
}
.type-fliter {
    padding-top: 191upx; 
}
</style>
