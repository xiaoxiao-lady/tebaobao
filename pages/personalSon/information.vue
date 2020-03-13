<template>
    <view class="index_class ">
        <view class="per-lists">
                <view class="items">
                    
                    <!-- <input type="text" placeholder="请选择行业"> -->
                    <picker  mode = 'selector' @change="bindPickerindustry" range-key="industry_name" :range="ruzhuinfo">
                        <input type="text" disabled="true" v-model="industry_name" placeholder="请选择行业">
                    </picker>
                    
                    <i class="iconfont icon_e60c"></i>
                </view>
                <view class="items" @click="checkcates">
                    
                    <input type="text" v-model="cates"  disabled="true" placeholder="请选择经营类目">
                    
                    <i class="iconfont icon_e60c"></i>
                </view>
                

                <view class="items">
                    
                    <view>头像</view>
                    
                    <view>
                        <image @click="infoImg" data-id="1" class="infoImg"  :src="portrait?portrait[0].path :'../../static/images/img/shop4.png'"/>
                        
                    </view>
                </view>
        </view>   
        <view class="cation-info">
            认证信息
        </view>    
         <view class="per-lists">
            <view class="items">
                    
                <input type="text" style="width:100%" v-model="shopinfo.name" placeholder="请输入真实姓名">
                
                <!-- <i class="iconfont icon_e60c"></i> -->
             </view>
             <view class="items">
                    
                <input type="number" style="width:100%" v-model="shopinfo.phone" placeholder="请输入手机号">
                
                <!-- <i class="iconfont icon_e60c"></i> -->
             </view>
             <view class="items">
                    
                <input type="text" style="width:100%" v-model="shopinfo.bank" placeholder="请输入身份证号码">
                
                <!-- <i class="iconfont icon_e60c"></i> -->
             </view>
             <view class="items">
                    
                <input type="text" style="width:100%" v-model="shopinfo.email" placeholder="请输入邮箱">
                
                <!-- <i class="iconfont icon_e60c"></i> -->
             </view>
             <view class="items" style="border:0;">
                <view>
                    身份证件
                </view>
             </view>
             <view class=" items-images" style="border:0;" >
               <image @click="infoImg" data-id="2" :src="cardZ? cardZ[0].path :'../../static/images/img/shop1.png'" />
               <image @click="infoImg" data-id="3" :src="cardF?cardF[0].path:'../../static/images/img/shop2.png'" />
             </view>
         </view>   
         <view class="cation-info">
            店铺信息
        </view>    

        <view class="per-lists">
            <view class="items">
                    
                <input type="text" style="width:100%" v-model="shopinfo.shopname" placeholder="请输入店铺名称">
            
            <!-- <i class="iconfont icon_e60c"></i> -->
            </view>
            <view style="padding: 30upx 0 0 24upx">
                    
                <textarea style="width:100%;" v-model="shopinfo.shop_desc" name="" id="" cols="30" rows="10" placeholder="请输入店铺描述"></textarea>
            
            <!-- <i class="iconfont icon_e60c"></i> -->
            </view>

            <view class="items">
                    
                <picker  mode = 'selector' @change="bindPickerChange(1,$event)" range-key="pro_name" :range="pirkCity.prores">
                    <input type="text" disabled="true" :value="pro_name.pro_name" placeholder="请选择所在省">
                </picker>
                
                <i class="iconfont icon_e60c"></i>
            </view>
            <view class="items">
                
                <picker @click="isdisabled"  mode = 'selector' @change="bindPickerChange(2,$event)" range-key="city_name"  :disabled="disabled == 1? false : true" :range="pirkCity.cityres">
                    <input type="text" disabled="true" :value="city_name.city_name" placeholder="请选择所在市">
                </picker>
                
                <i class="iconfont icon_e60c"></i>
            </view>
            <view class="items">
                
                <picker @click="isdisabled"  @change="bindPickerChange(3,$event)" range-key="area_name" :disabled="disabled2 == 1? false: true"   :range="pirkCity.areares">
                    <input type="text" disabled="true" :value="area_name.area_name" placeholder="请选择所在区">
                </picker>
                
                <i class="iconfont icon_e60c"></i>
            </view>
            <view class="items">
                
                <input type="text" style="width:100%" v-model="xxaddress" placeholder="详细地址">
                
                <i class="iconfont "></i>
            </view>
        </view>    
        <view class="filephoto" >
            <view class="cation-info">手持身份证正面</view> 
            <image @click="infoImg($event)" data-id="6" :src="frsfz_pic?frsfz_pic[0].path:'../../static/images/img/shop3.png'" />
        </view>
        
        <view class="filephoto" v-if="settledType == 2">
            <view class="cation-info">营业执照</view> 
            <image @click="infoImg" data-id="4" :src="license?license[0].path:'../../static/images/img/shop3.png'" />
        </view>
        <view class="filephoto">
            <view class="cation-info">补充材料（可选最多五张） <text v-if="supplement" @click="previeImage(supplement)" class="">预览</text> </view> 
            <image @click="infoImg($event,5)" data-id="5" :src="supplement?supplement[0].path:'../../static/images/img/shop3.png'" />

            <view class="num">{{supplement?supplement.length:0}}/5</view>
        </view>

        
        <view class="person-button">
            <button type="warn" class="btn" @click="submitinfo" >提交审核</button>
            <view class="btn-text">1.请认真填写资料,资料提交成功后不可更</view>
            <view class="btn-text">2.信息仅用于实名认证,平台保障您的信息安全</view>
        </view>
        
        <uni-popup :show="showPopupBottom" @hidePopup="hidePopup">

            <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
                <checkbox-group class="uni-list" @change="checkboxChange">
                    <label class="label-3">
                        <view class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in catesinfo" :key="index">
                            <checkbox :value="item.id" class="checkbox-3">{{item.cate_name}}</checkbox>
                        </view>  
                    </label>
                </checkbox-group>
            </scroll-view>
            
        </uni-popup>
    </view>
