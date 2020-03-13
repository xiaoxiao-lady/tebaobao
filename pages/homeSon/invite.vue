<template>
  <div class="invite" v-if="pageShow">
    <div class="invite-header">
      <div class="invite-header__user" v-if="info.member_assem">
        <image v-for="(item, index) in info.member_assem" :src="item.headimgurl" :key="index" />
      </div>
      <p>还差一步,在邀请{{ info.num }}位好友参团</p>
      <span>拼团成功才可享受拼团优惠价哦~</span>
    </div>
    <div class="invite-body">
      <h2>邀请好友</h2>
      <div class="invite-body__wrap">
        <div class="invite-body__wrap--item" hover-class="text-hover" @click="invite">
          <image src="../../static/images/img/chat.png" />
          <span>微信</span>
        </div>
        <div class="invite-body__wrap--item" hover-class="text-hover" @click="copy">
          <image src="../../static/images/img/copylink.png" />
          <span>复制链接</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageShow: false,
        info: {}
      }
    },

    onLoad () {
      this.getInfo()
    },

    methods: {
      getInfo () {
        this.$loading()
        this.$http.getInviteInfo({
          pin_id: this.$mp.query.pin_id,
          tuan_id: this.$mp.query.tuan_id
        }).then(res => {
          if (res.status === 200) {
            this.info = res.data
            this.pageShow = true
          } else {
            this.$toast(res.mess)
          }
        })
      },

      invite () {
        uni.share({
          type: 0,
          provider: 'weixin',
          scene: 'WXSceneSession',
          title: 'wosmart 商城',
          summary: this.info.goods_name,
          href: `${this.info.weburl}?pin_id=${this.$mp.query.pin_id}&tuan_id=${this.$mp.query.tuan_id}&goods_id=${this.info.goods_id}`,
          imageUrl: `https://nycs.maitexun.cn/uploads/logo.png`,
          success: () => {
            this.$toast('分享成功')
          },
          fail: (err) => {
            this.$toast('分享失败')
          }
        })
      },

      copy () {
        uni.setClipboardData({
          data: `${this.info.weburl}?pin_id=${this.$mp.query.pin_id}&tuan_id=${this.$mp.query.tuan_id}&goods_id=${this.info.goods_id}`,
          success: () => {
            this.$toast('复制成功')
          }
        })
      }
    }
  }
</script>

<style lang="less">
  page, .fightgroup {
    height: 100%;
    background: #fff;
  }

  .invite-body {
    padding: 35upx 24upx 0 24upx;
    h2 {
      margin-bottom: 30upx;
      font-size: 28upx;
      color: #333;
    }

    .invite-body__wrap {
      display: flex;

      .invite-body__wrap--item {
        width: 100upx;
        margin-right: 28upx;
        text-align: center;
        color: #333;
        font-size: 24upx;

        &:last-child {
          margin-right: 0;
        }

        image {
          width: 92upx;
          height: 92upx;
          margin-bottom: 22upx;
        }
      }
    }
  }

  .invite-header {
    padding-top: 52upx;
    padding-bottom: 37upx;
    text-align: center;
    border-bottom: 20upx solid #f4f4f4;

    & > p {
      color: #E46800;
      font-size: 28upx;
      text-align: center;
      margin-top: 24upx;
      margin-bottom: 8upx;
    }

    span {
      color: #999999;
      font-size: 22upx;
    }

    .invite-header__user {
      margin-bottom: 27upx;
      text-align: center;
      image {
        width: 104upx;
        height: 104upx;
        margin-left: -22upx;
        border-radius: 50%;
      }
    }
  }
</style>
