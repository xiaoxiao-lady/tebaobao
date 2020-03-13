<template>
  <div class="container" v-if="pageShow">
    <image class="top-bg" src="/static/images/img/mys_top.png" />
    <div class="userinfo">
      <div class="userinfo-header">
        <image :src="info.headimgurl" />
        <div class="userinfo-header__top">
          <h2>{{ info.user_name }}</h2>
          <span v-if="info.one_level_name">推荐人：{{ info.one_level_name }}</span>
        </div>
      </div>
    </div>
    <div class="withdraw">
      <div class="withdraw-left">
        <h2>{{ info.profit_wallet }}</h2>
        <span>可提现佣金(元)</span>
      </div>
      <div class="withdraw-btn" hover-class="item-active-hover" @click="getnav('/pages/moneyCartSon/Mywallet')" style="font-size: 13px;">立即提现</div>
    </div>
    <div class="list">
      <div class="item" hover-class="item-active-hover" @click="getnav('/pages/personalSon/distributionOrder')">
        <image src="/static/images/img/ds2.png" />
        <h2>分销订单(元)</h2>
        <span>{{ info.fxorder_num }}</span>
      </div>
      <div class="item" hover-class="item-active-hover" @click="getnav('/pages/personalSon/myTeam')">
        <image src="/static/images/img/ds4.png" />
        <h2>我的团队(人)</h2>
        <span>{{ info.tuan_num }}</span>
      </div>
      <div class="item" hover-class="item-active-hover" @click="getnav('/pages/personalSon/shareQRcode')">
        <image src="/static/images/img/ds5.png" />
        <h2>推广码</h2>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        info: {},
        pageShow: false
      }
    },

    onLoad () {
      this.getInfo()
    },

    methods: {
      getInfo () {
        this.$loading()
        this.$http.getDistributionInfo().then(res => {
          if (res.status === 200) {
            this.info = res.data
            this.pageShow = true
          }
        })
      } 
    }
  }
</script>

<style lang="less">
  page {
    padding-top: 70upx;
    background: #F7F7F7;
  }
  .top-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300upx;
  }
  .userinfo {
    position: relative;
    z-index: 11;
    margin: 0 24upx 0;
    padding: 48upx 0 32upx 30upx;
    border-radius: 10upx;
    background: #fff;

    .userinfo-header {
      display: flex;
      align-items: center;
      margin-bottom: 40upx;

      image {
        width: 136upx;
        height: 136upx;
        margin-right: 42upx;
        border-radius: 50%;
      }

      .userinfo-header__top {
        flex: 1;
        color: #999999;
        font-size: 26upx;

        h2 {
          margin-bottom: 20upx;
          color: #333;
          font-size: 34upx;
        }
      }
    }

    .userinfo-bottom {
      display: flex;
      .userinfo-bottom__item {
        flex: 1;
        text-align: center;
        color: #666666;
        font-size: 26upx;

        h3 {
          margin-bottom: 11upx;
          color: #333333;
          font-size: 34upx;
        }
      }
    }
  }

  .withdraw {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 700upx;
    height: 172upx;
    margin: 20upx auto;
    padding: 0 24upx;
    background: #fff;
    border-radius: 10upx;

    .withdraw-left {
      font-size: 26upx;
      color: #666666;

      h2 {
        margin-bottom: 16upx;
        color: #DFBF8D;
        font-size: 46upx;
      }
    }

    .withdraw-btn {
      width: 136upx;
      height: 45upx;
      line-height: 45upx;
      text-align: center;
      background: rgba(223,191,141,1);
      border-radius: 30upx;
      color: #fff;
    }
  }

  .list {
    width: 700upx;
    margin: 0 auto;
    padding: 32upx 0 32upx 0;
    font-size: 0;
    background: #fff;
    border-radius: 10upx;

    .item:nth-of-type(3) {
      margin-right: 0;
    }

    .item:nth-of-type(n + 4) {
      margin-top: 40upx;
    }
    
    .item {
      display: inline-block;
      width: 33%;
      text-align: center;
      vertical-align:top;

      image {
        width: 60upx;
        height: 60upx;
      }

      h2 {
        margin: 16upx 0 13upx 0;
        font-size: 24upx;
        color: #333;
      }

      span {
        color: #FA3E3F;
        font-size: 38upx;
      }
    }
  }
</style>
