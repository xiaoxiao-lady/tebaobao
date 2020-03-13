<template>
    <view class="index_class">

        <view class="cash-cont ">
            <div class="cash_list">
            <div class="cash_tit" >
                <span>提取方式</span>
                <div> 账户余额  </div>
            </div>
            <div class="extract">
                <span>提取金额</span>
                <div class="money">
                    <text>¥</text>
                    <input type="number" v-model="txmoney" placeholder="请输入提现金额" placeholder-style="font-szie:28upx;"></div>
            </div>
            <div class="withdrawable">
                可提现金额: 
                <span>¥{{wallets.price ? wallets.price : '0'}}</span>
                <view class="settess" @click="getnav('/pages/moneyCartSon/Mybankcard')">设置提现银行卡</view>
             </div>

        </div>

        
        <div class="cash_list cashbank" v-if="cards">
           <image src="../../static/images/img/bank.png" class="cashimg" />
           <view class="cashname">
               <text>账号:{{cards.card_number}}</text>
               <text>姓名:{{cards.name}}</text>
           </view>
        </div>


        <view class="settled">
            <view class="person-button">
                <button type="warn" class="btn" @click="tixianVal">提现至银行卡</button>
            </view>
            <view class="btn-text" >每月最多提现{{txInfo.tixiancishu}}次,每次最少提现{{txInfo.tixianjine}}</view>
            
        </view>
              <txpwd v-on:cord_info="codeShow" :valShow='valShow'  v-on:backHied="hideAl"></txpwd>

        </view>
        
    </view>
</template>

<script>
    import txpwd from '../../components/txpwd.vue'

export default {
    onShow(){
        this.getTxmxindex()
    },
    data(){
        return {
            txInfo:'',
            valShow:false,
            cards:'', // 银行卡信息
            wallets:'', //余额信息
            txmoney: 0, // 提现金额

        }
    },
    components: {
        txpwd
    },
    onNavigationBarButtonTap(e) {
        uni.navigateTo({
            url: '/pages/moneyCartSon/Myrecord'
        });
    },
    methods: {
        codeShow(index) { // 接受子组件传的值  点击的六位密码值
            this.valShow = index.backHied
            console.log(index)
            /**
             * 确认支付
             */
            this.$loading()
            this.$http.getTxmxtixian({
                pay_password:index.cord,
                price:this.txmoney
            }).then(res=>{
                if(res.status == 200) {
                    this.$toast(res.mess)
                    setTimeout(()=>{
                        this.getback()
                    },1500)
                }
            })
        },
        hideAl(bal) {
            this.valShow = bal
        },

        /**
         * 提现获取钱包及银行卡信息接口
         */
        getTxmxindex(){
            this.$http.getTxmxindex().then(res=>{
                if(res.status == 200) {
                    this.cards = res.data.cards
                    this.wallets = res.data.wallets
                    this.txInfo = res.data
                }
            })
        },
        /**
         * 提现到银行卡
         */
        tixianVal(){
            if(this.txmoney < this.txInfo.tixianjine) {
                this.$toast(`最小提现金额为${this.txInfo.tixianjine}`)
                return false
            }
            if(Number(this.txmoney) > Number(this.wallets.price)) {
                this.$toast('可提现金额不足')
                return false
            }
            if(!this.cards) {
                this.$toast('请先绑定提现银行卡')
                return false
            }
            if(this.txInfo.zhifupwd == 0) {
                // this.$toast('请先设置支付密码')
                this.$showModal({content:'请先设置支付密码'}).then(res=>{
                    if(res.confirm) {
                        this.getnav('/pages/personalSon/setupZfpwd')
                    }
                })
                return false
            }
            this.valShow = true
           
        }
    }    
}   
</script>

<style>
.settled {
    background-color: transparent!important;
}
.btn-text {
    text-align:center;
    margin-top:17upx;
    font-size: 26upx;
    color: #999;
}
.withdrawable {
    position: relative;
}
.settess {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 26upx;
}
</style>