</template>

<script>
import uniPopup from "../../components/uni-popup.vue"

let pictureArray = []
let indus_id = null  // 行业id
let  arrId = [] // 经营类目id
export default {
    components:{
        uniPopup
    },
    onLoad(option){
        console.log(option)
        if(option.typeshop) {
            this.settledType = option.typeshop
        }
        this.getruzhuinfo()
    },
    data(){
        return {
            showPopupBottom:false,
            ruzhuinfo:[], // 所有行业信息
            catesinfo:[], // 所有经营类目
            industry_name:'',  // 选中的行业
            cates:'', // 选择经营类目
            xxaddress:'', // 详细地址
            shopinfo:{}, // 商家注册信息
            settledType: 1,  // 申请入住类型 1 个人入驻  2商家入驻  3 网红入驻
            pirkCity:{
                prores:[],
                cityres:[],
                areares:[]
            },
            pro_name:{},
            city_name:{},
            area_name:{},
            disabled: 0,
            disabled2:0,

            portrait:'', // 头像
            cardZ:'', //身份证正面
            cardF:'', //身份证背面
            frsfz_pic:'', // 手持身份证
            license:'', // 营业执照
            supplement:'', // 补充材料
        }
    },
    onShow(){
        this.$http.getpro().then(res=>{
            if(res.status == 200) {
                this.pirkCity.prores = res.data
            }
        })
    },
    methods: {
        bindPickerChange: function(index,e) {
            if(index == 1) {

                this.pirkCity.prores.forEach( (element,k) => {
                    if(k == e.detail.value) {
                       this.pro_name =  element
                       
                       this.$http.getcity({pro_id:element.id}).then(res=>{
                           if(res.status == 200) {
                            //    this.city_name = res.data[0]
                               this.pirkCity.cityres = res.data
                               this.disabled = 1
                           }
                       })
                    }
                });
            } else if(index == 2) {
                this.pirkCity.cityres.forEach( (element,k) => {
                    if(k == e.detail.value) {
                       this.city_name = element
                       
                       this.$http.getarea({city_id:element.id}).then(res=>{
                           if(res.status == 200) {
                            //    this.area_name = res.data[0]
                               this.pirkCity.areares = res.data
                               this.disabled2 = 1
                           }
                       })
                    }
                });
            } else {
                this.pirkCity.areares.forEach( (element,k) => {
                    if(k == e.detail.value) {
                       this.area_name = element
                    }
                });
            }
        },
        infoImg(e,number){
            // console.log(e,996633)
            let index = e.currentTarget.dataset.id
            let count = number ? number : 1
            uni.chooseImage({
                count: count, //默认9
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album','camera'], //从相册选择
                success:  (res) => {
                    console.log(res)
                    switch(Number(index)) {
                        case 1:
                            // 选择头像
                            this.portrait = res.tempFiles
                            pictureArray[0] = res.tempFilePaths[0]
                        break;
                        case 2:
                            // 选择省份证正面
                            this.cardZ = res.tempFiles
                            pictureArray[1] = res.tempFilePaths[0]
                        break;
                        case 3:
                            // 选择省份证 背面
                            this.cardF = res.tempFiles
                            pictureArray[2] = res.tempFilePaths[0]
                        break;
                        case 4:
                            // 营业执照
                            this.license = res.tempFiles
                            pictureArray[4] = res.tempFilePaths[0]
                        break;
                        case 5: 
                            //  补充材料
                            this.supplement = res.tempFiles
                            for(var i=0;i <res.tempFilePaths.length;i++) {
                                pictureArray[4 + Number(i) + 1] = res.tempFilePaths[i]
                            }
                        break;
                        case 6:
                            // 手持身份证
                            this.frsfz_pic = res.tempFiles
                            pictureArray[3] = res.tempFilePaths[0]
                    }

                    
                }
            });
        },
        // 预览图片
        previeImage(data){
            let preList = []
            data.forEach(element=>{
                preList.push(element.path)
            })
             uni.previewImage({
                indicator:'number',
                urls: preList
            });
        },

        /**
         * 申请入驻获取相关信息 获取行业
         */
        getruzhuinfo(){
            this.$http.getruzhuinfo().then(res=>{
                if(res.status == 200) {
                    this.ruzhuinfo = res.data.industryres
                    
                    if(res.data.zhuangtai == 3) {
                        // 为1或2时正常 为3时跳转到审核状态页
                        uni.redirectTo({
                            url: '/pages/moneyCartSon/Settledin'
                        });
                        
                    } else if(res.data.zhuangtai == 4) {
                        uni.redirectTo({
                            url: '/pages/loginSon/settingWx'
                        });
                        
                    }
                }
            })
        },
        bindPickerindustry(e){
            console.log(e)
            let indexValue = e.detail.value
            this.ruzhuinfo.forEach((el,index)=>{
                if(index == indexValue) {
                    this.industry_name = el.industry_name
                    indus_id = el.id
                    console.log(el)
                    /**
                     * 获取经营类目
                     */
                    this.$http.getcates({indus_id:el.id}).then(res=>{
                        if(res.status == 200) {
                            this.catesinfo = res.data
                        }
                    })
                }
            })
        },

        /** 
         * 经营类目接口
        */
       checkcates(){
           if(!this.industry_name){
               this.$toast('请先选择行业')
               return false
           }
           this.showPopupBottom = true
       },
       hidePopup(){
           this.showPopupBottom = false
       },
       /**
        * 经营类目
        */
       checkboxChange(e){
           arrId = e.detail.value
           console.log(arrId.join(','),'++++++')
           let str = []
           for(var i=0; i<this.catesinfo.length;i++) {
               for(var k=0; k<arrId.length;k++) {
               if(arrId[k] == this.catesinfo[i].id) {
                   str.push(this.catesinfo[i].cate_name)
                //    str += this.catesinfo[i].cate_name
               }
            }
           }
           this.cates = str.join('、')
       },

       /**
        * 提交资料审核
        */
       submitinfo(){
           if(this.industry_name == '') {
               this.$toast('请选择行业')
               return false
           }
           if(this.cates == '') {
               this.$toast('请选择经营类目')
               return false
           }
           if(!this.pro_name.pro_name && !this.city_name.city_name && !this.area_name.area_name) {
               this.$toast('请选择省、市、区')
               return false
           }
            if(this.xxaddress == '') {
               this.$toast('请输入详细地址')
               return false
           }

           if(this.portrait == '') {
               this.$toast('请选择商家logo')
               return false
           }

            if(this.shopinfo.name == '') {
               this.$toast('请填写真实姓名')
               return false
           }
           if(this.shopinfo.phone == '') {
               this.$toast('请输入手机号')
               return false
           }
           
           if(this.shopinfo.bank == '') {
               this.$toast('请输入身份证账号')
               return false
           }
           if(this.shopinfo.email == '') {
               this.$toast('请输入邮箱')
               return false
           }
           if(this.shopinfo.shopname == '') {
               this.$toast('请输入店铺名称')
               return false
           }
            

           if(this.cardZ == '') {
               this.$toast('请选择身份证正面')
               return false
           }
            if(this.cardF == '') {
               this.$toast('请选择身份证反面')
               return false
           }
           if(this.frsfz_pic == '') {
               this.$toast('请选择手持身份证正面')
               return false
           }

           if(this.license == '' && this.settledType == 2) {
               this.$toast('请选择营业执照')
               return false
           }

           if(this.supplement == '') {
               this.$toast('请选择补充材料（最多5张）')
               return false
           }
           

            // 个人入驻审核
            let imgs = []
            for (var i=0; i< pictureArray.length; i++) {
                imgs.push({
                    name:'imageres' + i,
                    uri: pictureArray[i] ? pictureArray[i] : ''
                })   
            }
            let  data = {
                apply_type:this.settledType,
                indus_id:indus_id,
                cate_ids:arrId.join(','),
                shop_name:this.shopinfo.shopname,
                shop_desc:this.shopinfo.shop_desc,
                logo: this.portrait[0].path,
                sfz_num:this.shopinfo.bank,
                contacts:this.shopinfo.name,
                telephone:this.shopinfo.phone,
                email:this.shopinfo.email,
                pro_id: this.pro_name.id,
                city_id:this.city_name.id,
                area_id:this.area_name.id,
                address:this.xxaddress,
                imageres:imgs,
            }
            
            this.$loading()
           if(this.settledType == 1) {  
               this.personConfirm(data,'apicloud/ApplyInfo/personapply')
           } else if(this.settledType == 2) {
               this.personConfirm(data,'apicloud/ApplyInfo/comapply')   
           }
       },

       /**
        * 
        * 提交资料返回参数
        */
       personConfirm(dataobj,url){
           this.$http.getpersonapply(dataobj,url).then(res=>{
               res = JSON.parse(res)
                if(res.status == 200){
                    console.log(JSON.stringify(res))
                    this.$toast(res.mess)
                    setTimeout(()=>{
                        uni.redirectTo({
                            url: '/pages/moneyCartSon/Settledin'
                        });
                    },1500)
                }else {
                    this.$toast(res.mess)
                }

            })  
       }
    },
}
</script>

<style scope lang="less">
.per-lists {
    margin: 0!important;
    picker {
        width: 100%;
        input{
            width: 100%;
            color: #333;
        }
    }
    .infoImg {
        width: 80upx!important;
        height: 80upx!important;
        border-radius: 10upx;
    }
    .items-images {
        padding: 0 30upx 30upx 30upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        image {
            width: 49%!important;
            height: 215upx!important;

        }
        
           
    }
}
.filephoto {
    background-color: #fff;
    padding-bottom: 45upx;
    .cation-info {
        background-color: #fff;
        
    }
    image {
        display: block;
        width: 344upx;
        height: 203upx;
        margin: 0 auto;
    }
    .num {
        text-align: center;
        color: #999999;
        font-size: 30upx;
        margin-top: 20upx;
    }
}
.person-button {
    padding-bottom: 20upx!important;
    .btn-text {
        text-align: left!important;
        
    }
}
.scroll-Y {
    height: 500upx;
}
.uni-list-cell-pd {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 90upx;
    line-height: 90upx;
    padding-left: 30upx;
}
.checkbox-3 {
    width: 100%;
    text-align: left;
}
</style>
