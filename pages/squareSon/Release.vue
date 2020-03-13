<template>
    <view class="index_class">
        <view class="rele-areat">
            <!--  app 端状态栏站位 -->
            <view class="input-text">
                <textarea v-model="textValue" name="" id="" cols="30" rows="10" placeholder="想要说的话"></textarea>
                <view class="text-number">{{textValue.length}}/800</view>
            </view>

            <view class="addfile">
                <view class="grace-add-file">
                    <view class="grace-add-btn" @tap="addImg" v-if="btnImg">
                        <view>+</view><view>添加照片</view>
                    </view>
                    <view class="garce-items" v-for="(item, index) in imgLists" :key="index">
                        <image class="img" :src="item" mode="widthFix" :data-imgurl="item" @tap="showImgs"></image>
                        <view class="grace-close" @tap="removeImg" :id="'grace-items-img-'+index"></view>
                    </view>
                </view>
            </view>

			
			<view class="label-btn" >
                 <picker style="width:100%" @change="bindPickerChange"  :range-key="'goods_name'" :range="goodsList">
					<view class="uni-input">{{pickValue?pickValue['goods_name']:"选择商品"}}</view>
				</picker>
                <i class="iconfont icon_e60c"></i>
            </view>

            <view class="label" v-if="pickValue">
                <view class="label-title" v-if="graceSelectTips.length">
                    <text>贴上标签</text>
                    <!-- <view class="more">查看更多 <i class="iconfont icon_e60c"></i></view> -->
                </view>
                <view class="grace-select-tips">
                    <checkbox-group @change="graceSelectChange" name="tipName">
                        <label v-for="(item, index) in graceSelectTips" :key="index" :class="[item.checked ? 'grace-checked' : '']">
                            <checkbox :value="item.value" :checked="item.checked"></checkbox> {{item.name}}
                        </label>
                    </checkbox-group>
                </view>

                
            </view>
            <view class="person-button" style="margin:0;background-color:#fff;padding-top:40upx" >
				<!-- @click="getnav('/pages/personalSon/RefundDatecopy')" -->
				<button type="warn"  class="btn" @click="getaddthorder" >提交审核</button>
				
			</view>
        </view>
    </view>
</template>


<script>
var maxNum = 9, _self;
export default {
	data() {
		return {
			list: [1,2,3,4,5,6],
			imgLists : [],
            btnImg : true,
            graceSelectTips: [],
			textValue:'',
			goodsList:[],
			goddsName: [],
			pickValue:null,
		}
	},
	onLoad:function(){
		_self = this;
	},
	onShow(){
		this.getgoodsList()
		
	},
	watch: {
		pickValue(){
			/**
			 * 获取商品标签标签
			 */
			this.getfindtag(this.pickValue.cate_id)
		}
	},
	methods:{
		getfindtag(data){
			this.$http.getfindtag({gid:data}).then(res=>{
				if(res.status == 200) {
					this.graceSelectTips = res.data.data
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
						this.$showModal('最多上传9张图片');
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
        

        graceSelectChange: function (e) {
			var checkVal = e.detail.value;
			for (var i = 0; i < this.graceSelectTips.length; i++) {
				if (checkVal.indexOf(this.graceSelectTips[i].value + '') != -1) {
					this.graceSelectTips[i].checked = true;
				} else {
					this.graceSelectTips[i].checked = false;
				}
			}
			this.graceSelectTips = this.graceSelectTips;
		},

		/**
		 * 图片上传
		 */
		getuploadspic () {
			if(this.imgLists.length == 0) {
				this.$toast('请先上传图片')
				return false
			}
			return new Promise(resolve=>{
				this.$http.getuploadspic(this.imgLists,'apicloud/find/uploadspic').then(res=>{
					if(res.status == 200) {
						resolve(res.images)
					}
				})
			})
		},
		/**
		 *提交审核
		 */
		async getaddthorder(){
			if(this.textValue == '') {
				this.$toast('请输入分享内容')
				return false
			}
			// if(this.pickValue.length == '') {
			// 	this.$toast('请输选择商品')
			// 	return false
			// }
			let str = await this.getuploadspic()
			let data = {
				describe:this.textValue,
				tags:'',
				gid:this.pickValue.id,
				pic: str.join(',')
			}
			this.$loading()
			this.$http.getaddfind(data).then(res=>{
				if(res.status == 200) {
					this.$toast(res.mess)
					setTimeout(()=>{
						this.getback()
					},1000)
				}
			})
		},



		getgoodsList(){
            this.$http.getgoodsList().then(res=>{
				console.log(this.goodsList)
                if(res.status == 200) {
                    this.goodsList = res.data
					console.log(this.goodsList)
                }
            })
		},
		bindPickerChange(e) {
		   let i=e.detail.value
		   this.pickValue=this.goodsList[i];
		}
	}
}
</script>

<style>
.grace-select-tips uni-label {
	overflow: hidden;
    border-radius: 5px;
	height: auto;
}
.garce-items .img{
	width: 100%;
	height: 100%!important;
}
.grace-add-file .garce-items .grace-close {
	top: 5px;
}
</style>
