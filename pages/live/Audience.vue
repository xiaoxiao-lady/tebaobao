<template>
  <div class="wrap">
    <video id="myVideo" v-if="isShow" :src="src" @error="onErrorHandle" :autoplay="true" :controls="false"></video>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        src: '',
        isShow: false,
        info: {}
      }
    },

    onShow () {
      this.isShow = true
      uni.getStorage({
        key: 'pullurl',
        success: res => {
          this.src = res.data
        }
      })
    },

    onLoad () {
    },

    onHide () {
    },

    methods: {
      onErrorHandle (e) {
        this.$Dialog.confirm({
          title: '温馨提示',
          cancelButtonText: '退出房间',
          message: `还未开播`,
          confirmButtonText: '重新连接'
        }).then(() => {
          this.isShow = false 
          this.$nextTick(() => {
            this.isShow = true
          })
        }).catch(() => {
          this.getback()
        })
      },

      onEnd (e) {
        this.$Dialog.confirm({
          title: '温馨提示',
          cancelButtonText: '退出房间',
          message: `还未开播`,
          confirmButtonText: '重新连接'
        }).then(() => {
          this.isShow = false 
          this.$nextTick(() => {
            this.isShow = true
          })
        }).catch(() => {
          this.getback()
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  page, .wrap, #myVideo {
    width: 100%;
    height: 100vh;
  }
</style>  