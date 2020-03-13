<template>
    <view class="index_class">
        <view class="refun-type">
            <image :src="doodsinfo.thumb_url" ></image>
            <view class="refun-text">
                <view style="color:#333">{{doodsinfo.goods_name}}</view>
                <text>{{doodsinfo.goods_attr_str}}</text>
                
            </view>
        </view>
        <view class="lication-list">
            <view>物流公司:</view>
            <input type="text" v-model="name" style="flex:1;padding-left:20upx;" placeholder="请填写物流公司名称">
        </view>
        <view class="lication-list" style="margin-bottom:20upx">
            <view>物流单号:</view>
            <input type="text" v-model="thNumber" style="flex:1;padding-left:20upx;" placeholder="填写物流单号">
        </view>
        <view class="lication-list">
            <view>联系电话:</view>
            <input type="number" v-model="phone" style="flex:1;padding-left:20upx" placeholder="填写联系电话">
        </view>

         <view class="person-button" style="margin:0;background-color:#fff;padding-top:40upx" >
            <button type="warn" class="btn" @click="confirm">提交</button>
            
        </view>
    </view>
</template>

<script>
export default {
    onLoad(option){
        this.getwuliuinfo(option)
    },
    data(){
        return {
            doodsinfo:'',
            th_number:'',
            name:'',
            thNumber:'',
            phone:''
        }
    },
    methods:{
        getwuliuinfo(data){
            this.$http.getwuliuinfo(data).then(res=>{
                if(res.status == 200) {
                    this.doodsinfo = res.data.orgoods
                    this.th_number = res.data.th_number
                }
            })
        },
        confirm(){
            if(this.name == '') {
                this.$toast('请填写物流公司名称')
                return false
            }
            if(this.thNumber == '') {
                this.$toast('填写物流单号')
                return false
            }
            if(this.phone.length != 11) {
                this.$toast('填写联系电话')
                return false
            }
            this.$http.getthfahuo({
                th_number:this.th_number,
                ps_name:this.name,
                ps_num:this.thNumber,
                telephone:this.phone
            }).then(res=>{
                if(res.status == 200) {
                    this.$toast(res.mess)
                    setTimeout(()=>{
                        this.getback()
                    },1000)
                }
            })
        }
    }
}
</script>

<style>

</style>
