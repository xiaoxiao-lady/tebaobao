<template>

  <div class="login" v-if="islogin" catchtouchmove="ontouch">
    <view class="mask"></view>
    <view class="cont-mask">
      <view class="img">
        <image src="/static/images/title.png" />
        <image src="/static/images/weixin.png" />
      </view>
      <view class="text">请先登陆APP</view>
      <button class="v-btn" hover-class="bg-hover"  @click="getUserInfo">立即登录</button>
    </view>
    
  </div>
</template>

<script>
 

  export default {
    name:'login',
    props:{
      islogin:{
        default:false
      }
    },
    data () {
      return {

      }
    },
    onLoad(option) {
      
    },
    methods: {

      getUserInfo (event) {
        uni.navigateTo({
          url: '/pages/loginSon/login?islogin=' + 0
        });
      },

      ontouch () {

      }
    }
  }
</script>

<style lang="less" scoped>
page {
  position: relative;
  
}
  .login {
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 9999999;
    }
    .img {
      width: 167upx;
      margin: 0 auto;
      margin-top: -100upx;
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      image:nth-child(1) {
        width: 205upx;
        height: 215upx;
      }
      image:nth-child(2) {
        width: 80upx;
        height: 70upx;
        margin: 20upx 0 30upx 0;
       
      }
    }
    .cont-mask {
      // height: 300upx;
      width: 550upx;
      background-color: #fff;
      border-radius: 20upx;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 99999999;
    }
    .text {
      font-size: 26upx;
      color: #999;
      text-align: center;
    }
    
  }
</style>
