<template>
    <view class="index_class">
    
        <view class="setup">
            <view class="per-lists" style="margin-top: 0;">
                <view class="items">
                    
                    <!-- <image src="../../static/images/img/img-2.png" /> -->
                    手机号
                    <input type="number " class="input" v-model="phone" placeholder="请输入手机号" maxlength="11">
                    <!-- <i class="iconfont icon_e60c"></i> -->
                </view>
                <view class="items">
                    验证码
                    <view class="code-right">
                        <input type="text " class="input" v-model="code"  placeholder="请输入验证码" maxlength="6">
                    
                        <text class="itm-color" @click="getczpaypwdcode">{{clickText}}</text>
                    </view>
                    
                </view>

                <view class="items">
                    重置支付密码
                    <input type="number" password="true" maxlength="6"  class="input" v-model="newpwd" placeholder="请输入支付密码">
                </view>
                <view class="items">
                    确认支付密码
                    <input type="number"  password="true" maxlength="6" class="input" v-model="confirmpwd" placeholder="请输入确认密码">
                </view>
            </view>

            
            <view class="person-button">
                <button type="warn" @click="confirmClick" class="btn">确认修改</button>
            </view>
        </view>
    </view>
</template>

<script>
let courr = 60
let setId = null
export default {
    data(){
       return {
            phone:'',
            code:'',
            newpwd:'',
            confirmpwd:'',
            clickText:'获取验证码'
       }
    },
    methods: {
        confirmClick(){
            if(this.phone.length != 11) {
                this.$toast('请输入正确的手机号')
                return false
            }
            if(this.code == '') {
                this.$toast('请输入验证码')
                return false
            }
            if(this.newpwd == '') {
                this.$toast('请输入支付密码')
                return false
            }
            if(this.newpwd != this.confirmpwd) {
                this.$toast('两次输入的密码不一致')
                return false
            }

            this.$http.getresetpaypwd({
                phonecode:this.code,
                paypwd:this.newpwd,
                confirm_pwd:this.confirmpwd
            }).then(res=>{
                if(res.status == 200) {
                    this.$toast(res.mess)
                    setTimeout (()=>{
                        this.getback()
                    },1500)
                }
            })
        },
        getczpaypwdcode(){
            if(this.phone.length != 11) {
                this.$toast('请输入正确的手机号')
                return false
            }
            if(setId) {
                // 禁止重复发送 
                return false
            }
            this.$http.getczpaypwdcode({phone:this.phone}).then(res=>{
                if(res.status == 200) {
                   this.$toast(res.mess)
                   setId = setInterval(()=>{
                       courr--
                       if(courr == 0) {
                           courr = 60
                           clearInterval(setId)
                           this.clickText = '重新获取'
                           
                           return false
                       }
                       this.clickText = courr + 's'
                   },1000)
                }
            })
        },
    },
}
</script>

<style>

</style>
