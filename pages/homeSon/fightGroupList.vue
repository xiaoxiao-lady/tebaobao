<template>
  <div class="list">
    <scroll-view class="list-nav" scroll-x="true" :scroll-with-animation="true" :scroll-into-view="toId">
      <span
        :class="[index === currIndex ? 'active' : '']"
        v-for="(item, index) in categoryList"
        :id="'item' + index"
        :key="index"
        @click="changeTab(index)">{{ item.cate_name }}</span>
    </scroll-view>
    <!-- <div class="search">
      <i class="icon iconfont icon_e819"></i>
      <input placeholder="搜索" disabled />
    </div> -->
    <div class="goodsList">
      <div class="item" v-for="(item, index) in list" :key="index" hover-class="bg-hover" @click="getnav('/pages/homeSon/shop_details?id=' + item.goods_id)">
        <img :src="item.thumb_url">
        <div class="item-right">
          <h2>{{ item.goods_name }}</h2>
          <span>已拼{{ item.pin_number }}件</span>
          <div class="item-right__bottom">
            <div class="item-right__bottom--left flex">
              <span>¥{{ item.price }}</span>
              <i>¥{{ item.shop_price }}</i>
            </div>
            <div class="item-right__bottom--right" @click="getnav('/pages/homeSon/shop_details?id=' + item.shop_id)">去拼团</div>
          </div>
        </div>
      </div>
			<div class="no-more" v-if="status === 'nomore'">没有更多</div>
    </div>
  </div>
</template>

<script>
	import uniLoadMore from "../../components/uni-load-more.vue"
	let page = 0
  export default {
    data () {
      return {
        toId: 'item000',
        pageShow: false,
        categoryList: [],
        currIndex: 0,
        list: [],
        status: 0,
        page: 0,
        isLoadMore: false,
        isLoading: false,
        isMore: false
      }
    },

    onLoad () {
      page = 0
      this.getFightGroupCate()
      this.getFightGroupList(1)
    },

		components: {
			uniLoadMore
		},

    methods: {
      changeTab (index) {
        this.currIndex = index
        this.toId = `item${index}`
        page = 0
        this.list = []
        this.status = ''
        this.isLoadMore = false

        this.$nextTick(() => {
          this.getFightGroupList()
        })
      },

      getFightGroupCate () {
        this.$http.getFightGroupCate().then(res => {
          if (res.status === 200) {
            let data = res.data
            data.unshift({
              id: '',
              cate_name: '推荐'
            })
            this.categoryList = data
          }
        })
      },

      getFightGroupList (isFirst) {
        if (this.status === 'nomore' || this.status === 'loading') return

        if (page === 0) {
          this.$loading()
        }
				if (page > 0) {
					this.status = 'loading' 
        }
        
        this.$http.getFightGroupList({
          page: page + 1,
          cate_id: isFirst ? '' : this.categoryList[this.currIndex].id
        }).then(res => {
          if (res.status === 200) {
            page = page + 1

            if (!res.data.length) {
              this.status = 'nomore'
              return false
            }

					  this.list.push(...res.data)

            this.status = 'more'
            this.pageShow = true
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .list-nav {
    position: fixed;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 88upx;
    line-height: 88upx;
    font-size: 0;
    white-space: nowrap;
    background: #fff;

    span.active {
      color: #333;
      &::after {
        background: #FA3F3F;
      }

      color: #FA3F3F;
    }

    span {
      display: inline-block;
      position: relative;
      margin-right: 33upx;
      font-size: 30upx;
      color: #333333;

      &::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 42upx;
        height: 4upx;
        background: transparent;
        transform: translateX(-50%);
        content: '';
      }

      &:first-child {
        margin-left: 30upx;
      }

      &:last-child {
        margin-right: 30upx;
      }
    }
  }

  .search {
    display: flex;
    align-items: center;
    height: 64uxp;
    margin: 100upx 24upx 12upx;
    padding-left: 46upx;
    background: rgba(241,241,241,1);
    border-radius: 32upx;

    i {
      padding-right: 16upx;
    }
  }

  .goodsList {
    width: 100%;
    padding-top: 100upx;

    .item {
      display: flex;
      height: 244upx;
      padding: 17upx 26upx;

      img {
        width: 210upx;
        height: 210upx;
        border-radius: 10upx;
        margin-right: 30upx;
      }

      .item-right {
        flex: 1;
        overflow: hidden;

        .item-right__bottom {
          display: flex;
          justify-content: space-between;

          .item-right__bottom--right {
            width: 130upx;
            height: 51upx;
            line-height: 51upx;
            text-align: center;
            background: rgba(250,63,63,1);
            border-radius: 32upx;
            color: #fff;
            font-size: 28upx;
          }
        }

        .item-right__bottom--left {
          align-items: flex-end;
          span {
            padding-right: 12upx;
            color: #F7544E;
            font-size: 30upx;
          }

          i {
            color: #999;
            font-size: 24upx;
            text-decoration: line-through;
          }
        }

        h2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          line-height: 1.3;
          margin-bottom: 16upx;
          color: #333;
          font-size: 28upx;
        }

        & > span {
          display: block;
          margin-bottom: 29upx;
          color: #999;
          font-size: 24upx;
        }
      }
    }
  }
</style>
