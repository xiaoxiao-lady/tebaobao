<template>
  <view v-if="pageShow" class="index_class">
    <view class="cat-dynamic">
      <view class="cat-banner">
        <image src="../../static/images/img/cat-banner.png" />
        <view class="cat-center">
          <view class="cat-name">#{{ storeInfo.shop_name }}#</view>
          <view class="cat-number">{{ storeInfo.dt }}</view>
        </view>
      </view>
      <view class="cat-text">
        <view class="cat-top">{{ storeInfo.shop_desc }}</view>
      </view>

      <view class="cat-tab">
        <view>
          最新
        </view>
        <view class="nav-tab">
          <text :class="{'active': currIndex === 1}" @click="gettab(1)">动态</text>
          <text :class="{'active': currIndex === 2}" @click="gettab(2)">商品</text>
        </view>
      </view>

      <view class="seg-mend" v-if="currIndex == 1">
        <view class="seg-mend" v-for="(time,index) in dynamicList" :key="index">
          <!-- <view class="seg-h" hover-class="click-active-bgc" @click="getnav('/pages/squareSon/follow') > -->
          <!-- hover-class="click-active-bgc" @click="getnav('/pages/squareSon/follow')" -->
          <!-- <view class="seg-h">
                    <text>我的关注</text>
                    <i class="iconfont icon_e60c"></i>
          </view>-->
          <view class="seg-top">
            <view class="seg-left">
              <image :src="time.headimgurl" />
              <view>
                <text>{{time.user_name}}</text>
                <text class="datatime">{{time.createtime}}</text>
              </view>
            </view>
            <view class></view>
          </view>
          <view class="seg-text">{{time.describe}}</view>
          <view class="seg-img">
            <image
              @click="preview(time.imgurl,times)"
              v-for="(times,index2) in time.imgurl"
              :key="index2"
              class="scoll-items"
              :src="times"
            />
          </view>
          <view class="seg-bottom" @click="getnav('/pages/homeSon/shop_details?id='+time.gid)">
            <image class="scoll-items" :src="time.thumb_url" />
            <text>{{time.goods_name}}</text>
          </view>
          <view class="download">
            <view
              class="download-item"
              @click="like(time.id)"
              :class="{'download-active': time.is_laud === 1}"
            >
              <i class="iconfont icon_e66f" style="margin-right:8upx;"></i>
              {{time.laudcount}}
            </view>
            <view class="download-item" @click="save(index)" :class="{'download-active': time.is_download === 1}">
              <i class="iconfont icon_e680" style="margin-right:8upx;"></i>
              {{time.download}}
            </view>
            <view class="download-item" @click="onShare(time.id, index)" :class="{'download-active': time.is_share === 1}">
              <i class="iconfont icon_e66b" style="margin-right:8upx;"></i>
              {{time.sharecount}}
            </view>
          </view>
        </view>
        <loadMore :loadingType="loadingType1"></loadMore>
      </view>
      <view class="r-list" v-if="currIndex == 2">
        <view
          class="r-items"
          hover-class="item-active-hover"
          v-for="(item, index) in goodsList"
          :key="index"
          @click="getnav('/pages/homeSon/shop_details?id=' + item.id)">
          <image :src="item.thumb_url" />
          <text>{{ item.goods_name }}</text>
          <view class="r-money">
            <text>¥{{ item.market_price }}</text>
            <view class="r-btn">购买</view>
          </view>
        </view>
      </view>
      <loadMore v-if="currIndex == 2" :loadingType="loadingType2"></loadMore>
    </view>
  </view>
</template>

