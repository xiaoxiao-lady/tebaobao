<template>
    <view class="index_class">
    
        <view class="setup">
            <view class="per-lists" style="margin-top: 0;">
                <view class="items">
                    旧密码
                    <input type="text" password="true"    class="input" v-model="oldpwd" placeholder="请输入旧密码">
                </view>
                <view class="items">
                    新密码
                    <input type="text" password="true"  class="input" v-model="newpwd" placeholder="请输入新密码">
                </view>
                <view class="items">
                    确认密码
                    <input type="text"  password="true" class="input" v-model="confirmpwd" placeholder="请输入确认密码">
                </view>
            </view>

            
            <view class="person-button">
                <button type="warn" @click="confirmClick" class="btn">确认修改</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return {
            oldpwd:"",
            newpwd:'',
            confirmpwd:''
        }
    },
    methods: {
        confirmClick(){
            if(this.oldpwd == '') {
                this.$toast('请输入旧密码')
                return false
            }
            if(this.newpwd == '') {
                this.$toast('请输入新密码')
                return false
            }
            if(this.confirmpwd == '') {
                this.$toast('请输入确认密码')
                return false
            }
            if(this.confirmpwd != this.confirmpwd) {
                this.$toast('俩次输入的密码不一致')
                return false
            }
            this.$loading()
            this.$http.geteditpwd({
                old_password:this.oldpwd,
                password:this.newpwd,
                confirm_password:this.confirmpwd
            }).then(res=>{
                if(res.status == 200) {
                    this.$toast(res.mess)
                    setTimeout(()=>{
                        this.getback()
                    },1500)
                }
            })
        }
    },
}
</script>

<style scope>

</style>
