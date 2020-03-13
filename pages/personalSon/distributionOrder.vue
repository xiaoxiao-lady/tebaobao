<template>
  <div class="order">
    <div class="order-item" v-for="(item, index) in list" :key="index">
      <div class="order-title flex-between">
        <span class="order-date">申请时间  2019-05-20 16:44:59</span>
        <span>已完成</span>
      </div>
      <div class="order-info flex">
        <div class="order-info-left">
          <img src="https://nycs.maitexun.cn/uploads/member_pic/20190430/8fad763b6f169ec656197cbfabf5e1b8.jpg" alt="">
        </div>
        <div class="order-info-right">
          <p>且听风吟</p>
          <p>所属上级  小心心</p>
        </div>
      </div>
      <div class="order-order flex-between">
        <span class="order-ordernum ellipsis">订单号 2019151546564565464545665645</span>
        <div class="order-money flex"><span>交易金额&nbsp;&nbsp;¥</span><i>200</i></div>
      </div>
    </div>
    <div class="no-more" v-if="isMore">没有更多</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageShow: false,
        page: 0,
        isMore: false,
        list: [],
        isLoading: false
      }
    },

    onLoad () {
      this.getOrderList()
    },

    methods: {
      getOrderList () {
        if (this.isMore && this.isLoading) return

        this.isLoading = true
        this.$http.getDistributionOrderList({
          page: this.page + 1
        }).then(res => {
          if (res.status === 200) {
            this.isLoading = false
            if (!res.data.orderes.length) {
              this.isMore = true

              return false
            }

            if (this.list.length) {
              this.list = [...list, ...res.data.orderes]
            } else {
              this.list = res.data.orderes
            }
            this.pageShow = true
          } else {
            this.isLoading = false
            this.$toast(res.mess)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  page {
    padding-top: 20upx;
    background: #f4f6f9;
  }
  .order-item{
    height: 336upx;
    margin: 0 24upx 20upx 24upx;
    border-radius: 10upx;
    background-color: #fff;
  }
  .order-item:first-child {
    margin-top: 0;
  }
  .order-title{
    height: 90upx;
    line-height: 90upx;
    padding: 0 41upx 0 23upx;
    font-size: 28upx;
    border-bottom: 1upx solid #e8e8e8;
  }
  .order-date{
    color: #555;
    font-size: 28upx;
  }
  .order-info{
    height: 156upx;
    border-bottom: 1upx dashed #e8e8e8;
  }
  .order-info-left img{
    width: 90upx;
    height: 90upx;
    border-radius: 50%;
    margin: 34upx 20upx 0 26upx;
  }
  .order-info-right{
    font-size: 28upx;
    color: #999;
    margin-top: 34upx;
  }
  .order-info-right p{
    height: 28upx;
  }
  .order-info-right p:nth-of-type(1){
    margin-bottom: 36upx;
  }
  .order-order{
    height: 90upx;
    line-height: 90upx;
    padding: 0 24upx;
  }
  .order-ordernum{
    width: 470upx!important;
    font-size: 26upx;
    color: #999;
  }
  .order-money{
    display: flex!important;
    font-size: 26upx;
    color: #545454;

    span, i {
      font-style: normal;
      font-size: 26upx;
    }
  }
</style>
