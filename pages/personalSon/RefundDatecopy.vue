<template>
    <view class="index_class">
        <view class="copy-time" >
            
            <view>{{applys.zhuangtai}}</view>
            
            <view class="time" v-if="applys.apply_status == 0" >
                剩余时间：{{applys.sycheck_timeout}}
            </view>
            <view class="time" v-else-if="applys.apply_status == 1 || applys.apply_status == 3">
                
                <view v-if="applys.thfw_id == 1">
                    <block v-if="applys.apply_status == 1">
                        剩余时间：{{applys.syshoptui_timeout}}
                    </block>
                    
                </view>
                
                <view v-else-if="applys.thfw_id == 2">
                    <block v-if="applys.apply_status == 1">
                        <block v-if="applys.dcfh_status == 0">
                            剩余时间：{{applys.syyhfh_timeout}}
                        </block>
                        
                        <block v-else-if="applys.dcfh_status == 1 && applys.sh_status == 1">
                            剩余时间：{{applys.syshoptui_timeout}}
                        </block>
                    </block>  
                </view>

                <view v-else-if="applys.thfw_id == 3">
                    <block v-if="applys.apply_status == 1">
                        <block v-if="applys.dcfh_status == 0">
                            剩余时间：{{applys.syyhfh_timeout}}
                        </block>

                        <block v-else-if="applys.dcfh_status == 1 && applys.sh_status == 1 && applys.fh_status == 1">
                            剩余时间：{{applys.syyhshou_timeout}}
                        </block>
                    </block>
                </view>
            </view>
            
        </view>
        <view class="refun-info"> 
            <view class="info-t" >退款方式：{{applys.thfw}}</view>

            <view class="refun-text" v-if="applys.filter == 1">
                <view >
                    发起<text v-if="applys.thfw_id == 1">仅退款</text>
                    <text v-else-if="applys.thfw_id == 2">退货退款</text>
                    <text v-else-if="applys.thfw_id == 3">换货</text>申请
                    <view>申请时间 : {{applys.apply_time}}</view>
                </view>
                <view class="btn-box">
                    
                    <view class="chexClick" v-if="orgoods.fh_status == 1" @click="chexioaClick">撤销申请</view>
                </view>
            </view>
            <view class="refun-text" v-else-if="applys.filter == 2">
                 <view>商家已同意</view>
                 <view>同意时间：{{applys.agree_time}}</view>
                 <view class="btn-box">
                    <view class="chexClick" v-if="orgoods.fh_status == 1" @click="chexioaClick">撤销申请</view>
                </view>
            </view>
            <view class="refun-text" v-else-if="applys.filter == 4 || applys.filter == 8">
                <view>商家已同意</view>
                <view>同意时间：{{applys.agree_time}}</view>
                <view>商家售后地址信息：</view>
                <view>收货人：{{pplyinfo.shopdzs.name}} 联系电话：{{pplyinfo.shopdzs.telephone}}</view>
                <view>收货地址：{{pplyinfo.shopdzs.province + pplyinfo.shopdzs.city +pplyinfo.shopdzs.area}}{{pplyinfo.shopdzs.address}}</view>
                <view class="btn-box">
                    <view class="chexClick tianxie" @click="getnav('/pages/personalSon/ExpressLogistics?th_number='+applys.th_number)">填写退货物流</view>
                    <view class="chexClick" v-if="orgoods.fh_status == 1" @click="chexioaClick">撤销申请</view>
                </view>
            </view>
            <view class="refun-text" v-else-if="applys.filter == 3">
                <view>退款已完成</view>
                <view>完成时间：{{applys.com_time}}</view>
            </view>
            <view class="refun-text" v-else-if="applys.filter == 5 || applys.filter == 9">
                <view v-if="applys.filter == 5">用户退货物流：{{pplyinfo.tuiwulius.ps_name}}{{pplyinfo.tuiwulius.ps_num}}</view>
                <view v-else-if="applys.filter == 9">
                    用户换货物流：{{pplyinfo.tuiwulius.ps_name}}  {{pplyinfo.tuiwulius.ps_num}}</view>
                <view>用户已发货</view>
                <view>发货时间：{{applys.dcfh_time}}</view>
            </view>
            <view class="refun-text" v-else-if="applys.filter == 6 || applys.filter == 10">
                <view>商家已收货</view>
                <view>收货时间：{{applys.sh_time}}</view>
            </view>
            <view class="refun-text" v-else-if="applys.filter == 7">
                <view>退货退款已完成</view>
                <view>完成时间：{{applys.com_time}}</view>
            </view>
            <view class="refun-text" v-else-if="applys.filter == 11">
                <view>物流信息：{{pplyinfo.wulius.log_name}} {{pplyinfo.wulius.psnum}}</view>
                <view>收货人：{{applys.contacts}}  联系电话：{{applys.telephone}}</view>
                <view>收货地址：{{applys.shengshiqu}}   {{applys.address}}</view>
                <view>商家已发货</view>
                <view>发货时间：{{applys.fh_time}}</view>
                <view class="btn-box">
                    <view class="chexClick" @click="confirmShouhuo">确认收货</view>
                    
                </view>
                
             </view>

            <view class="refun-text" v-else-if="applys.filter == 12">
                <view>用户已收货</view>
                <view>收货时间：{{applys.shou_time}}</view>
                <view>换货已收货</view>
                <view>完成时间：{{applys.com_time}}</view>
             </view>
            <view class="refun-text" v-else-if="applys.filter == 13">
                <view>商家拒绝申请</view>
                <view>拒绝时间：{{applys.refuse_time}}</view>
                <view v-if="orgoods.fh_status == 1">
                    <view class="chexClick"
                    @click.stop="getnav(`/pages/personalSon/Refundtype?order_num=${orgoods.ordernumber}&orgoods_id=${orgoods.id}`)"
                    >退换</view>
                </view>
                <view v-else-if="orgoods.fh_status == 0">
                    <view class="chexClick"
                     @click.stop="getnav(`/pages/personalSon/RefundDate?order_num=${orgoods.ordernumber}&orgoods_id=${orgoods.id}&tui_canshu=1&th_cate=1`)"
                     >退款</view>
                </view>
                <view class="btn-box">
                    <view class="chexClick" v-if="orgoods.fh_status == 1" @click="chexioaClick">撤销申请</view>
                </view>
               
             </view>
            <view class="refun-text" v-else-if="applys.filter == 14">
                <view>用户已撤销申请</view>
                <view>撤销时间：{{applys.che_time}}</view>
                <view v-if="orgoods.fh_status == 1">
                    <view class="chexClick"
                    @click.stop="getnav(`/pages/personalSon/Refundtype?order_num=${orgoods.ordernumber}&orgoods_id=${orgoods.id}`)"
                    >退换</view>
                </view>
                <view v-else-if="orgoods.fh_status == 0">
                    <view class="chexClick"
                     @click.stop="getnav(`/pages/personalSon/RefundDate?order_num=${orgoods.ordernumber}&orgoods_id=${orgoods.id}&tui_canshu=1&th_cate=1`)"
                     >退款</view>
                </view>
            </view>
            <view class="refun-btn">
                <view>客服介入</view>
            </view>
        </view>

        <view class="lication-list" style="margin-bottom:20upx;border:0;" @click="getnav('/pages/personalSon/consult')">
            <view>协商历史</view>
            <i class="iconfont icon_e60c"></i>
        </view>

        <view class="order-info">
            <view style="padding:20upx 0upx 0upx 30upx;  ">退款信息</view>
            <view class="refun-type">
                <image :src="orgoods.thumb_url" />
                <view class="refun-text">
                    <view style="color:#333">{{orgoods.goods_name}}</view>
                    <text>{{orgoods.goods_attr_str}}</text>
                    <text class="color">￥{{orgoods.price}} x {{orgoods.goods_num}}</text>
                </view>
            </view>
            <view class="ref-type" >
                <text v-if="applys.thfw_id == 1">
                    退款原因：{{applys.th_reason}}
                </text>
                <text v-else-if="applys.thfw_id == 2">
                    退货退款原因：{{applys.th_reason}}
                </text>
                <text v-else-if="applys.thfw_id == 3">
                    换货原因：{{applys.th_reason}}
                </text>
            </view>
            <view class="ref-type" v-if="applys.th_content">
                <text v-if="applys.thfw_id == 1">
                    退款说明：{{applys.th_content}}
                </text>
                <text v-else-if="applys.thfw_id == 2">
                    退货退款说明：{{applys.th_content}}
                </text>
                <text v-else-if="applys.thfw_id == 3">
                    换货说明：{{applys.th_content}}
                </text>
            </view>

            <view class="ref-type" v-if="applys.thfw_id == 1 || applys.thfw_id == 2">退款金额：¥{{applys.tui_price}}</view>

            <view class="ref-type">申请件数：{{applys.tui_num}}</view>
            <view class="ref-type">申请时间：{{applys.apply_time}}</view>
            <view class="ref-type">
                <text v-if="applys.thfw_id == 1">
                    退款编号：{{applys.th_number}}
                </text>
                <text v-else-if="applys.thfw_id == 2">
                    退货退款编号：{{applys.th_number}}
                </text>
                <text v-else-if="applys.thfw_id == 3">
                    换货编号：{{applys.th_number}}
                </text>
                
            </view>
            
        </view>

        <view class="ref-im">
            <view><i class="iconfont icon_e61d"></i> 联系卖家</view>
            <view><i class="iconfont icon_e682"></i> 拨打电话</view>
        </view>
    </view>
