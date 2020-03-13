<template>
  <div class="rule" v-if="pageShow">
    <div class="content" v-html="content">

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content: '',
        pageShow: false
      }
    },

    onLoad () {
      this.getRule()
    },

    methods: {
      getRule () {
        this.$loading()
        this.$http.getFightGroupRule().then(res => {
          if (res.status === 200) {
            this.content = res.data.content
            setTimeout(() => {
              this.pageShow = true
            }, 300)
          } else {
            this.$toast(res.msg)
          }
        })
      }
    },
  }
</script>

<style lang="less">
  .content {
    padding: 0.4rem 0.3rem 0 0.3rem; 
  }
</style>
