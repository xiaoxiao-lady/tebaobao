<template>
  <view class="index_class">
    <view class="conversation">
      <view class="con-title" @click="getnav('/pages/squareSon/Popular')">
        <view>
          <image src="../../static/images/img/title_fx.png" />热门话题
        </view>
        <i class="iconfont icon_e60c"></i>
      </view>

      <view class="img-scoll">
        <scroll-view class="scroll-view_H" scroll-x="true">
          <view
            id="demo1"
            class="scroll-view-item_H uni-bg-red"
            v-for="(time,index) in hottalk"
            :key="index"
						hover-class="item-active-hover"
						@click="getnav('/pages/squareSon/Catcher?mid=' + time.mid)"
          >
            <text class="img-text">{{time.title}}</text>
            <image class="scoll-items" :src="time.pathurl" />
          </view>
        </scroll-view>
      </view>

      <view class="segement">
        <view class="seg-tab">
          <view :class="{'active':indexId1 == 1}" @click="tabActive(1)" hover-class="item-active-hover">推荐</view>
          <view :class="{'active':indexId1 == 2}" @click="tabActive(2)" hover-class="item-active-hover">关注</view>
        </view>

        <view class="seg-tab-nav" v-if="indexId1==1">
          <view class="seg-mend" v-for="(time,index) in squareLiData" :key="index">
            <view class="seg-top">
              <view class="seg-left">
                <image :src="time.headimgurl" />
                <view>
                  <text>{{time.user_name}}</text>
                  <text class="datatime">{{time.createtime}}</text>
                </view>
              </view>
              <view class="follow" @click="clickFollow(time.mid)">{{ time.is_follow === 1 ? '已关注' : '关注' }}</view>
            </view>
            <view class="seg-text">{{time.describe}}</view>
            <view class="seg-img">
              <image
                @click="preview(time.imgurl,times)"
                class="scoll-items"
                v-for="(times,index2) in time.imgurl"
                :key="index2"
                :src="times"
              />
            </view>
            <view class="seg-bottom" @click="getnav('/pages/homeSon/shop_details?id='+time.gid)">
              <image class="scoll-items" :src="time.thumb_url" />
              <text>{{time.goods_name}}</text>
            </view>
            <view class="download">
              <view class="download-item" @click="like(time.id)" :class="{'download-active': time.is_laud === 1}">
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

        <view class="seg-tab-nav" v-if="indexId1==2">
          <view class="seg-mend" v-for="(time,index) in fxListDate" :key="index">
            <!-- <view class="seg-h" hover-class="click-active-bgc" @click="getnav('/pages/squareSon/follow') > -->
            <!-- hover-class="click-active-bgc" @click="getnav('/pages/squareSon/follow')" -->
            <!-- <view class="seg-h">
              <text>我的关注</text>
              <i class="iconfont icon_e60c"></i>
            </view> -->
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
              <view class="download-item" @click="like(time.id, 1)" :class="{'download-active': time.is_laud === 1}">
                <i class="iconfont icon_e66f" style="margin-right:8upx;"></i>
                {{time.laudcount}}
              </view>
              <!-- <view class="download-item">
                <i class="iconfont icon_e680" style="margin-right:8upx;"></i>
                {{time.download}}
              </view> -->
              <view class="download-item" @click="save(index)" :class="{'download-active': time.download === 1}">
                <i class="iconfont icon_e680" style="margin-right:8upx;"></i>

                {{time.download}}
              </view>
              <view class="download-item" @click="onShare(time.id, index)" :class="{'download-active': time.is_share === 1}">
                <i class="iconfont icon_e66b" style="margin-right:8upx;"></i>
                {{time.sharecount}}
              </view>
            </view>
          </view>

          <loadMore :loadingType="loadingType2"></loadMore>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
