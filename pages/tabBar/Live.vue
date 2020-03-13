<template>
	
	<view class="index_class">
		
    <swiper class="live-swiper" previous-margin="22px" :current="1" next-margin="11px">
      <swiper-item v-for="(item, index) in adList" :key="index">
        <image :src="item.img" />
      </swiper-item>
    </swiper>
    <view class="live-ranklist">
      <view class="live-title">
        <view class="live-title__left">
          <view>新人榜</view>
          <!-- <text>29个主播在线</text> -->
        </view>
        <view class="live-title__right" @click="getnav('/pages/live/NewcomerList')">
          <view>MORE <i class="iconfont">&#xe65c;</i></view>
        </view>
      </view>
      <view class="live-ranklist__wrap">
        <scroll-view class="scroll-view_H" :scroll-x="true">
          <view class="live-ranklist__item" v-for="(item, index) in newcomerList" :key="index" @click="linkTo(item)">
            <view class="live-ranklist__item--top" v-if="item.issincerity === 1">
              诚信商家
            </view>
            <view class="right live-ranklist__item--top" :class="[item.status === 1 ? 'active' : 'disable']">{{ item.status === 1 ? '直播中' : '未开播' }}</view>
            <!-- <view class="live-ranklist__item--bottom">
              <image src="../../static/images/img/live-icon.png" />
              <text>2222人</text>
            </view> -->
            <image :src="item.cover" />
          </view>
        </scroll-view>
      </view>
      <view class="live-itemlist">
        <scroll-view class="live-item__title" :scroll-x="true">
          <view :class="[ index === currIndex ? 'active' : '' ]" v-for="(item, index) in navList" :key="index" @click="changeTab(index, item.id)">{{ item.type_name }}</view>
        </scroll-view>
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
                <view :class="[item.issincerity === 1 ? 'left' : '']"> {{ item.issincerity === 1 ? '诚信商家' : '' }}</view>
                <view class="right" :class="[item.status === 1 ? 'active' : '']">{{ item.status === 1 ? '直播中' : '未开播' }}</view>
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
      </view>
      <loadMore :loadingType="loadingType"></loadMore>
    </view>
	</view>
</template>

<script>
  let page = 1
  export default {
    data () {
      return {
        adList: [],
        newcomerList: [],
        navList: [],
        list: [],
        currIndex: 0,
        currType: 1,
        loadingType: 0,
		  	headerPosition: 'fixed'
      }
    },
    onLoad () {
      this.getData()
    },
    onPullDownRefresh(){
      this.getData()
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
      getData () {
        this.$http.getLiveAd().then((res) => {
			console.log(res)
          if (res.status === 200) {
            this.adList = res.data.data
          }
        })

        this.$http.getaliveindex({
          isnewperson: 1
        }).then(res => {
          if (res.status === 200) {
            this.newcomerList = res.data.data
          } 
        })

        this.$http.getNavList().then(res => {
          if (res.status === 200) {
            this.navList = res.data
          }
        })

        this.$http.getaliveindex({
          typeid: -1,
          page: 1
        }).then(res => {
			console.log(res)
          if (res.status === 200) {
            this.list = res.data.data
          } 
        })
      },

      changeTab (index, id) {
        if (this.currIndex === index) return false

        this.currIndex = index
        this.currType = id
        this.isMore = false
        page = 1
        this.$http.getaliveindex({
          typeid: id,
          page: 1
        }).then(res => {
          if (res.status === 200) {
            if (res.data.data.length < 10) {
              this.loadingType = 2
            }
            this.list = res.data.data
          } 
        })
      }
    },

    onReachBottom () {
      if (this.loadingType === 2) return false
      this.loadingType = 1
      this.$http.getaliveindex({
        typeid: this.currType,
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
    },
  
    onNavigationBarButtonTap(params) {
      this.getnav('/pages/live/BroadcastLive')
    }
  }
</script>

<style>
.live-title__title {
  font-size: 32upx;
  text-align: center;
}

.live-ranklist__item .disable {
  right: 0!important;
  left: inherit!important;
  width: 80upx!important;
  background: transparent!important;
  color: #fff;
}

.live-ranklist__item .active {
  right: 0!important;
  left: inherit!important;
  width: 80upx!important;
  background: #ff7d23!important;
  border-color: #ff7d23;
}

.live-itemlist__item--header  .active {
  background: #ff7d23!important;
  color: #fff!important;
  border-color: #ff7d23;
}
</style>

