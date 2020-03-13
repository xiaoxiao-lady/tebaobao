<template>
    <view class="index_class">
        
        <view class="edit-address" style="padding:0;">
            <form action="" class="new_from" style="display: block;">
                    <div class="form_list">
                        <span>姓名</span>
                        <input type="text"  v-model="addresinfo.name" placeholder="请输入您的姓名">
                    </div>
                    <div class="form_list">
                        <span>手机号</span>
                        <input type="number" maxlength="11"  v-model="addresinfo.telephone"  placeholder="请输入您的手机号">
                    </div>
                    <div class="form_list">
                        <span>银行卡号</span>
                        <input type="number"  v-model="addresinfo.card_number"  placeholder="请选择您的银行卡号">
                    </div>
                    <div class="form_list">
                        <span>所属银行</span>
                        <input type="text"  v-model="addresinfo.bank_name"  placeholder="请选择您的所属银行">
                    </div>
                    <div class="form_list" @click="showMulLinkageThreePicker">
                        <span>开户地址</span>
                        <input type="text" disabled="true"  v-model="addresinfo.address"  placeholder="请选择您的开户地址">
                    </div>

                    <div class="form_list">
                        <span>支行名称</span>
                        <input type="text"  v-model="addresinfo.branch_name"  placeholder="请输入正确的支行名称">
                    </div>
                    
            </form>
            <view class="add_btn">
                <button class="cash_btn" @click="Newbank">确认</button>
            </view>
        </view>
        <mpvue-city-picker  ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
    </view>
</template>

<script>
import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
export default {
    components: {
        mpvueCityPicker
    },
    data(){
        return {
            addresinfo:{
                name:'',
                telephone:'',
                card_number:'',
                bank_name:'',
                address:'',
                subbranch:'',
                province:'', //省
                city:'',
                area:'',
                branch_name: ''
            },
            cityPickerValueDefault: [0, 0, 1],

        }
    },
    onLoad(option){     
        
    },
    onShow(){
       
    },
    methods: {
        Newbank(){
            if(!this.addresinfo.name) {
                this.$toast('请输入您的姓名')
                return false
            }
            if(!this.addresinfo.telephone) {
                this.$toast('请输入您的手机号')
                return false
            }
            if(!this.addresinfo.card_number) {
                this.$toast('请选择您的银行卡号')
                return false
            }
            if(!this.addresinfo.bank_name) {
                this.$toast('请选择您的所属银行')
                return false
            }
             if(!this.addresinfo.address) {
                this.$toast('请选择您的开户地址')
                return false
            }
            if(!this.addresinfo.branch_name) {
                this.$toast('请输入正确的支行名称')
                return false
            }
            this.$http.getBankCardAdd(this.addresinfo).then(res=>{
                if(res.status == 200) {
                    this.$toast(res.mess)
                    setTimeout(()=>{
                        this.getback()
                    },1000)
                }
            })

        },
        // 三级联动选择
        showMulLinkageThreePicker() {
            this.$refs.mpvueCityPicker.show()
        },
        onConfirm(e) {
            let arr = e.label.split('-')
            this.addresinfo.address = e.label
            this.addresinfo.province = arr[0]
            this.addresinfo.city = arr[1]
            this.addresinfo.area = arr[2]
            
        }
       
        
    },
    computed: {
        
    },
}
</script>

<style>
page {
    height: 100%;
    background-color: #f4f4f4;
}
</style>
