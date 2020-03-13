<template>
    <view class="index_class">
	
		<!-- </view> -->
        <view class="signin">        
            <div class="signin_top">
               <view class="top_btn">
                   <i class=""></i>
                   {{signInfo.today? '今日已签到':'今日未签到'}}
               </view>
               <span>已连续签到{{signInfo.continuous}}天，总签到{{signInfo.total}}天</span>
               
           </div>
           <div class="sing_date" :style="'height:'+height">
               <div class="sing_mask">
			    <graceDate :show="show1" :isTime="false" v-on:changeDate="changeDate1" :sing_arr="signInfo.sign_list"></graceDate>
                <view class="tsp"><span></span> <text href="javascript:;" @click="getnav('/pages/personalSon/record')">签到记录</text></view>
                
               </div>
           </div>
           <div class="steps">
               <div class="ad_til">连续签到有礼</div>
               <div class="ad_pil">每日签到领金币</div>
               <div class="date_step al">
                   
                    <div class="" v-for="(time,index) in signInfo.guize" :key="index" @click="typesignin">
                       <span><i class="iconfont icon_e7c3"></i></span>
                       <span>{{time.today}}天</span>
                       <div class="date_title">
                           领取<br>
                           {{time.num}}积分
                       </div>
                    </div>
                   
               </div>
           </div>

        </view>
    </view>
</template>

<script>
import graceDate from '../../graceUI/components/graceDate.vue'
export default {
        data() {
            return {
                height:"",
                show1 : true,
                // sing_arr:[], // 当前月份签到的天数 数组
                data:"",  // 当前点击的 天数,
                signInfo:{},  // 签到信息
                valueStatus: 0,  // 更新页面状态 防止页面卡死
            }
        },
        components:{
            graceDate
        },
        methods: {
            // 确定按钮方法
            // handleConfirm () {
            //     // this.sing_arr.push(this.data)
            //     let time = this.data.split('-')
            //     let data = {
            //         type: 0,
            //         date: time[time.length - 1]
            //     }
            //     this.dosign(data)
            // },
            changeDate1 : function(e,data,all){
                console.log(data,9999)
                if(data == undefined) {
                    return false
                }
                this.data = data
                
                var countArr = e.split('-')
                var newArr = data.split('-')
                if(e == data) {
                    this.$showModal({content:'签到成功+5积分'}).then(res=>{
                        if(res.confirm) {
                            let time = this.data.split('-')
                            let dataObj = {
                                type: 0,
                                date: time[time.length - 1]
                            }
                            this.dosign(dataObj)
                        }
                    })
                    // this.$refs.xyDialog.alert({
                    //     title:'提示',
                    //     message:'签到成功+5积分'
                        
                    // })           
                }
                // if(countArr[0] + '-' +countArr[1] == newArr[0]+ '-' +newArr[1]) {
                //     if(Number(newArr[2]) < Number(countArr[2])) {
                //         var id = newArr
                //         this.$refs.xyDialog.confirm({
                //             title:'提示',
                //             message:'补签需要扣除2积分，确定补签吗？'
                            
                //         })
                        
                //     }
                // }

            },
            typesignin:function(){
                let data = {
                    type: 1,
                }
                this.dosign(data)
            },
            getSignInfo:function(){
                
                this.$http.getSignInfo().then(res=>{
                    
                    if(res.status === 200) {
                        console.log(res.data,99)
                        this.signInfo = res.data
                        this.statusMath(this)
                    }
                })
            },
                // 点击签到
            dosign:function(data){
                this.$http.getdosign(data).then(res=>{
                    if(res.status == 200) {
                        this.$toast(res.mess)
                        this.getSignInfo()
                    } 
                })
            }

            
            
        },
        onShow(){
            this.getSignInfo()
        },
        created() {
            
        },
        
}
</script>

<style>
.al {
    display: flex;
    justify-content: space-between
}
</style>
