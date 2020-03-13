<template>
  <div class="emoji" :class="{show: isShow}">
    <div class="input-wrap">
      <div class="footer">
        <div class="footer-left">
			    <i class="iconfont" @tap="upload">&#xe66d;</i>
          <i class="iconfont" @tap="hideShowEmoji">&#xe64d;</i>
        </div>
        <div class="footer-center">
          <div class="input-text" placeholder="请输入消息" type="text" @click="hideShowEmoji">{{ content }}</div>
        </div>
        <div class="footer-right" @tap="sendMessge">发送</div>
      </div>
    </div>
    <swiper :indicator-dots="true" class="emoji-content-swiper">
      <block v-for="(item, index) in currentAlbumKeys" :key="index" v-if="index < 4">
        <swiper-item>
          <view class="emoji-content-item" v-for="(currentEmojiKey, i) in item" :key="i" @tap="emojiTap(currentEmojiKey)">
            <image :src="emojiList[currentAlbum][currentEmojiKey].img" :class="[currentAlbum == 'emoji' ? 'emoji-content-img-emoji' : 'emoji-content-img-other']" />
          </view>
        </swiper-item>
      </block>  
    </swiper>
  </div>
</template>

<script>
  import EmojiObj from '../../utils/emojimap.js'
	import chatInput from './chatinput.vue'

  export default {
    data () {
      return {
        localAlbumImages: ['/images/album-emoji.png'],
        albumArr: [],
        currentAlbum: 'emoji',
        emojiList: {},
        currentAlbumKeys: [],
        content: ''
      }
    },

    props: ['isShow', 'inputValue', 'type'],

		components: {
			chatInput
		},

    mounted () {
      let currentAlbumKeys = this.splitAlbumKeys(Object.keys(EmojiObj.emojiList[this.currentAlbum]), this.currentAlbum == 'emoji' ? 23 : 10)
      this.currentAlbumKeys = currentAlbumKeys
      this.albumArr = EmojiObj.albumArr
      this.emojiList = EmojiObj.emojiList
      this.content = this.inputValue
    },

    methods: {
      /**
       * 每页显示固定个数
       * arr数据源数组，space每个数组最大容量 
       * [[], [], []]
       */
      splitAlbumKeys (arr, space, currentAlbum) {
        const delta = space || 23
        let result = [],
          factor = Math.ceil(arr.length / delta),
          begin = 0,
          end = 1
        if (factor == 1) {
          result = [[...arr]]
        } else {
          for (let i = 1; i < factor; i++) {
            let temp = []
            temp = [...arr.slice(begin, i * delta)]
            begin = i * delta
            result.push(temp)
          }
          result.push([...arr.slice(delta * (factor - 1), arr.length)])
        }
        if (currentAlbum == 'emoji' || this.currentAlbum == 'emoji') { // 只有emoji才添加删除按钮
          result.map((cata, index) => {
            if(index != (result.length-1)) {
              cata.push('[删除]')
            }
          })
        }
        return result
      },

      sendMessge (message) {
        if (!this.content) return false

        this.$emit('send-message', {
          type: 'text',
          content: this.content
        })

        this.content = ''
      },

      hideShowEmoji () {
        this.$emit('show-emoji', 1, this.content)
        this.$emit('updata-val', this.content)
      },

      /**
       * 单击emoji
       */
      emojiTap (msg) {
        if (msg === '[删除]') {
          if (!this.content) return false

          this.content = this.content.substr(0, this.content.lastIndexOf("face"))

          return false
        }

        this.content = `${this.content}${msg}`
      },

      upload () {
        this.$emit('on-upload')
      }
    },

    watch: {
			isShow () {
        this.content = this.inputValue
			},

			// content (val) {
      //   this.$emit('updata-val', this.content)
			// }
    }
  }
</script>

<style scoped lang="less">
  @import '../../static/css/emoji.less';
</style>
