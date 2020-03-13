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
                        
                        <text class="itm-color" @click="geteditphonecode">{{clickText}}</text>
                    </view>
                </view>
            </view>

            
            <view class="person-button">
                <button type="warn" @click="confirm" class="btn">确认修改</button>
            </view>
        </view>
    </view>
</template>

<script>
let courr = 10
let setId = null
export default {
    data(){
        return {
            phone:'',
            code:'',
            clickText:'获取验证码'
        }
    },
    methods: {
        geteditphonecode(){
            if(this.phone.length != 11) {
                this.$toast('请输入正确的手机号')
                return false
            }
            if(setId) {
                // 禁止重复发送 
                return false
            }
            this.$http.geteditphonecode({phone:this.phone}).then(res=>{
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
        confirm(){
            if(this.phone.length != 11) {
                this.$toast('请输入正确的手机号')
                return false
            }
            if(this.code.length == '') {
                this.$toast('请输入验证码')
                return false
            }
            this.$http.geteditphone({
                phone:this.phone,
                phonecode: this.code
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