let params = {
  size: "5",
  page: 1
};
export default {
  data() {
    return {
      indexId1: 1,
      squareLiData: [], // 推荐列表
      fxListDate: [], // 关注列表
      page1: 1, // 推荐列表页码
      page2: 1, // 关注列表的页码
      loadingType1: 0,
      loadingType2: 0,
      hottalk: "",
      valueStatus: 0 // 更新页面状态 防止页面卡死
    };
  },

  created() {
    this.squareList(params);
    this.gethottalk();
  },

  onReachBottom: function() {
    // 上拉加载更多
    this.loadMoreFunc();
  },

  onPullDownRefresh () {
    this.page1 = 1
    this.page2 = 1
    if (this.indexId1 == 1) {
      this.$nextTick(() => {
        this.squareList({
          size: "5",
          page: 1
        }, true);
        this.gethottalk();
      })
    }
  },

  methods: {
    // 保存图片到相册
    send () {
			if (!uni.getStorageSync('token')) {
				this.getnav('/pages/loginSon/login')

				return false
			}
      this.getnav('/pages/squareSon/Release')
    },
		save (index) {
			if (!uni.getStorageSync('token')) {
				this.getnav('/pages/loginSon/login')

				return false
			}
			let dataName = this.indexId1 === 1 ? 'squareLiData' : 'fxListDate'
			const isDownLoad = this[dataName][index].download === 1 ? true : false
			const imgs = this[dataName][index].imgurl
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
							fid: this[dataName][index].id
						}).then(res => {
							if (res.status === 200) {
								if (!isDownLoad) {
									this[dataName].map(item => {
										if (item.id === this[dataName][index].id) {
                      item.download = item.download + 1
                      item.is_download = item.is_download + 1
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
		like (id, flag) {
			if (!uni.getStorageSync('token')) {
				this.getnav('/pages/loginSon/login')

				return false
			}
			let dataName = this.indexId1 === 1 ? 'squareLiData' : 'fxListDate'
      this.$http.like({ fid: id }).then(res => {
        if (res.status == 200) {
					this.$toast(res.mess);
					if (res.mess === '点赞成功') {
							this[dataName].map(item => {
							if (item.id === id) {
								item.is_laud = 1
								item.laudcount = item.laudcount + 1
							}

							return item
						})
					} else {
						if (res.mess === '取消点赞') {
							this[dataName].map(item => {
								if (item.id === id) {
									item.is_laud = 0
									item.laudcount = item.laudcount - 1
								}

								return item
							})
						}
					}
        }
      })
    },
    onShare (id, index) {
			if (!uni.getStorageSync('token')) {
				this.getnav('/pages/loginSon/login')

				return false
			}
      let dataName = this.indexId1 === 1 ? 'squareLiData' : 'fxListDate'
      let currItem = this[dataName][index]
      this.$utils.share({
        summary: currItem.describe,
        href: `https://nycs.maitexun.cn/index/apppage/find?id=${id}`,
        title: '欢迎体验WoSmart',
        callBack: () => {
          this.$http.sharewxpy({
            fid: id
          }).then(res => {
            if (res.status === 200) {
              this[dataName].map(item => {
                if (item.id === id && item.is_share !== 1) {
                  item.sharecount = item.sharecount + 1
                  item.is_share = 1
                }

                return item
              })
            }
          })
        }
      })
    },
    clickFollow: function(id) {
			if (!uni.getStorageSync('token')) {
				this.getnav('/pages/loginSon/login')
				return false
			}

      this.$http.getfollow({ mid: id }).then(res => {
        // console.log(res,996413)
        if (res.status == 200) {
					this.$toast(res.mess);
					if (res.mess === '关注成功') {
						this.squareLiData.map(item => {
							if (item.mid === id) {
								item.is_follow = 1
							}

							return item
						})
					} else {
						if (res.mess === '取消关注') {
							this.squareLiData.map(item => {
								if (item.mid === id) {
									item.is_follow = 0
								}

								return item
							})
						}
					}
        }
      });
    },
    tabActive: function(index) {
			if (index === 2) {
				if (!uni.getStorageSync('token')) {
				  this.getnav('/pages/loginSon/login')

					return false
				}
			}

      // console.log(123465)
      this.indexId1 = index;

      if (
        this.indexId1 == 1
      ) {
        params.page = this.page1;
        this.squareList(params);
      }

      if (
        this.indexId1 == 2
      ) {
				params.type = 1;
        params.page = this.page2;
        this.squareList(params);
      }
    },

    squareList(data, refrash) {
      if (this.indexId1 == 2) {
        data.type = 1
      } else {
        data.type = ''
      }
      if (
        (this.page1 == 1 && this.indexId1 == 1) ||
        (this.page2 == 1 && this.indexId1 == 2)
      ) {
        this.$loading();
      }
      this.$http.getsquareList(data).then(res => {
        if (res.status === 200) {
          this.$hideLoading();
          if (refrash) {
            this.squareLiData = res.data.data;
            this.loadingType1 = 0;
            return false
          }

          if (res.data.data.length == 0 && this.indexId1 == 1) {
            // console.log(12346789)
            this.loadingType1 = 2;
            return false;
          }

          if (res.data.data.length == 0 && this.indexId1 == 2) {
            this.loadingType2 = 2;
            return false;
          }

          if (this.indexId1 == 1) {
            this.squareLiData = this.squareLiData.concat(res.data.data);
            this.loadingType1 = 0;
          }
          if (this.indexId1 == 2) {
            this.fxListDate = this.fxListDate.concat(res.data.data);
            this.loadingType2 = 0;
          }
        }
        // uni.stopPullDownRefresh();
      }).catch(() => {
        // uni.stopPullDownRefresh();
      })
    },

    loadMoreFunc: function() {
      // 加载函数
      if (this.indexId1 == 1) {
        if (this.loadingType1 == 1 || this.loadingType1 == 2) {
          return false;
        }
        this.loadingType1 = 1;
        // console.log(999999)
        ++this.page1;
        params.page = this.page1;
      }
      if (this.indexId1 == 2) {
        if (this.loadingType2 == 1 || this.loadingType2 == 2) {
          return false;
        }
        this.loadingType2 = 1;
        ++this.page2;
        params.page = this.page2;
      }
      // setTimeout(() => {
			// }, 500);
			this.$nextTick(() => {
        this.squareList(params);
			})
    },
    /**
     *  预览图片
     */
    preview: function(urls, urlsId) {
      uni.previewImage({
        current: urlsId, //当前显示的 图片
        indicator: "number",
        urls: urls // 预览图片的列表
      });
    },
    gethottalk() {
      this.$http.gethottalk().then(res => {
        uni.stopPullDownRefresh();
        if (res.status == 200) {
          this.hottalk = res.data.data;
        }
      }).catch(() => {
        uni.stopPullDownRefresh();
      })
    }
  },
  
  onNavigationBarButtonTap(params) {
    this.getnav('/pages/squareSon/Release')
  }
}
</script>

<style>
.download-active {
	color: #FA3F3F!important;
}
</style>
