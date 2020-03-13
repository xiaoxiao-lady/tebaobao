<template>
    <view class="index_class">
      
        <view class="login_cont">
            <view class="login_form">
                <view class="form_items">
                    <view class="items_left">
                        <i class="iconfont icon_e62a"></i>
                        手机号
                    </view>
                    <input class="items_input" placeholder="请输入手机号" v-model="number"  type="number" maxlength="11">
                </view>
                <view class="form_items">
                    <view class="items_left" >
                        <i class="iconfont icon_eb16"></i>
                        短信验证码
                    </view>
                    <input class="items_input" placeholder="请输入验证码" v-model="code" type="text" maxlength="6">
                    <view class="in_code" @click="encode">{{ coun }}</view>
                    
                </view>
                 <view class="form_items">
                    <view class="items_left">
                        <i class="iconfont icon_e84a"></i>
                        登录密码
                    </view>
                    <input class="items_input" placeholder="请输入密码" v-model="repwd" type="password" maxlength="18">
                    <!-- <view class="in_code">获取验证码</view> -->
                </view>
                <view class="form_items">
                    <view class="items_left">
                        <i class="iconfont icon_e84a"></i>
                        确认登录密码
                    </view>
                    <input class="items_input" placeholder="请输入密码" v-model="pwd" type="password" maxlength="18">
                    <!-- <view class="in_code">获取验证码</view> -->
                </view>
				<view class="form_items">
				    <view class="items_left">
				        <i class="iconfont icon_e62a"></i>
				        邀请码
				    </view>
				    <input class="items_input" placeholder="请输入邀请码" v-model="yaoqingma"  type="yaoqingma" >
				</view>
                <view class="Sure">
                    <view class="land"  @click="register">注册</view>
                    <view class="account">已有账号：<text @click="getback()">立即登录</text></view>
                    <!-- <view class="reg">
                        <text></text>
                        <text @click="getnav('/pages/loginSon/register')">免费注册</text>
                    </view> -->
                </view>
            </view>
            
        </view>
    </view>
</template>

<script>
let num = 60
// var member_recode = null 
export default {
	// onLoad(option){
	//     member_recode = option.member_recode
	// },
    data(){
        return {
			yaoqingma:'',
            number:'',
            coun : '获取验证码',
            code:'',
            pwd:'',
            repwd:''
            
        }
    },
    methods: {
        register:function(){
            if(this.number.length < 11) {
                this.$toast('请输入正确的手机号')
                return false
            }
            if(this.code == '') {
                this.$toast('请输入短信验证码')
                return false
            }
            if(this.pwd.length < 6) {
                this.$toast('请输入大于6位登陆密码')
                return false
            }
            if(this.repwd.length < 6) {
                this.$toast('请输入大于6位确认登陆密码')
                return false
            }
            if(this.pwd != this.repwd ) {
                this.$toast('两次输入的密码不一致')
                return false
            }
			
            this.$http.getzhuce({
                phone:this.number,
                phonecode:this.code,
                password:this.pwd,
                repwd:this.repwd,
                xieyi: 1,
				yaoqingma:this.yaoqingma
				// member_recode:member_recode
            }).then(res=>{
                if(res.status == 200) {
                    this.$toast(res.mess)
                    setTimeout(() => {
                        this.getback()
                    }, 1500);
                }
                
            })

        },
        encode:function(){
            if(this.number.length < 11) {
                this.$toast('请输入正确的手机号')
                return false
            }
            this.$http.getsendcode({phone: this.number}).then(res=>{
                if(res.status == 200) {
                    this.$toast(res.mess)
                    var timeId = setInterval( res=>{
                        --num
                        if(num == 0) {
                            this.coun = '重新获取'
                            clearInterval(timeId)
                            num = 60
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

<style >

</style>
