<template>
    <view class="index_class" >

        <view class="cont-adddres">
            <view class="phone" v-for="(time,index) in addresList" :key="index" >
                <i class="iconfont icon_e712" style="width:20%"></i>
                <view class="tap_address" @click="isconfirmClick(time)">
                    <view>{{time.contacts}}  <text>  {{time.phone}}</text></view>
                    <text>{{time.pro_name}}{{time.city_name}}{{time.area_name}}  {{time.address}}</text>
                </view>
                <div class="setting">
                    <div v-if="time.moren" >
                        <i class="iconfont icon_e632" ></i>&nbsp;&nbsp;默认
                    </div>
                    <div v-else></div>
                    <div class="setting_btn">
                        <div @click="getnav('/pages/personalSon/editAddress?addrId=' + time.id)"><i class="iconfont icon_e671"></i> 编辑</div>
                        <div @click="handleAlert(time.id)"><i class="iconfont icon_e63a"></i> 删除</div>

                    </div>
                </div>
                <image class="p_bottom" src="/static/images/img/address_img.png" />
            </view>

            <view class="depot" v-if="addresList.length == 0">
				<image class="img" src="../../static/images/img/cartinfo.png" />
				<view class="tps">你还未添加地址</view>
				<!-- <view class="stroll" @click="getnav('/pages/homeSon/classification')">到处逛逛</view> -->
			</view>
        </view>
        <view class="add_shou" @click="getnav('/pages/personalSon/NewAddress')">
            添加收货地址+
        </view>
    </view>
</template>

<script>
let page = 1
export default {
    onLoad(option){
        if(option.isconfirm) {
            this.isconfirm = option.isconfirm
        }
    },
    data(){
        return {
            addresList:[],
            isconfirm:false, // 是否确认订单选择地址
        }
    },
    onShow(){
        this.getAddressList()
        
    },
    methods: {
        isconfirmClick(data){
            if(this.isconfirm) {
                this.$store.commit('editAddress',data)
                this.getback()
            }  
        },
        getAddressList(){
            this.$http.getAddressList({
                page:page
            }).then(res=>{
                if(res.status == 200) {
                    this.addresList = res.data
                }
            })
        },
        handleAlert(id){
            this.$showModal({content:'确认删除吗？'}).then(resModal=>{
                if(resModal.confirm) { 
                    this.$http.getAddressdel({dz_id:id}).then(res=>{
                        if(res.status == 200) {
                            this.$toast(res.mess)
                            this.addresList.forEach( (element,index) => {
                                if(element.id == id) {
                                    this.addresList.splice(index,1)
                                }
                            });
                        }
                    })
                }
                
            })
        },

       
    },
}
</script>

<style>
page {
    height: 100%;
    background-color: #f4f4f4;
}
</style>
