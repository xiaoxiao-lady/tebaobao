<template>
  <div v-if="pageShow">
	  <div style="text-align: center;padding: 30px;">我的推广码: {{yaoqingma}}</div>
	<!-- <div style="text-align: center;padding: 30px;">点击查看大图</div>
    <image @click="preview" :src="src"  style="width: 80%;margin-left: 10%;"/> -->
	<div style="text-align: center;font-size: 12px;color: #4C4C4C;margin-top: 30%;">
		<div>
		Copyright©2020
		</div>
		<div>
			柏思美 版权所有
		</div>
	</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        src: '',
		yaoqingma:'',
        pageShow: false
      }
    },

    onLoad () {
      this.getQRcode()
    },

    methods: {
      getQRcode () {
        this.$http.getDistributionORode().then(res => {
          if (res.status === 200) {
            this.src = res.data.qrcodeurl
			this.yaoqingma = res.data.id
            setTimeout(() => {
              this.pageShow = true
            }, 300)
          }
        })
      },

      preview () {
        uni.previewImage({
          current: 0,
          urls: [this.src]
        })
      }
    }
  }
</script>

<style>

</style>
