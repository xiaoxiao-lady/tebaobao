<template>
  <div class="pay-tool" v-show="valShow" >
      <div class="mask" ></div>
    <div class="pay_banner">
        <div class="pay-tool-title border-bottom">
            <span class="iconfont icon_e617" @click.stop="backHandle"></span><strong>请输入交易密码</strong>
            </div>
            <div class="pay-tool-content">
            <div class="pay-tool-inputs">
                <div class="item" v-for="(i,index) in items" :key="index"><span class="icon_dot iconfont icon_e7a5" v-if="password[i]">
                  </span></div>
            </div>
            <div class="pay-tool-link" @click="getnav('/pages/personalSon/resetpaypwd')">忘记密码？</div>
            </div>
            <div class="pay-tool-keyboard">
            <ul style="padding:0">
                <li @click.stop="keyUpHandle($event)" v-for="(val,index) in keys" :key="index" :data-number="val">
                {{ val }}
                </li>
                <li class="del" @click="delHandle" style="border-radius:0">
                    <span class="icon-del iconfont icon_e675" ></span>
                    </li>
            </ul>
            </div>
    </div>
  </div>
</template>

<script>

  const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
  // let sendFlag = true // 防止重复发送密码
  export default {
    data () {
      return {
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
        password: [],  
      }
    },
    props:{
      valShow : {
        type : Boolean,
        default : false
      },
    },
    watch:{
        valShow(val){
            console.log(val)
        }
    },
    methods: {
      backHandle () {
        this.clearPasswordHandle()  // 返回时清除password
        this.$emit('backHied') // 返回上级
        
      },
      keyUpHandle (e) {
        
        let text = e.currentTarget.dataset.number.toString()
        console.log(e)
        let len = this.password.length
        if ( !text || len >= 6) return
        this.password.push(text)
        this.ajaxData()
      },
      delHandle () {
        if (this.password.length <= 0) return false
        this.password.shift()
      },
      ajaxData () {
        if (this.password.length >= 6) {
            let data = {
                cord:parseInt(this.password.join(' ').replace(/\s/g, '')),
                backHied:false
            }
            this.clearPasswordHandle()
            this.$emit('cord_info',data)
            
        }
        return false
      },
      clearPasswordHandle: function () {
        this.password = []
      },
     
    }
  }
</script>

<style lang="less" scoped>
ul li {
  
list-style-type:none;
margin: 0;
padding: 0;
box-sizing: border-box;
}
.pay_banner {
    position: fixed;
    height: 17rem;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    z-index: 99999;
}

.mask {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
  .pay-tool {
    position: relative;

    &-title {
      width: 100%;
      height: 2.08888888rem;
      padding: 0 0.8rem;
      line-height: 2.08888888rem;
      text-align: center;
      overflow: hidden;
      .icon {
        float: left;
        margin-top: 0.72222222rem;
      }
      strong {
        font-size: 0.8rem;
      }
    }
    &-content {
      .pay-tool-inputs {
        width: 14.46666666rem;
        height: 2.31111111rem;
        margin: 1.28888888rem auto 0;
        border: 1px solid #b9b9b9;
        border-radius: 0.26666666rem;
        box-shadow: 0 0 1px #e6e6e6;
        display: flex;
        overflow: hidden;
        .item {
          width: 16.66666666%;
          height: 2.31111111rem;
          border-right: 1px solid #b9b9b9;
          line-height: 2.31111111rem;
          text-align: center;
          &:last-child {
            border-right: none;
          }
          .icon_dot {
            display: inline-block;
            width: 0.51111111rem;
            height: 0.51111111rem;
            // background: url("../../static/img/dian.png") no-repeat;
            // background-size: cover;
          }
        }
      }
      .pay-tool-link {
        padding: 0.53333333rem 0.8rem 0;
        text-align: right;
        .link {
          font-size: 0.66666666rem;
          color: #3c8cfb;
        }
      }
    }
    .pay-tool-keyboard {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 33.3333%;
          height: 2.25442834rem;
          line-height: 2.25442834rem;
          text-align: center;
          border-right: 1px solid #aeaeae;
          border-bottom: 1px solid #aeaeae;
          font-size: 0.8rem;
          font-weight: bold;
          &:nth-child(1), &:nth-child(2), &:nth-child(3) {
            border-top: 1px solid #eee;
          }
          &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
            border-right: none;
          }
          &:nth-child(10), &:nth-child(11), &:nth-child(12) {
            border-bottom: none;
          }
          &:nth-child(10), &:nth-child(12), &:active {
            background-color: #d1d4dd;
          }
          &:nth-child(12):active {
            background-color: #fff;
          }
        }
      }
    }
  }

  .icon_e617 {
      font-size: 18px;
      position: absolute;
      left: 10px;
      top: 10px;   
  }

</style>
