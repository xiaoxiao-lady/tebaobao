<template>
<view class="index_class">
    
    <view class="refun-type">
        <image :src="orgoods.thumb_url" />
        <view class="refun-text">
            <view style="color:#333">{{orgoods.goods_name}}</view>
            <text>{{orgoods.goods_attr_str}}</text>
            <text class="color">￥{{orgoods.price}} x {{orgoods.goods_num}}</text>

        </view>
    </view>

    
    <view class="lication-list" @tap="actionSheetTap" v-if="orgObj.th_cate == 1 && orgObj.tui_canshu == 0">
        <view>收货状态</view>
        <view class="right-text" >{{listcheck[tapIndex]}} <i class="iconfont icon_e60c"></i></view>
    </view>

    <view class="lication-list" v-if="orgObj.th_cate == 1 && orgObj.tui_canshu == 0">
        <view>退款原因</view>
        <view class="right-text" @click="checklist">{{remess? remess: '请选择原因'}} <i class="iconfont icon_e60c"></i></view>
    </view>

    <view class="lication-list" @click="getnav('/pages/personalSon/address?isconfirm=true')" v-if="orgObj.th_cate == 3">
        <view>换货地址 </view>
            <view style="flex:1;padding-left:35rpx;color:#999">
                <view> {{address.contacts}} &nbsp;&nbsp; {{address.phone?address.phone: ''}}</view>
                <view> {{address.pro_name}}{{address.city_name}}{{address.area_name}}  {{address.address}}</view>
            </view>
           
        <i class="iconfont icon_e60c"></i>
    </view>

    <view class="lication-list" v-if="orgObj.th_cate != 1 || orgObj.tui_canshu == 1">
        <view>{{orgObj.th_cate == 2 ? '退货原因': '换货原因'}}</view>
        <view class="right-text" @click="hidePopup">{{remess? remess: '请选择原因'}} <i class="iconfont icon_e60c"></i></view>
    </view>

    <view class="lication-list" v-if="orgObj.th_cate == 1 || orgObj.th_cate == 2">
        <view>退款金额 <text style="color:#FA3F3F;padding-left:30upx;">￥{{orgoods.tui_price}}</text></view>
        <view class="right-text"></view>
    </view>
    <!-- <view style="padding:16upx 30upx;font-szie:26upx;color:#999">最多¥19.00 含发货邮费¥0.00</view> -->
    <view class="lication-list">
        <view >
            {{orgObj.th_cate == 3? '换货说明' : '退款说明'}}
        </view>
        
        <!-- <view class="right-text"></view> -->
        <input style="flex:1;padding-left:30upx;" type="text" v-model="shou" placeholder="选填">
    </view>

    <view class="voucher">
        <view>上传凭证 <text style="margin-left:30upx;" @click="previewImg">预览</text></view>
        <image @click="chooseImg" class="lica-img" :src="imgPath.length ?imgPath[0]   : '../../static/images/img/shop3.png'" />
        <text class="fil-num">{{imgPath.length}}/3</text>
    </view>

    <view class="person-button" style="margin:0;background-color:#fff;padding-top:40upx" >
        <!-- @click="getnav('/pages/personalSon/RefundDatecopy')" -->
        <button type="warn"  class="btn" @click="getaddthorder" >提交审核</button>
        
    </view>

    <popup-layer ref="popupRef" :direction="'top'">
        <view class="checkal">
            <view class="check-title">请选择原因</view>

            <view class="check-cont">
                <view class="check-list"  v-for="(item,index) in orgObj.thmessres" :key="index" @click="getCheck(item.id)">
                    {{item.mess}}
                    <!-- :class="cart.icon ? 'icon_e632' :'icon_e741'" -->
                    <i  class="iconfont icon_e741" :class="item.icon?'icon_e632' :'icon_e741'" ></i>
                </view>
            </view>
               
        </view>
    </popup-layer>
    
</view>
    
</template>

