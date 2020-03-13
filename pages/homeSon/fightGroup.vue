<template>
  <div class="fightgroup" v-if="pageShow">
    <div class="fightgroup-header">
      <image :src="info.goodsinfo.thumb_url" />
      <div class="fightgroup-header__right">
        <h2>{{ info.goodsinfo.goods_name }}</h2>
        <i>{{ info.goodsinfo.goods_attr_str }}</i>
        <span>{{ info.goodsinfo.pin_num }}人团</span>
        <div class="fightgroup-header__right--bottom flex-align">
          <span>¥{{ info.goodsinfo.price }}</span>
        </div>
      </div>
    </div>
    <div class="fightgroup-content">
      <div class="fightgroup-content__user">
        <div class="userlist">
          <image v-for="(item, index) in info.member_assem" :src="item.headimgurl" :key="index" />
          <div v-if="item.pin_type === 1">团长</div>
        </div>
        <p class="tip">{{ info.pininfo }}</p>
      </div>
      <div v-if="info.zhuangtai === 1">
        <p class="tip-content" v-if="info.zhuangtai === 1">{{ info.tuan_name }}</p>
        <div class="countdown">
          <uni-countdown 
            :day="day" 
            :hour="hours"
            :second="second"
            splitor-color="#FF7900"
            background-color="#FF8300"
            border-color="#FF8300"
            color="#fff"
            :minute="minute">
          </uni-countdown>
          <div class="fightgroup-btn" @click="toIntive">邀请好友</div>
        </div>
      </div>
      <div v-if="info.zhuangtai === 2">
        <p v-if="info.zhuangtai === 1">{{ info.tuan_name }}</p>
        <div class="fightgroup-btn" @click="getnav('/pages/homeSon/orderDetails?order_num=' + info.order_num)">查看订单</div>
      </div>
      <div v-if="info.zhuangtai ===3">
        <p v-if="info.zhuangtai === 1">{{ info.tuan_name }}</p>
        <div class="fightgroup-btn" @click="getnav('/pages/homeSon/orderDetails?order_num=' + info.order_num)">查看订单</div>
      </div>
      <view class="fight-group__step--list">
        <view class="fight-group__step--item step-item__active">
            <image src="../../static/images/img/fight-group.png" />
            <text>发起拼团</text>
        </view>
        <view class="fight-group__step--item" :class="[info.zhuangtai > 0 ? 'step-item__active' : '']">
            <image :src="info.zhuangtai > 0 ? '../../static/images/img/fight-group.png' : '../../static/images/img/fight-group-disable.png'" />
            <text>邀请好友参团</text>
        </view>
        <view class="fight-group__step--item" :class="[info.zhuangtai == 2 ? 'step-item__active' : '']">
            <image :src="info.zhuangtai == 2 ? '../../static/images/img/fight-group.png' : '../../static/images/img/fight-group-disable.png'" />
            <text>拼团成功</text>
        </view>
      </view>
      <div class="fightgroup-footer">
        <span>支付开团并邀请1人餐团,24小时内人数不足自动退款</span>
        <i class="iconfont icon_e60c"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import uniCountdown from "../../components/uni-countdown.vue"; 
  export default {
    data () {
      return {
        info: {},
        goodsinfo: {},
        userList: [],
        pageShow: false,
        hours: 0,
        day: 0,
        minute: 0,
        second: 0
      }
    },

    components: {
      uniCountdown
    },

    onLoad () {
      this.getDetail()
    },

    methods: {
      getDetail () {
        this.$loading()
        this.$http.getPinTuanDetail({
          order_num: this.$mp.query.order_num
        }).then(res => {
          if (res.status === 200) {
            this.formatTime(res.data.timeout - res.data.nowtime)
            this.info = res.data
            uni.setNavigationBarTitle({
              title: res.data.pininfo
            })
            this.pageShow = true
          }
        })
      },

      toIntive () {
        this.getnav(`/pages/homeSon/invite?pin_id=${this.info.pin_id}&tuan_id=${this.info.tuan_id}`)
      },

      formatTime (time) {
        let day = 0
        let hours = 0
        let minute = 0
        let second = 0
        if (time > 60 * 60 * 24) {
          day = Math.floor(time / (60 * 60 * 24))
        }

        if ((time - day * 60 * 60 * 24) > 60 * 60) {
          hours =  Math.floor((time - day * 60 * 60 * 24) / (60 * 60))
        }

        if ((time - day * 60 * 60 * 24 - hours * 60 * 60) > 60) {
          minute =  Math.floor((time - day * 60 * 60 * 24 - hours * 60 * 60) / 60)
        }

        if ((time - day * 60 * 60 * 24 - hours * 60 * 60 - minute * 60) > 0) {
          second =  time - day * 60 * 60 * 24 - hours * 60 * 60 - minute * 60
        }
        this.day = day
        this.hours = hours
        this.minute = minute
        this.second = second
      } 
    }
  }
