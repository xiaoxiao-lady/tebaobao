<template>
    <view class="index_class">

        <view class="login_cont">
            <view class="login_form">
                <view class="form_items">
                    <view class="items_left">
                        <i class="iconfont icon_e62a"></i>
                        手机号
                    </view>
                    <input class="items_input" placeholder="请输入手机号" v-model="tel"  type="number" maxlength="11">
                </view>
                <view class="form_items">
                    <view class="items_left">
                        <i class="iconfont icon_eb16"></i>
                        短信验证码
                    </view>
                    <input class="items_input" placeholder="请输入验证码" v-model="code" type="text" maxlength="6">
                    <view class="in_code" @click="getcode">{{coun}}</view>
                </view>
                 <view class="form_items">
                    <view class="items_left">
                        <i class="iconfont icon_e84a"></i>
                        登录密码
                    </view>
                    <input class="items_input" placeholder="请输入密码" v-model="pwd" type="password" maxlength="18">
                    
                </view>
                <view class="form_items">
                    <view class="items_left">
                        <i class="iconfont icon_e84a"></i>
                        确认登录密码
                    </view>
                    <input class="items_input" placeholder="请输入确认密码" v-model="newpwd" type="password" maxlength="18">
                    
                </view>
                <view class="Sure">
                    <view class="land" @click="confirmRest">确认</view>
                   
                </view>
            </view>
            
        </view>
    </view>
</template>

<script>
let num = 60
export default {
    data(){
        return {
            tel:'',
            code:'',
            pwd:'',
            newpwd:'', //确认密码
            coun:'获取验证码'
        }
    },
    methods: {
        confirmRest(){
            if(this.tel.length < 11) {
                this.$toast('请输入正确的手机号')
                return false
            }
            if(this.code == '') {
                this.$toast('请输入验证码')
                return false
            }
            if(this.pwd == '') {
                this.$toast('请输入密码')
                return false
            }
            if(this.newpwd == '') {
                this.$toast('请输入确认密码')
                return false
            }
            if(this.newpwd != this.pwd) {
                this.$toast('两次输入的密码不一致')
                return false
            }
            this.$loading()
            let data = {
                phone:this.tel,
                phonecode:this.code,
                password:this.pwd,
                confirm_password:this.newpwd
            }
            this.$http.getfindpwd(data).then(res=>{
                if(res.status == 200) {
                    this.$toast(res.mess)
                    setTimeout(()=>{
                        this.getback()
                    },1000)
                }
            })
        },
        getcode(){
            // // 找回密码
            if(this.tel.length < 11) {
                this.$toast('请输入正确的手机号')
                return false
            }
            this.$loading()
            this.$http.getfindpwdcode({phone:this.tel}).then(res=>{
                if(res.status == 200) {
                    this.$toast(res.mess)
                    var timeId =setInterval( res=>{
                        --num
                        if(num == 0) {
                            this.coun = '重新获取'
                            clearInterval(timeId)
                        return false
                        }
                        this.coun = num + 's'
                    } ,1000)
                }
            })
        }
    },
}
</script>

<style scope>

</style>
