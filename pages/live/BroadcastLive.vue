<template>
  <view class="live">
    <view class="live-header" @click="upLoadImg">
      <text>封面</text>
      <view class="cover">
        <image v-if="coverImg" :src="coverImg" />
        <span v-if="!coverImg"></span>
        <i class="iconfont">&#xe67f;</i>
      </view>
    </view>
    <view class="live-body">

      <picker mode="selector" :value="0" :range="navNameList" @change="getItemName">
        <view class="live-item">
            <view class="list-left">
              本次直播分类
            </view>
            <view class="right">
              <span>{{ chooseItem.type_name }}</span>
              <i class="iconfont icon_e60c"></i>
            </view>
        </view>
      </picker>
      <view class="live-content">
        <view class="live-content__item">
          <image src="../../static/images/item.png" />
          <text>直播间封面必须为主播精修的的自拍照片</text>
        </view>
        <view class="live-content__item">
          <image src="../../static/images/item.png" />
          <text>直播间标题须与产品/活动有关</text>
        </view>
        <view class="live-content__item">
          <image src="../../static/images/item.png" />
          <text>禁止镜头前无人(挂机)且不介绍商品现象</text>
        </view>
        <view class="live-content__item">
          <image src="../../static/images/item.png" />
          <text>新手请关注APP中的新手专区或咨询客服 微信:dsfsd23423</text>
        </view>
      </view>
    </view>
    <view class="live-btn" hover-class="text-hover" @click="toLive">发起直播</view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        navList: [],
        navNameList: [],
        chooseList: [],
        index: 0,
        coverImg: '',
        chooseItem: {}
      }
    },

    onLoad () {
      this.$http.getNavList().then(res => {
        if (res.status === 200) {
          this.navList = res.data.slice(1)
          this.navNameList = res.data.slice(1).map(item => {
            return item.type_name
          })
        }
      })
    },

    methods: {
      bindPickerChange (e) {
        this.index = e.target.value
      },

      getItemName (e) {
        this.chooseItem = this.navList[e.target.value]
      },

      toLive () {
            // this.getnav(`/pages/live/Anchor`)
            // return
        if (!this.coverImg) {
          this.$toast('请上传直播封面图')

          return false
        }

        if (!this.chooseItem.id) {
          this.$toast('请选择直播分类')

          return false
        }

        this.$http.launchalive({
          cover: this.coverImg,
          cateid: this.chooseItem.id
        }).then(res => {
          if (res.status === 200) {
            uni.setStorageSync('pullurl', res.data.addr)
            uni.setStorageSync('shopid', res.data.shop_id)
            this.getnav(`/pages/live/Anchor?url=${res.data.addr}`)
          }
        }).catch(err => {
          console.log(err)
        })
      },

      upLoadImg () {
        this.$utils.chooseImg().then(res => {
          this.$loading('上传中')
          uni.uploadFile({
          	url: 'https://nycs.maitexun.cn/apicloud/find/uploadspic',
            filePath: res.tempFilePaths[0],
            name: 'file',
            success: res => {
							const data = JSON.parse(res.data)
							if (data.code === 200) {
                this.coverImg = data.data.src.wz
                this.$hideLoading()
							} else {
								this.$toast(data.mess)
							}
						},
						
						fail: err => {
							this.$hideLoading()
						}
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .live-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24upx;
    color: #333;
    font-size: 30upx;
    border-bottom: 16upx solid #f4f4f4;
    background: #fff;

    .cover {
      position: relative;
      width: 128upx;
      height: 128upx;
      border-radius: 50%;

      span {
        display: inline-block;
        width: 128upx;
        height: 128upx;
        border-radius: 50%;
        background: #eee;
      }

      i {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        color: #FCCB59;
        font-size: 44upx;
        transform: translate(-50%, -50%);
      }

      image {
        width: 128upx;
        height: 128upx;
        border-radius: 50%;
      }
    }
  }

  .live-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 104upx;
    padding: 0 24upx;
    border-bottom: 1upx solid #eee;

    .right {
      color: #999;
    }
  }

  .live-content {
    margin-top: 40upx;

    .live-content__item {
      display: flex;
      align-items: center;
      margin-bottom: 16upx;
      padding-left: 24upx;
      color: #999;
      font-size: 24upx;

      image {
        width: 23upx;
        height: 23upx;
        margin-right: 8upx;
      }
    }
  }

  .live-btn {
    position: fixed;
    bottom: 122upx;
    left: 0;
    width: 702upx;
    height: 88upx;
    margin: 0 24upx;
    line-height: 88upx;
    text-align: center;
    background:rgba(250,63,63,1);
    border-radius: 44upx;
    font-size: 30upx;
    color: #fff;
  }
</style>
