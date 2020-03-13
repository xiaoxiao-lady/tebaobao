<template>
    <view class="index_class">

        <view class="edit-address">
            <form action="" class="new_from" style="display: block;">
                    <div class="form_list">
                        <span>收货人</span>
                        <input type="text"  v-model="addresinfo.contacts" placeholder="请填写收货人姓名">
                    </div>
                    <div class="form_list">
                        <span>联系电话</span>
                        <input type="number"  v-model="addresinfo.phone"  placeholder="请填写联系电话">
                    </div>
                    <div class="form_list">
                        <span>所在省</span>
                        
                        <picker  mode = 'selector' @change="bindPickerChange(1,$event)" range-key="pro_name" :range="pirkCity.prores">
                            <input style="width:100%" type="text" disabled="true" :value="pro_name.pro_name" placeholder="请选择所在省">
                        </picker>
                
                    </div>
                    <div class="form_list">
                        <span>所在市</span>
                        
                         <picker @click="isdisabled"  mode = 'selector' @change="bindPickerChange(2,$event)" range-key="city_name"  :disabled="disabled == 1? false : true" :range="pirkCity.cityres">
                            <input style="width:100%" type="text" disabled="true" :value="city_name.city_name" placeholder="请选择所在市">
                        </picker>
                         
                    </div>
                    <div class="form_list">
                        <span>所在区</span>
                        
                         <picker @click="isdisabled"  @change="bindPickerChange(3,$event)" range-key="area_name" :disabled="disabled2 == 1? false: true"   :range="pirkCity.areares">
                            <input style="width:100%" type="text" disabled="true" :value="area_name.area_name" placeholder="请选择所在区">
                        </picker>
                         
                    </div>
                    <div class="form_list">
                        <span>详细地址</span>
                        <input type="text" v-model="addresinfo.address"   placeholder="街道,楼牌号等">
                    </div>
                    <div class="form_list">
                        <span>设置默认地址</span>
                        <switch :checked="addresinfo.moren" @change="switch2Change" />
                    </div>
                    
            </form>
            <view class="add_btn">
                <button class="cash_btn" @click="NewAddress">保存地址</button>
            </view>
        </view>
    </view>
</template>

<script>
let addrId = ''
export default {
    data(){
        return {
            addresinfo:{},
            pirkCity:{
                prores:[],
                cityres:[],
                areares:[]
            },
            pro_name:{},
            city_name:{},
            area_name:{},
            disabled: 0,
            disabled2:0

        }
    },
    onLoad(option){
        
        addrId = option.addrId
        this.getinfo()

        
    },

    methods: {
        NewAddress(){
            if(!this.addresinfo.contacts) {
                this.$toast('请输入收货人姓名')
                return false
            }
            if(!this.addresinfo.phone) {
                this.$toast('请输入联系人手机号')
                return false
            }
            if(!this.addresinfo.address) {
                this.$toast('选择所在地区')
                return false
            }
            if(!this.addresinfo.address) {
                this.$toast('请填详细地址')
                return false
            }
            this.$http.getAddressedit({
                contacts: this.addresinfo.contacts,
                dz_id:this.addresinfo.id,
                phone: this.addresinfo.phone,
                address:this.addresinfo.address,
                moren:this.addresinfo.moren,
                pro_id:this.pro_name.id,
                city_id:this.city_name.id,
                area_id:this.area_name.id
            }).then(res=>{
                if(res.status == 200) {
                    this.$toast(res.mess)
                    setTimeout(r=>{
                        this.getback()
                    },1500)
                }
            })
        },
        getinfo(){
            this.$http.getAddressinfo({dz_id:addrId}).then(res=>{
                if(res.status == 200) {
                    this.addresinfo = res.data.address
                    res.data.prores.forEach(el=>{
                        if(res.data.address.pro_id ==  el.id) {
                            this.pro_name = el
                        }
                    })
                    res.data.cityres.forEach(el=>{
                        if(res.data.address.city_id ==  el.id) {
                            this.city_name = el
                        }
                    })
                    res.data.areares.forEach(el=>{
                        if(res.data.address.area_id ==  el.id) {
                            this.area_name = el
                        }
                    })

                    this.$http.getpro().then(res=>{
                        if(res.status == 200) {
                            this.pirkCity.prores = res.data
                        }
                    })
                    this.$http.getcity({pro_id:this.addresinfo.pro_id}).then(res=>{
                        if(res.status == 200) {
                            
                            this.pirkCity.cityres = res.data
                        }
                    })

                    this.$http.getarea({city_id:this.addresinfo.city_id}).then(res=>{
                        if(res.status == 200) {

                            this.pirkCity.areares = res.data
                        }
                    })
                    
                }
            })
        },
        bindPickerChange: function(index,e) {
            if(index == 1) {
                this.pirkCity.prores.forEach( (element,k) => {
                    if(k == e.detail.value) {
                       this.pro_name =  element
                       
                       this.$http.getcity({pro_id:element.id}).then(res=>{
                           if(res.status == 200) {
                               this.city_name = res.data[0]
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
                               this.area_name = res.data[0]
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
        isdisabled(){
            if(this.disabled == 0 ) {
                this.$toast('请按顺序选择')
            } 
            
        },
        switch2Change(e){
            console.log(e.detail)
            this.addresinfo.moren = e.detail.value? 1:0
        }
        
    },
    computed: {
        
    },
}
</script>

<style>
page {
    height: 100%;
    background-color: #f4f4f4;
}
</style>
