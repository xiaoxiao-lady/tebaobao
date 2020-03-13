<template>
  <view class="message">
    <!-- <uni-swipe-action :options="options" v-for="(item, index) in chatList" :key="index" @on-click="toChat" @click="onRemove(index)"> -->
      <view class="item" hover-class="click-active-bgc" v-for="(item, index) in chatList" :key="index" @click="toChat(index)">
        <div class="avatar">
          <image :src="item.userAvatar" />
          <span v-if="item.is_read !== '1' && item.msgcount != 0">{{ item.msgcount }}</span>
        </div>
        <view class="item-middle">
          <view>{{ item.username }}</view>
          <text>{{ item.msgtype === 'img' ? '[图片]' : item.msg }}</text>
        </view>
        <view class="item-right">
          <text>{{ item.msgtime }}</text>
        </view>
      </view>
      <div class="no-more" v-if="!chatList.length">没有更多</div>
    <!-- </uni-swipe-action> -->
  </view>
</template>

<script>
  // import uniSwipeAction from '@/components/uni-swipe-action.vue'
	const webSocket = require('../../utils/socket.js') 

  export default {
    data () {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#fe3c30'
          }
        }],
        pageShow: false,
        chatList: []
      }
    },

    // components: {
    //   uniSwipeAction
    // },

    onShow () {
			webSocket.sendSocketMessage({
				data: JSON.stringify({
					type: 'chatlist',
					data: {
						fromid: uni.getStorageSync('token')
					}
        })
      })
      webSocket.onSocketMessageCallback = (res => {
				const data = JSON.parse(res.data)
				if (data.type === 'chatlist') {
          this.chatList = data.data.map(item => {
            if (item.fromid === uni.getStorageSync('token')) {
              item.userid = item.toid
              item.username = item.to_username
              item.userAvatar = item.to_headimgurl
            } else {
              item.userid = item.fromid
              item.username = item.from_username
              item.userAvatar = item.from_headimgurl
            }

            item.msgtime = this.$utils.fomartTime(item.msgtime)

            return item
          })
        }
        
        if (data.type === 'say') {
          webSocket.sendSocketMessage({
            data: JSON.stringify({
              type: 'chatlist',
              data: {
                fromid: uni.getStorageSync('token')
              }
            })
          })
        }
      })
    },

    onLoad () {
    },

    methods: {
      onRemove (index) {
        this.$toast(`您点击了第${index}个按钮`)
      },

      toChat (index) {
        this.getnav(`/pages/businessSon/chat?toId=${this.chatList[index].userid}`)
      }
    }
  }
</script>

<style lang="less">
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 136upx;
    padding: 0 24upx;
    color: #999;
    font-size: 24upx;
    border-bottom: 1upx solid #eee;

    .avatar {
      position: relative;
      width: 100upx;
      height: 100upx;
      margin-right: 24upx;
      border-radius: 10upx;

      span {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        background: red;
        color: #fff;
        font-size: 20rpx;
        border-radius: 50%;
        padding: 0.1rem 0.2rem;
        transform: translate(50%, -50%);
      }
    }

    image {
      width: 100upx;
      height: 100upx;
      border-radius: 10upx;
    }

    .item-middle {
      flex: 1;
      margin-right: 20upx;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      view {
        margin-bottom: 13upx;
        font-size: 30upx;
        color: #333;
      }

      text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .no-more {
    height: 100upx;
    line-height: 100upx;
    text-align: center;
    color: #999;
  }
</style>