<script>
let dynamicPage = 1;
let goodsPage = 1;
export default {
  data() {
    return {
      currIndex: 1,
      dynamicList: [],
      goodsList: [],
      loadingType1: 0,
      loadingType2: 0,
      pageShow: false,
      storeInfo: {}
    };
  },
  onLoad() {
    this.$loading();
    this.getfindgoodsinfor();
    this.getDynamicList();
  },
  methods: {
    like(id) {
      this.$http.like({ fid: id }).then(res => {
        if (res.status == 200) {
          this.$toast(res.mess);
          if (res.mess === "点赞成功") {
            this.dynamicList.map(item => {
              if (item.id === id) {
                item.is_laud = 1;
                item.laudcount = item.laudcount + 1;
              }

              return item;
            });
          } else {
            if (res.mess === "取消点赞") {
              this.dynamicList.map(item => {
                if (item.id === id) {
                  item.is_laud = 0;
                  item.laudcount = item.laudcount - 1;
                }

                return item;
              });
            }
          }
        }
      });
    },
    
		save (index) {
			if (!uni.getStorageSync('token')) {
				this.getnav('/pages/loginSon/login')

				return false
			}
			const isDownLoad = this.dynamicList[index].download === 1 ? true : false
			const imgs = this.dynamicList[index].imgurl
			this.$loading('正在下载中')
			imgs.forEach((item, i) => {
				if (item.substr(-3).toLocaleLowerCase() === 'gif') {
					this.$toast('gif动态暂时无法下载')
					this.$hideLoading()
					return false
				}
				plus.gallery.save(item, () => {
					if (i === imgs.length - 1) {
						this.$toast('下载完成')
						this.$http.downloadpic({
							fid: this.dynamicList[index].id
						}).then(res => {
							if (res.status === 200) {
								if (!isDownLoad) {
									this.dynamicList.map(item => {
										if (item.id === this.dynamicList[index].id) {
											item.download = 1
										}

										return item
									})
								}
							}
						}).catch(err => {
							console.log(JSON.stringify(err))
						})
					}
					console.log('save success');
				}, () => {
					this.$toast('保存失败')
				})
				this.$hideLoading()
			})
    },
    
    onShare (id, index) {
			if (!uni.getStorageSync('token')) {
				this.getnav('/pages/loginSon/login')

				return false
			}
      let currItem = this.dynamicList[index]
      this.$utils.share({
        summary: currItem.describe,
        href: `https://nycs.maitexun.cn/index/apppage/find?id=${id}`,
        title: '欢迎体验WoSmart',
        callBack: () => {
          this.$http.sharewxpy({
            fid: id
          }).then(res => {
            if (res.status === 200) {
              this.dynamicList.map(item => {
                if (item.id === id && item.is_share !== 1) {
                  item.sharecount = item.sharecount + 1
                  item.is_share = 1
                }

                return item
              })

              this.$toast('分享成功')
            }
          })
        }
      })
    },
    getfindgoodsinfor() {
      this.$http
        .getfindgoodsinfor({
          mid: this.$mp.query.mid
        })
        .then(res => {
          if (res.status === 200) {
            this.storeInfo = res.data;
          }
        });
    },

    gettab: function(index) {
      this.currIndex = index;
      if (this.index === 1) {
        this.getDynamicList();
      } else {
        this.getfindgoods();
      }
    },

    clickFollow: function(id) {
      if (!uni.getStorageSync("token")) {
        this.getnav("/pages/login/loginSon");

        return false;
      }

      this.$http.getfollow({ mid: id }).then(res => {
        // console.log(res,996413)
        if (res.status == 200) {
          this.$toast(res.mess);
          if (res.mess === "关注成功") {
            this.dynamicList.map(item => {
              if (item.mid === id) {
                item.is_follow = 1;
              }

              return item;
            });
          } else {
            if (res.mess === "取消关注") {
              this.dynamicList.map(item => {
                if (item.mid === id) {
                  item.is_follow = 0;
                }

                return item;
              });
            }
          }
        }
      });
    },

    getDynamicList() {
      if (this.loadingType1 === 2) return false;
      this.loadingType1 = 1;
      this.$http
        .getsquareList({
          page: dynamicPage,
          size: 5,
          mid: this.$mp.query.mid
        })
        .then(res => {
          if (!this.pageShow) {
            this.pageShow = true;
          }
          if (res.status === 200) {
            if (!res.data.data.length) {
              this.loadingType1 = 2;

              return false;
            }
            this.statusMath(this);
            this.dynamicList = this.dynamicList.concat(res.data.data);
            this.loadingType1 = 0;
            dynamicPage = dynamicPage + 1;
          }
        });
    },
    getfindgoods() {
      if (this.loadingType2 === 2) return false;
      this.loadingType2 = 2;
      this.$http
        .getfindgoods({
          page: goodsPage,
          size: 5,
          mid: this.$mp.query.mid
        })
        .then(res => {
          if (!this.pageShow) {
            this.pageShow = true;
          }
          if (res.status === 200) {
            if (!res.data.data.length) {
              this.loadingType2 = 2;

              return false;
            }
            this.statusMath(this);
            this.goodsList = this.goodsList.concat(res.data.data);
            this.loadingType2 = 0;
            goodsPage = goodsPage + 1;
          }
        });
    },
    preview: function(urls, urlsId) {
      uni.previewImage({
        current: urlsId, //当前显示的 图片
        indicator: "number",
        urls: urls // 预览图片的列表
      });
    }
  },

  onReachBottom: function() {
    if (this.currIndex === 1) {
      this.getDynamicList();
    } else {
      this.getfindgoods();
    }
  },

  destroyed() {
    dynamicPage = 1;
    goodsPage = 1;
  }
};
</script>

<style scope lang="less">
.status,
.to-tltle,
.bus-top {
  background-color: transparent !important;
}
.cat-number {
  text-align: center;
}
.download-active {
  color: #fa3f3f !important;
}

.seg-img {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    image {
        width: 208upx!important;
        height: 208upx!important;
        display: inline-block;
      
        margin:0 7upx 10upx 0!important;
        &:nth-child(3n) {
            margin-right: 0!important;
        }
        
    }
}
</style>
