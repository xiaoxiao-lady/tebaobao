<template>
  <div class="team" v-if="pageShow">
    <div class="tab">
      <span :class="[ currIndex === 0 ? 'active' : '' ]" @click="changeTab(0)">一级</span>
      <span :class="[ currIndex === 1 ? 'active' : '' ]" @click="changeTab(1)">二级</span>
    </div>
    <div class="tab-content">
      <div class="item" v-for="(item, index) in list" :key="index">
        <img :src="item.headimgurl">
        <div class="tab-item__right flex1">
          <h2>{{ item.user_name }}</h2>
          <div>级别:  <span> {{ item.level }}级</span></div>
        </div>
        <div class="item-time">{{ $utils.fomartTime(item.addtime) }}</div>
      </div>
      <div v-if="isMore" class="no-more">没有更多</div>
      <!-- <div class="tab-item" v-if="currIndex === 1">
        <div class="item" v-for="(item, index) in 10" :key="index">
          <img src="https://nycs.maitexun.cn/uploads/member_pic/20190430/8fad763b6f169ec656197cbfabf5e1b8.jpg">
          <div class="tab-item__right flex1">
            <h2>且听风吟</h2>
            <div>级别:  <span>一级</span></div>
          </div>
          <div class="item-time">2019-05-20 11:11:35</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currIndex: 0,
        pageShow: false,
        page: 0,
        list: [],
        isMore: false,
        isLoading: false
      }
    },

    onLoad () {
      this.getData(1)
    },

    methods: {
      changeTab (index) {
        this.currIndex = index
        this.list = []
        this.page = 0
        this.$nextTick(() => {
          this.getData(index + 1)
        })
      },

     getData (type) {
       if (this.isMore) return
       if (this.isLoading) return

       this.isLoading = true
       this.page === 0 && this.$loading()
       this.$http.getDistributionTeamInfo({
         filter: type,
         page: this.page + 1
       }).then(res => {
        if (res.status === 200 || res.status === 400) {
          this.isLoading = false
          if (!res.data.friendres.length) {
            this.isMore = true

            return false
          }
          this.page = this.page + 1
          if (this.list.length) {
            this.list = [...this.list, ...res.data.friendres]
          } else {
            this.list = res.data.friendres  
          }
          this.pageShow = true
        } else {
          this.$toast(res.mess)
          this.isLoading = false
        }
      }).catch(() => {
        this.isLoading = false
      })
     } 
    }
  }
</script>

<style lang="less">
  page {
    background: #F7F7F7;
  }

  .tab {
    display: flex;
    position: fixed;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100upx;
    text-align: center;
    color: #333;
    background: #fff;
    
    span {
      position: relative;
      flex: 1;
    }

    span.active {
      color: #FA3F3F;
    }
    span.active::before {
      background: #FA3F3F;
    }

    span::before {
      position: absolute;
      left: 50%;
      bottom: -20upx;
      width: 50upx;
      height: 6upx;
      border-radius: 3upx;
      transform: translateX(-50%);
      background: transparent;
      content: ' ';
    }
  }

  .tab-content {
    padding-top: 100upx;

    .item {
      display: flex;
      align-items: center;
      height: 118upx;
      margin-top: 16upx;
      padding: 0 24upx;
      background: #fff;

      image {
        width: 80upx;
        height: 80upx;
        margin-right: 20upx;
        border-radius: 50%;
      }

      .tab-item__right {
        color: #666;
        font-size: 26upx;

        h2 {
          margin-bottom: 18upx;
          font-size: 32upx;
          color: #333;
        }

        span {
          display: inline-block;
          padding-left: 20upx;
        }
      }

      .item-time {
        font-size: 26upx;
        color: #999;
      }
    }
  }
</style>
