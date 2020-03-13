<template>
    <view class="index_class">
        <view class="login_cont">
            <view class="login_tab">
                <view :class="{'active-t':indexId1==1}" @click="indexId1 = 1">短信登陆</view>
                <view :class="{'active-t':indexId1==2}" @click="indexId1 = 2">密码登陆</view>
            </view>
            <view v-show="indexId1==1" class="">
                <view class="login_form">
                    <view class="form_items">
                        <view class="items_left">
                            <i class="iconfont icon_e62a"></i>
                            手机号
                        </view>
                        <input class="items_input" placeholder="请输入手机号" v-model="codetel"  type="number" maxlength="11">
                    </view>
                    <view class="form_items">
                        <view class="items_left">
                            <i class="iconfont icon_eb16"></i>
                            验证码
                           
                        </view>
                        <input class="items_input" placeholder="请输入验证码" v-model="dxcode" type="text" maxlength="6">
                        <view class="in_code" @click="getcode"> {{coun}} </view>
                    </view>
                    <view class="Sure">
                        <view class="land"  @click="login">登陆</view>
                        <view class="reg">
                            <text></text>
                            <text @click="getnav('/pages/loginSon/register')">免费注册</text>
                        </view>
                    </view>
                </view>
                
                
            </view>
            <view v-show="indexId1==2" >
                <view class="login_form">
                    <view class="form_items">
                        <view class="items_left">
                            <i class="iconfont icon_e62a"></i>
                            手机号
                        </view>
                        <input class="items_input" placeholder="请输入手机号"  v-model="pwdtel" type="number" maxlength="11">
                    </view>
                    <view class="form_items">
                        <view class="items_left">
                            <i class="iconfont icon_e84a"></i>
                            密码
                        </view>
                        <input class="items_input" placeholder="请输入密码" v-model="password" type="password" maxlength="18">
                        <!-- <view class="in_code">获取验证码</view> -->
                    </view>
                    <view class="Sure">
                        <view class="land"  @click="login">登陆</view>
                        <view class="reg">
                            <text @click="getnav('/pages/loginSon/Retrieve')">找回密码</text>
                            <text @click="getnav('/pages/loginSon/register')">免费注册</text>
                        </view>
                    </view>
                </view>
            </view>
            <!-- #ifdef APP-PLUS -->
                <view class="other">
                    <view class="oth-text">其他方式</view>
                    <view class="weixin" @click="wxLogin">
                        <image src="../../static/images/img/weixin.png" />
                    </view>
                </view>
            <!-- #endif -->
            
        </view>
    </view>
</template>

<script>
const webSocket = require('../../utils/socket.js')  
var num = 60
export default {
    data(){
        return {
            indexId1:1,
            codetel:'',
            dxcode:'',
            coun:'获取验证码',
            pwdtel:'',
            password:'',
            providerList:[]
        }
    },
    onLoad(option){
        // if(option.islogin == 0) {
        //     this.$toast('请先登陆')
        // }
        uni.getProvider({
            service: 'oauth',
            success: (e) => {
                // console.log('oauth..........');
                this.providerList = e.provider.map((value) => {
                    let providerName = '';
                    switch (value) {
                        case 'weixin':
                            providerName = '微信登录'
                            break;
                        case 'qq':
                            providerName = 'QQ登录'
                            break;
                        case 'sinaweibo':
                            providerName = '新浪微博登录'
                            break;
                        case 'xiaomi':
                            providerName = '小米登录'
                            break;
                        case 'baidu':
                            providerName = '百度登录'
                            break;
                        case 'alipay':
                            providerName = '支付宝登录'
                            break;
                    }
                    return {
                        name: providerName,
                        id: value
                    }
                })
            },
            fail: (e) => {
                console.log("获取登录通道失败", e);
            }
        });
    },
    methods: {
        login:function(){
            this.$loading()
            if(this.indexId1 == 1) {
                // 短信登陆
                if(this.codetel.length < 11) {
                    this.$toast('请输入正确的手机号')
                    return false
                }
                if(this.dxcode == '') {
                    this.$toast('请输入短信验证码')
                    return false
                }
                this.$http.getduanxindenglu({
                    phone: this.codetel,
                    phonecode:this.dxcode
                }).then(res=>{
                    if(res.status == 200) {
                        this.$toast(res.mess)
                        uni.setStorageSync('token', res.data.token);
                        setTimeout(() => {

                            webSocket.connectSocket({
                                success: () => {
                                    console.log('连接成功')
                                }
                            })
                            uni.switchTab({
                                url:'/pages/tabBar/Home'
                            })
                        }, 1500);
                    }
                })
            } else {
                if(this.pwdtel.length < 11) {
                    this.$toast('请输入正确的手机号')
                    return false
                }
                if(this.password == '') {
                    this.$toast('请输入登陆密码')
                    return false
                }
                this.$http.getpwddenglu({
                    phone:this.pwdtel,
                    password:this.password
                }).then(res=>{
                    if(res.status == 200) {
                        this.$toast(res.mess)
                        uni.setStorageSync('token', res.data.token);
                        setTimeout(() => {

                            webSocket.connectSocket({
                                success: () => {
                                    console.log('连接成功')
                                }
                            })
                            uni.switchTab({
                                url:'/pages/tabBar/Home'
                            })
                        }, 1500);
                    }
                })
            }
            
        },
        getcode:function(){
            // 短信登陆
            if(this.codetel.length < 11) {
                this.$toast('请输入正确的手机号')
                return false
            }
            this.$loading()
            this.$http.getLoginCode({phone:this.codetel}).then(res=>{
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
        },

        wxLogin(){
            console.log(this.providerList[0].id)
            uni.login({
                provider: 'weixin',
                success: (res) => {
                    uni.getUserInfo({
                        provider: 'weixin',
                        success:  (infoRes) =>{
                            // console.log('用户昵称为：' + infoRes.userInfo.nickName);
                            console.log(JSON.stringify(infoRes))
                            this.$loading()
                            this.$http.getsfdenglu({
                                oauth: 'weixin',
                                openid:infoRes.userInfo.openId,
                                nick_name:infoRes.userInfo.nickName,
                                iconurl:infoRes.userInfo.avatarUrl,
                                uniongender:infoRes.userInfo.gender
                            }).then(result=>{
                                if(result.status == 200) {
                                    this.$toast(result.mess)
                                    uni.setStorageSync('token', result.data.token);
                                    setTimeout(() => {

                                        webSocket.connectSocket({
                                            success: () => {
                                                console.log('连接成功')
                                            }
                                        })
                                        uni.switchTab({
                                            url:'/pages/tabBar/Home'
                                        })
                                    }, 1000);
                                } else {
                                console.log(JSON.stringify(result))
                                }
                            }).catch(err => {
                                console.log(JSON.stringify(err))
                            })

                        }
                    });
                    
                    
                },
                fail: (err) => {
                    console.log('login fail:', err);
                }
            });
        }
    },
}
</script>

<style>

</style>