</template>

<script>
export default {
    onShow(){
        if(this.orderData) {
            this.getapplyinfo(this.orderData)
        }
        
    },
    onLoad(option){
        console.log(option)
        if(option.order_num) {
            this.orderData = option
            this.getapplyinfo(option)
        }
        
    },
    data(){
        return {
            orderData:{},
            pplyinfo:{},
            applys:{},
            orgoods: {}
        }
    },
    methods: {
        getapplyinfo(data){
            this.$http.getapplyinfo(data).then(res=>{
                if(res.status == 200) {
                    this.pplyinfo = res.data
                    this.applys = res.data.applys
                    this.orgoods = res.data.orgoods
                }
            })
        },
        chexioaClick(){
            this.$showModal({content:'确认撤销申请吗？'}).then(result=>{
                if(result.confirm) {
                    this.$http.getchexiao({th_number:this.applys.th_number}).then(res=>{
                        if(res.status == 200) {
                            this.$toast(res.mess)
                            setTimeout(()=>{
                                this.getback()
                            },1000)
                        }
                    })
                }
            })
            
        },
        confirmShouhuo(){
            this.$showModal({content:'确认收货吗？'}).then(result=>{
                if(result.confirm) {
                    this.$http.getsurehuan({th_number:this.applys.th_number}).then(res=>{
                        if(res.status == 200) {
                            this.$toast(res.mess)
                            setTimeout(()=>{
                                this.getback()
                            },1000)
                        }
                    })
                }
            })
        }
    },
}
</script>

<style >

</style>
