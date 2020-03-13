<template>
  <view class="rank">
    <view class="rank-item" :class="[item.className ? item.className : '']" v-for="(item, index) in list" :key="index">
      <view class="rank-num" v-if="index > 2">NO.{{ index + 1 }}</view>
      <view class="rank-bg">
        <image :src="item.headimgurl" />
      </view>
      <div v-if="index < 3">
        <view>{{ item.username }}</view>
        <text>贡献{{ item.countredbi }}红豆</text>
      </div>
      <block v-if="index > 2">
        <view class="nickname">{{ item.username }}</view>
        <view class="gift">贡献<i>{{ item.countredbi }}</i>红豆</view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        list: []
      }
    },

    onLoad () {
      this.$http.getGiftRankList({
        shop_id: this.$mp.query.shopid
      }).then(res => {
        let className = 'rank4'
        this.list = res.data.map((item, index) => {
          if (index === 0) {
            className = 'rank1'
          } else if (index === 1) {
            className = 'rank2'
          } else if (index === 2) {
            className = 'rank3'
          } else {
            className = 'rank4'
          }
          item.className = className

          return item
        })
        console.log(JSON.stringify(res.data))
      })
    },

    methods: {
      
    },
  }
</script>

<style lang="less">
  .rank1, .rank2, .rank3 {
    width: 100%;
    height: 300upx;
    text-align: center;
    color: #FF9517;
    font-size: 22upx;

    .rank-bg {
      width: 160upx;
      height: 160upx;
      margin: 50upx auto 0 auto;
      background: url(../../static/images/rank1.png) no-repeat;
      background-size: 100% 100%; 

      image {
        width: 106upx;
        height: 106upx;
        margin: 24upx 0 0 6upx;
        border-radius: 50%;
      }
    }

    view {
      color: #E3C76F;
      font-size: 24upx;
      margin: 10upx 0;
    }
  }

  .rank2 .rank-bg {
    width: 150upx;
    height: 150upx;
    background: url(../../static/images/rank2.png) no-repeat;
    background-size: 100% 100%; 
  }

  .rank3 .rank-bg {
    width: 150upx;
    height: 150upx;
    background: url(../../static/images/rank3.png) no-repeat;
    background-size: 100% 100%; 
  }

  .rank4 {
    display: flex;
    align-items: center;
    height: 136upx;
    padding: 0 24upx;
    color: #333;
    font-size: 0.28rem;
    border-bottom: 1upx solid #eee;

    .rank-bg {
      position: relative;
      width: 80upx;
      height: 80upx;
      margin: 0 14upx;
      background: url(../../static/images/rank.png) no-repeat;
      background-size: 100% 100%; 

      image {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 66upx;
        height: 66upx;
        border-radius: 50%;
        transform: translate(-50%, -44%);
      }
    }

    .nickname {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .gift {
      display: flex;

      i {
        color: #FA3F3F;
      }
    }
  }
</style>
