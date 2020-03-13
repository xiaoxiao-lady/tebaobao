<template>
    <view class="index_class">
        <view class="per-lists">
            <view class="items" hover-class="click-active-bgc" @click="getnav('/pages/personalSon/ModifyPassword')">
                <view>
                    修改登陆密码
                </view>
                <i class="iconfont icon_e60c"></i>
            </view>

            <view class="items" v-if="zhifupwd == 0" hover-class="click-active-bgc" @click="getnav('/pages/personalSon/setupZfpwd')">
                <view>
                    设置支付密码
                </view>
                <i class="iconfont icon_e60c"></i>
            </view>
            <view class="items" v-if="zhifupwd == 1" @click="getnav('/pages/personalSon/editpaypwd')" hover-class="click-active-bgc">
                <view>
                    修改支付密码
                </view>
                <i class="iconfont icon_e60c"></i>
            </view>
            <view class="items" v-if="zhifupwd == 1" @click="getnav('/pages/personalSon/resetpaypwd')" hover-class="click-active-bgc">
                <view>
                    重置支付密码
                </view>
                <i class="iconfont icon_e60c"></i>
            </view>
            <view class="items" hover-class="click-active-bgc" @click="getnav('/pages/personalSon/ModifyPhone')">
                <view>
                    更换绑定手机号
                </view>
                <i class="iconfont icon_e60c"></i>
            </view>

        </view>

    </view>
</template>

<script>
export default {
    onShow(){
        this.getpdpaypwd()
    },
    data(){
        return {
            zhifupwd:0
        }
    },
    methods: {
        getpdpaypwd(){
            this.$http.getpdpaypwd().then(res=>{
                if(res.status == 200) {
                    this.zhifupwd = res.data.zhifupwd
                }
            })
        }
    },
}
</script>

<style>

</style>
