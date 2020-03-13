<template>
    <view class="index_class">
        <view class="getuserinfo">
            <image mode="aspectFill" :src="userinfo.headimgurl ? userinfo.headimgurl: '../../static/images/img/timg.png'" />
            <text>{{userinfo.user_name?userinfo.user_name:userinfo.phone}}</text>
        </view>
        <view class="per-lists">
            <view class="items" hover-class="click-active-bgc" @click="getnav('/pages/personalSon/Setup')">
                <view>
                    <!-- <image src="../../static/images/img/img-1.png" /> -->
                    个人资料
                </view>
                <i class="iconfont icon_e60c"></i>
            </view>


        </view>
        <view class="per-lists">
            <view class="items" hover-class="click-active-bgc" @click="getnav('/pages/personalSon/security')">
                <view>
                    <!-- <image src="../../static/images/img/img-1.png" /> -->
                    账户与安全
                </view>
                <i class="iconfont icon_e60c"></i>
            </view>


        </view>
         <view class="person-button">
            <button @click="Signout" type="warn" class="btn">安全退出</button>
        </view>
    </view>
    
</template>

<script>
const webSocket = require('../../utils/socket.js')
export default {
    onShow(){
        if(uni.getStorageSync('userInfo')) {
            this.userinfo = JSON.parse(uni.getStorageSync('userInfo'))
        }
    },
    data(){
        return {
            userinfo:{}
        }
    },
    methods: {
        Signout(){
            this.$showModal({content:'确认退出账户吗？'}).then(res=>{
                if(res.confirm) {
                    webSocket.closeSocket()/
                    uni.setStorageSync('token', '');
                    this.$toast('退出登陆成功')
                    setTimeout(() => {
                        this.getback()
                    }, 1000);
                }
            })
        }
    },
}
</script>

<style scope>
page,.index_class {
    height: 100%;
}
</style>
