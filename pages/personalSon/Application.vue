<template>
    <view class="index_class">
       <view class="lication-list">
           <view @click="getnav('/pages/personalSon/Complaint')">投诉类型</view>
           <view class="right-text">发货问题</view>
       </view>
       <view class="lication-list">
           <view>原因选择</view>
           <view class="right-text" @click="showPopupBottom = true">请选择原因 <i class="iconfont icon_e60c"></i></view>
       </view>

       <view class="lica-area">
            <view >
                <view>投诉说明:</view>
                <textarea class="textarea" placeholder="描述具体情况,有助于投诉快速处理">
                </textarea>
                <text class="area-num">0/200</text>
            </view>
       </view>

       <view class="lication-list ">
           <view>联系方式:</view>
           <input type="text" placeholder="请输入联系方式" style="width:75%" />
       </view>
       <view class="lication-list">
           <view>选择商品</view>
           <view class="right-text">请选择商品 <i class="iconfont icon_e60c"></i></view>
       </view>
       <view class="voucher">
           <view>上传凭证</view>
           <image  class="lica-img" src="../../static/images/img/shop3.png" />
           <text class="fil-num">0/3</text>
       </view>

        <view class="person-button" style="margin-bottom:40upx">
            <button type="warn" class="btn" >提交审核</button>
           
        </view>

        <uni-popup :show="showPopupBottom" :type="'bottom'"  v-on:hidePopup="hidePopup">
            <view class="checkal">
                <view class="check-title">请选择原因</view>
                
                <view class="check-list">
                    未按约定时间发货
                    <!-- :class="cart.icon ? 'icon_e632' :'icon_e741'" -->
                    <i  class="iconfont icon_e741" ></i>
                </view>
                 <view class="check-list">
                    未按约定时间发货
                    <!-- :class="cart.icon ? 'icon_e632' :'icon_e741'" -->
                    <i  class="iconfont icon_e741" ></i>
                </view>
                 <view class="check-list">
                    未按约定时间发货
                    <!-- :class="cart.icon ? 'icon_e632' :'icon_e741'" -->
                    <i  class="iconfont icon_e741" ></i>
                </view>
                 <view class="check-list">
                    未按约定时间发货
                    <!-- :class="cart.icon ? 'icon_e632' :'icon_e741'" -->
                    <i  class="iconfont icon_e741" ></i>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
import uniPopup from '../../components/uni-popup.vue';
export default {
    components:{
        uniPopup
    },
    data(){
        return {
            showPopupBottom:false
        }
    },
    methods: {
        hidePopup(){
            this.showPopupBottom = false
        }
    },
}
</script>

<style>

</style>
