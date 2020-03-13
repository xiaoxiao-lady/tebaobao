<template>
    <view class="content">		
			<view class="butlist">
				<view @click="back" class="buticon martp10">
					<image src="./../../static/images/back2.png"></image>	
					<view class="mar10">返回</view>				
				</view>
				<view @click="switchCamera" class="buticon martp10">
					<image src="./../../static/images/reversal.png"></image>	
					<view class="mar10">翻转</view>				
				</view>
				<view class=" buticon" @click="startPusher">
					<view class="x_f"></view>
					<view :class="begin==true?'givebegin':'give'" >{{contTime}}</view>
					<view class="pulse" v-if="begin"></view>
				</view>
				<view class="buticon martp10">
					<picker :value="index" @change="bindPickerChange" :range="array" range-key='level'>
            <image src="./../../static/images/beautiful.png"></image>	
            <view class="mar10">美白</view>
					</picker>	
				</view>		
				<view class="buticon martp10" @click="beautiful">
          <image src="./../../static/images/beautiful.png"></image>	
          <view class="mar10">美颜</view>
				</view>		
			</view>
    </view>
</template>

<script>
  export default {
    data() {
      return {
        begin: false,//开始录制
        pause: false,//暂停推流
        currentWebview: null,
        pusher: null,
        livepushurl: '',
        whitenessLevel: 2,
        isBeautiful: 0,
        array: [
          {
            level: 0
          },
          {
            level: 1
          },
          {
            level: 2
          },
          {
            level: 3
          },
          {
            level: 4
          },
          {
            level: 5
          }
        ]
      }
    },

    onShow() {
		this.isShow = true
		uni.getStorage({
		  key: 'pullurl',
		  success: res => {
		    this.src = res.data
		  }
		})
      uni.getNetworkType({
        success: function (res) {
          if (res.networkType != 'wifi') {
            uni.showModal({
              title: '温馨提示',
              content: '当前非Wifi网络，请注意您的流量是否够用',
              success: (res) => {

              }
            })
          }
        }
      })
      uni.onNetworkStatusChange(function (res) {
        if (res.networkType != '4g' && res.networkType != 'wifi') {
          uni.showModal({
            title: '温馨提示',
            content: '当前网络质量差，请切换为4G网络或Wifi网络',
            success: (res) => {
            }
          })
        }
      })
    },
    onLoad() {
      this.livepushurl = uni.getStorageSync('pullurl')
      console.log(uni.getStorageSync('pullurl'))
      this.getwebview()
    },
    methods: {
      bindPickerChange (e) {
        this.pusher.setStyles({
          whiteness: parseInt(e.target.value)
        })
        this.$toast(`美白等级${e.target.value}`)
      },
      back () {
        this.$Dialog.confirm({
          message: '确定退出直播'
        }).then(() => {
          this.pusher.stop()
          this.getback()
        })
      },

      getwebview() {
        var pages = getCurrentPages();
        var page = pages[pages.length - 1];
        // #ifdef APP-PLUS
        var getcurrentWebview = page.$getAppWebview();
				this.currentWebview = getcurrentWebview;
        this.plusReady()

        // #endif
      },

			/**
			 * 创建LivePusher对象 即推流对象
			 */
      plusReady() {
        this.pusher = new plus.video.LivePusher('pusher', {
          url: '',
          top: '0',
          left: '0px',
          width: '100%',
		height: uni.getSystemInfoSync().windowHeight - uni.upx2px(560) + 'px',
          position: 'absolute',
          beauty: 0,
          whiteness: 0,
          aspect: '9:16',
        })
        this.currentWebview.append(this.pusher)
        this.pusher.addEventListener('statechange', (e) => {
          console.log('statechange: ' + JSON.stringify(e))
        }, false);
      },

      beautiful() {
        if (this.isBeautiful) {
          this.pusher.setStyles({
            beauty: 0
          })
          this.isBeautiful = false
          this.$toast('关闭美颜')
        } else {
          this.pusher.setStyles({
            beauty: 1
          })
          this.isBeautiful = true
          this.$toast('开启美颜')
        }
      },

      startPusher() {
        this.beginlivepush()
      },
      beginlivepush() {
        if (this.begin == false) {//未开启推流
          this.begin = true;//显示录制动画
          // 设置推流服务器  ***此处需要通过ajax向后端获取
          this.pusher.setStyles({
            url: this.livepushurl //推流地址********************************* 此处设置推流地址
          });
          this.pusher.start();//推流开启
          uni.showToast({
            title: '开始录制',
            icon: 'none',
            duration: 2000,
          });
        } else {
          if (this.pause == true) {//暂停推流状态
            this.begin = true;//显示录制动画
            this.pause = false;//推流开关置为默认状态
            this.pusher.resume();//恢复推流
            uni.showToast({
              title: '开始录制',
              icon: 'none',
              duration: 2000,
            });
          } else {
            this.begin = false;//关闭录制动画
            this.pause = true;//推流暂停
            this.pusher.pause();;//暂停推流
            uni.showToast({
              title: '暂停录制',
              icon: 'none',
              duration: 2000,
            })
          }
        }
      },
			/**
			 * 切换摄像头
			 */
      switchCamera() {
        this.pusher.switchCamera();
      }
    }
  }
</script>

<style>
	page {
		height: 100%;
	}

  .content {
    background: #000;
    overflow: hidden;
		height: 100%;
  }
  .butlist {
    height: 140upx;
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-around;
		box-sizing: border-box;
  }
  .buticon {
    width: 120upx;
    color: #fff;
    position: relative;
    text-align: center;
  }
  .buticon image {
    height: 64upx;
    width: 64upx;
  }
  .buticon .mar10 {
  }
  .martp10 {
    margin-top: 10upx;
  }
  .give {
    width: 90upx;
    height: 90upx;
    background: #f44336;
    border-radius: 50%;
    box-shadow: 0 0 22upx 0 rgb(252, 94, 20);
    position: absolute;
    left: 15upx;
    top: 15upx;
    font-size: 44upx;
    line-height: 90upx;
  }
  .givebegin {
    width: 60upx;
    height: 60upx;
    background: #f44336;
    border-radius: 20%;
    box-shadow: 0 0 22upx 0 rgb(252, 94, 20);
    position: absolute;
    left: 30upx;
    top: 30upx;
  }
  .x_f {
    /* border: 6upx solid #F44336; */
    width: 120upx;
    height: 120upx;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    box-shadow: 0 0 28upx 0 rgb(251, 99, 24);
  }

  /* 产生动画（向外扩散变大）的圆圈  */
  .pulse {
    width: 160upx;
    height: 160upx;
    position: absolute;
    border: 12upx solid #f44336;
    border-radius: 100%;
    z-index: 1;
    opacity: 0;
    -webkit-animation: warn 2s ease-out;
    animation: warn 2s ease-out;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    left: -28upx;
    top: -28upx;
  }

  /**
  	 * 动画
  	 */
  @keyframes warn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    25% {
      transform: scale(0);
      opacity: 0.1;
    }
    50% {
      transform: scale(0.1);
      opacity: 0.3;
    }
    75% {
      transform: scale(0.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>
