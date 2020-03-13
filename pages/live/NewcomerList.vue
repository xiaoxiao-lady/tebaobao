<template>
  <view class="live-itemlist">
    <view class="live-itemlist__wrap">
      <view
        class="live-itemlist__item"
        hover-class="text-hover"
        v-for="(item, index) in list"
        :key="index"
        @click="linkTo(item)"
      >
        <view class="live-itemlist__item--header">
          <view class="top">
            <view class="left" v-if="item.issincerity === 1">诚信商家</view>
            <!-- <view class="right">
              <image src="../../static/images/img/live-icon.png" />
              <text>2222人</text>
            </view> -->
          </view>
          <view class="bottom">
            <image :src="item.shop_logo" />
            <text>{{ item.title }}</text>
          </view>
          <image :src="item.cover" />
        </view>
        <view class="live-ranklint__item--footer">
          <view class="goods-name">{{ item.goods.goods_name }}</view>
          <view class="bottom">
            <view class="left">
              <view>{{ item.goods.keywords }}</view>
              <text>¥{{ item.goods.market_price }}</text>
            </view>
            <image :src="item.goods.thumb_url" />
          </view>
        </view>
      </view>
    </view>
    <loadMore :loadingType="loadingType"></loadMore>
  </view>
</template>

<script>
  let page = 1
  export default {
    data () {
      return {
        list: [],
        loadingType: 0
      }
    },

    onLoad () {
      this.$http.getaliveindex({
          isnewperson: 1
        }).then(res => {
        if (res.status === 200) {
          this.list = res.data.data
        } 
      })
    },

    methods: {
      linkTo (item) {
        if(!uni.getStorageSync('token')) {
          this.getnav(`/pages/loginSon/login`)

          return false
        }
        uni.setStorageSync('pullurl', item.addressitem)
        uni.setStorageSync('shopid', item.shop_id)
        this.getnav(`/pages/live/Audience`)
      },
    },

    onReachBottom () {
      if (this.loadingType === 2) return false
      this.loadingType = 1
      this.$http.getaliveindex({
        isnewperson: 1,
        page: page + 1
      }).then(res => {
        if (res.status === 200) {
          this.loadingType = 0
          if (!res.data.data.length) {
            this.loadingType = 2
          }
          if (res.data.data.length < 10) {
            this.loadingType = 2
            page = page + 1
          }
          if (res.data.data.length) {
            this.list = [...this.list, res.data.data]
            page = page + 1
          }
        } else {
          this.loadingType = 0
        }
      }).catch(() => {
        this.loadingType = 0
      })
    }
  }
</script>

<style lang="less">
  .live-itemlist {
    .live-item__title {
      white-space: nowrap;
      height: 104upx;
      line-height: 104upx;

      .active:after {
          background: #FA3F3F!important;
      }

      view {
        display: inline-block;
        position: relative;
        margin-right: 49upx;
        font-size: 30upx;
        color: #333;

        &:after {
            position: absolute;
            bottom: 10upx;
            left: 50%;
            width: 34upx;
            height: 4upx;
            background: transparent;
            transform: translateX(-50%);
            content: ' ';
        }

        &:first-child {
            margin-left: 24upx; 
        }

        &:last-child {
            margin-right: 0;
        }
      }
    }
  }
  .live-itemlist__wrap {
    padding: 0 24upx 40upx 28upx;
    background: #F4F4F4;
    font-size: 0;

    .live-itemlist__item {
        display: inline-block;
        width: 339upx;
        height: 605upx;
        margin-top: 16upx;
        background: #fff;
        border-radius: 10upx;
        margin-right: 20upx;

        &:nth-of-type(2n) {
          margin-right: 0upx;  
        }
    }

    .live-itemlist__item--header {
        position: relative;
        width: 339upx;
        height: 411upx;
        border-radius: 10upx 10upx 0px 0px;
        overflow: hidden;

        .top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: absolute;
            top: 11upx;
            z-index: 1;
            width: 100%;
            padding: 0 10upx;

            .left {
                width: 114upx;
                height: 35upx;
                text-align: center;
                line-height: 35upx;
                font-size: 20upx;
                color: #fff;
                background: rgba(255,54,87,1);
                border-radius: 18upx;
            }

            .right {
                display: flex;
                align-items: center;
                height: 33upx;
                padding: 0 11upx;
                font-size: 22upx;
                color: #fff;
                background: rgba(0,0,0,0.2);
                border-radius: 17upx;
                border: 1upx solid rgba(255,255,255,1);


                image {
                    width: 16upx;
                    height: 19upx;
                    margin-right: 7upx;
                }
            }
        }

        .bottom {
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 13upx;
            left: 16upx;
            z-index: 1;

            text {
                width: 220upx;
                color: #fff;
                font-size: 24upx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            image {
                width: 60upx;
                height: 60upx;
                margin-right: 16upx;
                border-radius: 50%;
            }
        }

        & >　image {
            position: absolute;
            top: 0;
            left: 0;
            width: 339upx;
            height: 411upx;
            border-radius: 10upx 10upx 0px 0px;
        }
    }

    .live-ranklint__item--footer {
      padding: 17upx 24upx;

      .goods-name {
        width: 100%;
        margin-bottom: 6upx;
        color: #333;
        font-size: 28upx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .bottom {
        display: flex;
        align-items: center;

        .left {
          flex: 1;
          color: #999999;
          font-size: 24upx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          view {                        
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 30upx;
          }

          text {
            font-size: 34upx;
            color: #FA3F3F;
          }
        }

        image {
          width: 107upx;
          height: 107upx;
          border-radius: 10upx;
        }
      }
    }
  }
</style>
