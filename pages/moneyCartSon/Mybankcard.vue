<template>
    <view class="index_class">
        <view class="bank-creat" v-if="backinfo.id">
            <view class="bankname">
                <image src="../../static/images/img/bank-list.png" />
                <view>
                    <view>{{backinfo.bank_name}}</view>
                    <view>{{backinfo.card_number}}</view>
                </view>
            </view>
            <view class="relieve-add" @click="relievecard(backinfo.id)">
                解除绑定
            </view>
        </view>

        <view v-if="!backinfo.id" class="bank-list" @click="getnav('/pages/moneyCartSon/addbackcard')">
            <image class="addimg" src="../../static/images/img/bank-add.png" />
            <view class="add-text">添加绑定银行卡</view>
        </view>

        <view class="tips">温馨提示:一个用户只能绑定一张银行卡</view>
    </view>
</template>

<script>
export default {
    onShow(){
        this.getBankCardinfo()
    },
    data() {
        return {
            backinfo:{}
        }
    },
    methods: {
        getBankCardinfo(){
            this.$http.getBankCardinfo().then(res=>{
                if(res.status == 200) {
                    if (!res.data) { return false}
                    let str = res.data.card_number + ''
                    res.data.card_number = `**** **** **** ${str.substr(str.length-4)}`
                    this.backinfo = res.data
                }
            })
        },
        relievecard(id){
            this.$showModal({content:'确认解绑银行卡吗？'}).then(el=>{
                if(el.confirm) {
                    this.$loading()
                    this.$http.getdeletecard({card_id:id}).then(res=>{
                        if(res.status == 200) {
                            this.$toast(res.mess)
                            this.backinfo = {}
                            this.getBankCardinfo()
                        }
                    })
                }
            })
            
        }
    },
}
</script>

<style scope>
.index_class {
    padding: 50upx 24upx 0 24upx!important;
}
page ,.index_class{
    height: 100%;
}
</style>
