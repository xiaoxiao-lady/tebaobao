<template>
	<view class="index_class">
		<!-- 发布评价 -->
		<view style="background-color:#fff">
			<view class="evaluate-til">
				
				<text class="shopyes">描述相符</text>
				<view class="feedback-star-view">
					<i class="iconfont " style="margin-right:35upx;" v-for="(value,key) in stars" :key="key" :class="key < sendDate.score ? 'icon_e68d' : 'icon_e689'"
					 @tap="chooseStar(value)"></i>
				</view>
				<text class="score">{{sendDate.content}}</text>
			</view>
			<textarea class="text-ps" v-model="areaText" placeholder="宝贝满足您的期待吗? 说说您的使用心得">

            </textarea>

			<view class="addfile">
				<view class="grace-add-file">
					<view class="grace-add-btn" @tap="addImg" v-if="btnImg">
						<view>+</view>
						<view>添加照片</view>
					</view>
					<view class="garce-items" v-for="(item, index) in imgLists" :key="index">
						<image class="img" :src="item" mode="widthFix" :data-imgurl="item" @tap="showImgs"></image>
						<view class="grace-close" @tap="removeImg" :id="'grace-items-img-'+index"></view>
					</view>
				</view>
			</view>
			<view class="anonymous">
				<view>
					<i class="iconfont icon_e68e" @tap="checkbox" :class="[check?'checkColor' : '']" style="margin-right:20upx;"></i>
					匿名
				</view>
				<text>您的评价能帮助其他的小伙伴哦</text>
			</view>
		</view>

		<view class="shoppin">
			<view>
				<i class="iconfont icon_e79f"></i>
				店铺评分
			</view>
			<view class="feedback-star-view">
				<text>服务态度</text>
				<i class="iconfont " style="margin-right:35upx;" v-for="(value,key) in stars" :key="key" :class="key < sendservice.score ? 'icon_e68d' : 'icon_e689'"
				 @tap="service(value)"></i>
			</view>
			<view class="feedback-star-view">
				<text>物流服务</text>
				<i class="iconfont " style="margin-right:35upx;" v-for="(value,key) in stars" :key="key" :class="key < sendlogistics.score ? 'icon_e68d' : 'icon_e689'"
				 @tap="logistics(value)"></i>
			</view>
		</view>

	</view>
</template>

<script>
	var maxNum = 9,
		_self;
	export default {
		data() {
			return {
				stars: [1, 2, 3, 4, 5],
				sendDate: {
					score: 0,
					content: " "
				},
				sendlogistics: {
					score: 0,
					content: " "
				},
				sendservice: {
					score: 0,
					content: " "
				},
				check: false,
				areaText: "",
				imgpath: '',
				orderId: '',
				imgLists: [],
				btnImg:true //上传图片的选择按钮是否显示
			}
		},
		methods: {
			chooseStar(e) {
				this.sendDate.score = e
				switch (e) {
					case 5:
						this.sendDate.content = '非常好'
						break;
					case 4:
						this.sendDate.content = '满意'
						break;
					case 3:
						this.sendDate.content = '一般'
						break;
					case 2:
						this.sendDate.content = '不满意'

				}
			},
			service(e) {
				this.sendservice.score = e
			},
			logistics(e) {
				this.sendlogistics.score = e
			},
			checkbox() {
				this.check = !this.check
			},
			getuploadspic() {
				if (this.imgLists.length == 0) {
					this.$toast('请先上传图片')
					return false
				}
				return new Promise(resolve => {
					this.$http.getuploadspic(this.imgLists, 'apicloud/find/uploadspic').then(res => {
						if (res.status == 200) {
							resolve(res.images)
						}
					})
				})
			},
			async addFbevluate() {
				if (!this.sendDate.score) {
					this.$toast('请选择评价星级')
					return false
				}
				let str = await this.getuploadspic();
				let data = {
					pic_img: str.join(','),
					xing: this.sendDate.score,
					order_id: Number(this.orderId),
					content: this.areaText,
					anonymous:Number(this.check) ,
					attitude_xing: this.sendservice.score,
					logistics_xing: this.sendlogistics.score,
				}
				this.$loading("正在发布")
				this.$http.getOrderEvaluate(data).then(res => {
					if (res.status == 200) {
						this.$toast(res.mess)
						setTimeout(() => {
							this.getback()
						}, 1000)
					}
				})
			},
			addImg : function(){
				var num = maxNum - _self.imgLists.length;
				if(num < 1){return false;}
				uni.chooseImage({
					count: num,
					sizeType: ['compressed'],
					success: function(res) {
						_self.imgLists = _self.imgLists.concat(res.tempFilePaths);
						if (_self.imgLists.length >= maxNum){
							_self.btnImg = false;
						}
						uni.hideLoading();
						
					}
				});
			},
			removeImg : function(e){
				var index = e.currentTarget.id.replace('grace-items-img-', '');
				_self.imgLists.splice(index, 1);
				_self.imgLists = _self.imgLists;
				if (_self.imgLists.length < maxNum) {
					_self.btnImg = true;
				}
			},
			showImgs : function(e){
				var currentImg = e.currentTarget.dataset.imgurl;
				uni.previewImage({
				  urls: this.imgLists,
				  current : currentImg
				})
			},
			
			
		},

		/**
		 * 图片上传
		 */
	


		onNavigationBarButtonTap(e) {

			this.addFbevluate();

		},
		onLoad(options) {
			console.log(options)
			_self = this;
			let a=uni.getStorageSync("userInfo");
			console.log(JSON.parse(a))
			this.orderId = options.id;
		
		}

	}
</script>

<style>
	.checkColor {
		color: #FF5001;
	}
</style>