</script>

<style lang="less">
  page, .fightgroup {
    height: 100%;
    background: #fff;
  }
  .step-item__active {
    color: #FA3F3F!important;
  }
  .fightgroup-header {
    display: flex;
    align-items: center;
    height: 300upx;
    padding: 0 64upx 0 26upx;
    border-bottom: 26upx solid #f4f4f4;
    background: #fff;
    image {
      width: 210upx;
      height: 210upx;
      margin-right: 30upx;
      border-radius: 10upx;
    }

    .fightgroup-header__right--bottom {
      padding-top: 10upx;
      span {
        padding-right: 12upx;
        color: #F7544E;
        font-size: 30upx;
      }

      i {
        font-size: 24upx;
        font-style: normal;
        color: #999999;
        text-decoration: line-throug;
      }
    }

    .fightgroup-header__right {
      flex: 1;

      & > span {
        height: 34upx;
        line-height: 34upx;
        margin-bottom: 34upx;
        padding: 0 10upx;
        font-size: 24upx;
        color: #E46800;
        border-radius: 4upx;
        border: 1upx solid rgba(229,109,10,1);
      }

      i {
        display: block;
        margin-bottom: 10upx;
        color: #999;
        font-size: 24upx;
      }

      h2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        color: #333;
        font-size: 28upx;
        line-height: 1.4;
        margin-bottom: 8upx;
      }
    }
  }

  .fightgroup-btn {
    width: 578upx;
    height: 88upx;
    line-height: 88upx;
    margin: 58upx auto 85upx auto;
    text-align: center;
    font-size: 30upx;
    color: #fff;
    background: rgba(247,84,78,1);
    border-radius: 47upx;
  }

  .fightgroup-content {
    padding-top: 40upx;

    .tip-content {
      text-align: center;
      margin-bottom: 20upx;
    }

    & > p {
      color: #999;
      font-size: 28upx;
      text-align: center;
      margin-bottom: 11upx;
    }

    .fightgroup-content__user {
      margin-bottom: 27upx;
      text-align: center;
      image {
        width: 104upx;
        height: 104upx;
        margin-left: -22upx;
        border-radius: 50%;
      }
    }

    .countdown {
      text-align: center;
    }
  }

  .fight-group__step--list {
    display: flex;
    .step-item__active {
      color: #FF8300!important;
    }

    .fight-group__step--item {
      flex: 1;
      color: #999999;
      font-size: 24upx;
      text-align: center;

      &:last-child image::after {
          display: none;
      }
      image {
          position: relative;
          z-index: 11;
          width: 40upx;
          height: 40upx;
          overflow: inherit!important;
          margin-bottom: 24upx;

          &::after {
              position: absolute;
              left: 40upx;
              top: 50%;
              width: 239upx;
              height: 2upx;
              background: #E8E8E8;
              content: '';
              transform: translateY(-50%);
          }
      }
      text {
          display: block;
      }
    }
  }

  .fightgroup-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 40upx;
    padding: 0 24upx;
    color: #999999;
    font-size: 24upx;
  }
</style>
