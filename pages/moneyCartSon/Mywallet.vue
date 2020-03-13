<template>
    <view class="index_class">
        <view class="wallet">
            <image class="moneimg"  src="../../static/images/img/mymone.png" />
            <view class="moneybox">
                <view class="yu-e">账户余额</view>
                <view class="moneynum">￥ {{money}}</view>
            </view>
        </view>

        <view class="settled">
            <view class="person-button">
                <button type="warn" class="btn" @click="getBankCardinfo">提现</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    onShow(){
        this.getWallet()
    },

    data() {
        return {
            money:0
        }
    },
    onNavigationBarButtonTap(e) {
        uni.navigateTo({
            url: '/pages/personalSon/Detailed'
        });
    },
    methods: {
        getWallet(){
            this.$http.getWallet().then(res=>{
                if(res.status == 200) {
                    this.money = res.data.price
                }
            })
        },
        getBankCardinfo(){
            this.$http.getBankCardinfo().then(res=>{
                if(res.status == 200) {
                    if (res.data) { 
                        this.getnav('/pages/personalSon/cash')
                    } else {
                        this.$toast('请先绑定银行卡')
                        setTimeout(()=>{
                            this.getnav('/pages/moneyCartSon/Mybankcard')
                        },1000)
                    }

                }
            })
        }
    },
}
</script>

<style scope>
page ,.index_class{
    height: 100%;
}
.settled {
    background-color: transparent!important;
}
</style>
