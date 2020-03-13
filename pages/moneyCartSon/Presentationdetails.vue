<template>
    <view class="index_class">
        <view class="myrecord" style="color:#333;font-size:30upx;font-weight:400;height:98upx;">
            <view>
                提现单号
            </view>
            <view style="color:#999">{{txInfo.tx_number}}</view>
        </view>
        <view class="myrecord" style="color:#333;font-size:30upx;font-weight:400;height:98upx;">
            <view>
                申请时间

            </view>
            <view style="color:#999">{{txInfo.time}}</view>
        </view>
        <view class="myrecord" style="color:#333;font-size:30upx;font-weight:400;height:98upx;">
            <view>
                审核状态
            </view>
            <view style="color:#999" v-if="txInfo.checked == 0">待审核</view>
            <view style="color:#999" v-if="txInfo.checked == 1">审核通过</view>
            <view style="color:#999" v-if="txInfo.checked == 2">审核未通过</view>

        </view>
        <view class="myrecord" style="color:#333;font-size:30upx;font-weight:400;height:98upx;">
            <view>
                完成状态
            </view>
            <view style="color:#999" v-if="txInfo.complete == 0">未完成 </view>
            <view style="color:#999" v-if="txInfo.complete == 1">已完成</view>
            <view style="color:#999" v-if="txInfo.complete == 2">打款失败</view>

        </view>
        <view class="myrecord" style="color:#333;font-size:30upx;font-weight:400;height:98upx;" v-if="txInfo.wtime">
            <view>
                完成时间
            </view>
            <view style="color:#999">{{txInfo.wtime}}</view>
        </view>
        <view class="myrecord" style="color:#333;font-size:30upx;font-weight:400;height:98upx;" v-if="txInfo.remarks">
            <view>
                失败原因
            </view>
            <view style="color:#999">{{txInfo.remarks}}</view>
        </view>
        <view class="myrecord" style="color:#333;font-size:30upx;font-weight:400;height:98upx;">
            <view>
                银行卡号
            </view>
            <view style="color:#999">{{txInfo.card_number}}</view>
        </view>
        
        <view class="myrecord" style="color:#333;font-size:30upx;font-weight:400;height:98upx;">
            <view>
                真实姓名
            </view>
            <view style="color:#999">{{txInfo.zs_name}}</view>
        </view>
        <view class="myrecord" style="color:#333;font-size:30upx;font-weight:400;height:98upx;">
            <view>
                银行名称
            </view>
            <view style="color:#999">{{txInfo.bank_name}}</view>
        </view>
        <view class="myrecord" style="color:#333;font-size:30upx;font-weight:400;height:98upx;">
            <view>
                支行名称
            </view>
            <view style="color:#999">{{txInfo.branch_name}}</view>
        </view>
    </view>
</template>

<script>
export default {
    onLoad(option){
        this.getTxmxtxinfo(option.tx_id)
    },
    data(){
        return {
            txInfo:''
        }
    },
    methods: {
        getTxmxtxinfo(id){
            this.$http.getTxmxtxinfo({tx_id:id}).then(res=>{
                if(res.status == 200) {
                    this.txInfo = res.data
                }
            })
        }
    },
}
</script>

<style>

</style>