<script>
let thObj = {

    order_num:"D201904179953489899534997",
    orgoods_id:"51",
    th_cate:"2"
}
let reasonid = '' // 退款原因id
export default {

    onLoad(option){ 
        console.log(option)
        if(option) {
            thObj = option
            let tabtitle = ''
            if(option.th_cate == 3) {
               
                tabtitle = '申请换货'
            } else if(option.th_cate == 2){
               
                tabtitle = '申请退货退款'
            } else {
               
                tabtitle = '申请退款'
            }
            uni.setNavigationBarTitle({
                title: tabtitle
            });
            this.getthindex(thObj)
        }
    },
    onShow(){
        if(this.$store.state.confirmAddress) {
            this.address = this.$store.state.confirmAddress
        }
        
    },
    data() {
        return {
            orgoods:'',
            tapIndex:0,
            orgObj: '',
            imgPath:[],
            address:'',
            shou:'',
            remess:'', // 退款原因
            listcheck:['请选择','未收货', '已收货'],
            valueStatus:0
        }
    },
    watch: {
        tapIndex(){
            if(this.tapIndex == 0) {
                return false
            }
            this.$http.getreason({sh_type:this.tapIndex}).then(res=>{
                if(res.status == 200) {
                    
                   this.orgObj.thmessres = res.data.reason
                   console.log(this.orgObj.thmessres)
                }
            })
        }
    },
    methods: {
        /**
         * 提交审核
         */
        getaddthorder(){
            if(this.orgObj.th_cate == 1 && this.orgObj.tui_canshu == 0) {
                if(this.tapIndex == 0) {
                    this.$toast('请先选择收货状态')
                    return false
                }
            }
            
            if(reasonid == '' ){
                this.$toast('请选择退款原因')
                return false
            }
            let data = {
                order_num:this.orgoods.ordernumber,
                orgoods_id:this.orgoods.id,
                th_cate:this.orgObj.th_cate,
                sh_type:this.tapIndex,
                reason_id:reasonid,
                dz_id: this.address.id,
                th_content:this.shou,
                imageres: ''
            }

            if(this.orgObj.tui_canshu == 1){
                data.tui_canshu = this.orgObj.tui_canshu
            }

            if(this.imgPath.length == 0) {
                this.$loading()
                this.$http.getaddthorder(data).then(res=>{
                    if(res.status == 200) {
                        this.$toast(res.mess)
                        setTimeout(()=>{
                            // this.getback()
                            uni.redirectTo({
                                url: '/pages/personalSon/RefundDatecopy?order_num=' + this.orgoods.ordernumber + '&orgoods_id='+ this.orgoods.id
                            });
                            
                        },1000)
                    } else {
                        this.$toast(res.mess)
                    }
                })
                return false
            }
            let imageresList = this.imgPath.map( (url,index)=>{
                return {
                    name: 'image' +index,
                    uri: url
                }
            })
            data.imageres = imageresList
            this.$loading()
            this.$http.getpersonapply(data,'apicloud/ThApply/addthorder').then(res=>{
                res = JSON.parse(res)
                if(res.status == 200) {
                    this.$toast(res.mess)
                    setTimeout(()=>{
                        // this.getback()
                        uni.redirectTo({
                            url: '/pages/personalSon/RefundDatecopy?order_num=' + this.orgoods.ordernumber + '&orgoods_id='+ this.orgoods.id
                        });
                        
                    },1000)
                } else {
                    this.$toast(res.mess)
                }
            })
        },


        checklist(){
            if(this.tapIndex == 0) {
                this.$toast('请先选择收货状态')
                return false
            }
            this.$refs.popupRef.show() // 弹出

        },
        hidePopup(){
            this.$refs.popupRef.show() // 弹出
        },
        getthindex(data){
            this.$http.getthindex(data).then(res=>{
                if(res.status == 200) {
                    res.data.thmessres.forEach(element => {
                        element.icon = false
                    });
                    this.orgoods = res.data.orgoods
                    this.orgObj = res.data
                    if(res.data.th_cate == 3) {
                        this.address = res.data.dizhis
                    }
                }
            })
        },
        actionSheetTap() {
            uni.showActionSheet({
                itemList: this.listcheck,
                success: (e) => {
                    this.tapIndex = e.tapIndex
                }
            })
        },
        getCheck(id){
            this.orgObj.thmessres.forEach(element => {
                element.icon = false
                if(element.id == id) {
                    element.icon = true
                    reasonid = element.id
                    this.remess = element.mess
                    console.log(this.remess)
                    this.statusMath(this)
                }
            });
        },
        chooseImg(){
            uni.chooseImage({
                count: 3, //默认9
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'], //从相册选择
                success:  (res) => {
                    console.log(res.tempFilePaths)
                    this.imgPath = res.tempFilePaths
                }
            });
        },
        previewImg(){
            if(this.imgPath.length == 0) {
                this.$toast('请先选上传图片')
                return false
            }
            uni.previewImage({
                urls: this.imgPath
            });
        }

    },
   
}
</script>

<style>
.checkal {
    height: 500upx;
    position: relative;
}
.check-cont {
    height: calc(100% - 90upx);
    overflow-y: auto;
}
.icon_e712 {
    text-align: center;
    font-size: 45upx;
}
</style>
