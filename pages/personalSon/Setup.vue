<template>
    <view class="index_class">
        <view class="setup">
            <view class="per-lists" style="margin-top: 0;">
                <view class="items title" @click="upDate">
                    <view>
                        <!-- <image src="../../static/images/img/img-1.png" /> -->
                        头像
                    </view>
                    <!-- <i class="iconfont icon_e60c"></i> -->
                    <image mode="aspectFill" :src="userinfo.headimgurl ? userinfo.headimgurl: '../../static/images/img/timg.png'" />
                </view>

            </view>

            <view class="per-lists">
                <!-- @click="getnav('/pages/personalSon/ModifynickName')" -->
                <view class="items"  >
                        用户名
                    <view style="width:80%">
                        <input type="text" v-model="userinfo.user_name"  placeholder="请输入用户名">
                        <i class="iconfont icon_e60c"></i> 
                    </view>  
                </view>
                <view class="items" >
                        性别
                    <view style="width:80%">
                        <input type="text" style="flex:1" disabled="true" @click="actionSheetTap" :value="array[index]">
                        <!-- <picker style="flex:1" @change="bindPickerChange" :value="index" :range="array">
                            <view class="uni-input">{{array[index]}}</view>
                        </picker> -->
                        <i class="iconfont icon_e60c"></i> 
                    </view>  
                </view>
                <view class="items" >
                        生日
                    <view style="width:80%">
                        <picker style="flex:1" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                            <view class="uni-input">{{ date}}</view>
                        </picker>
                        <i class="iconfont icon_e60c"></i> 
                    </view>  
                </view>
                <view class="items"  >
                        邮箱
                    <view style="width:80%">
                        <input type="text" v-model="userinfo.email"  placeholder="请输入邮箱">
                        <i class="iconfont icon_e60c"></i> 
                    </view>  
                </view>

            </view>


            <view class="person-button">
                <button type="warn" @click="confirmEdit"  class="btn">确认修改</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    onShow(){
        if(uni.getStorageSync('userInfo')) {
            this.userinfo = JSON.parse(uni.getStorageSync('userInfo'))
            if(this.userinfo.birth) {
                this.date = this.$formatDateTime(this.userinfo.birth * 1000).split(' ')[0]   
            }
            this.index = Number(this.userinfo.sex)? Number(this.userinfo.sex) - 1 : 0
        }
        
    },
    data(){
        const currentDate = this.getDate({
            format: true
        });
        return {
            userinfo:{},
            array: ['男', '女'],
            index: 0,
            date:currentDate,
            isShow:false
        }
    },
    
    computed: {
        startDate() {
            return this.getDate('start');
        },
        endDate() {
            return this.getDate('end');
        }
    },
    methods: {
        actionSheetTap() {
            uni.showActionSheet({
                itemList: this.array,
                success: (e) => {
                    this.index = e.tapIndex
                }
            })
        },
        upDate(){
            uni.chooseImage({
                count: 1, //默认9
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album','camera'], //从相册选择
                success: (e)=> {
                    this.isShow = true
                    this.userinfo.headimgurl = e.tempFilePaths[0]
                }
            });
        },
        // bindPickerChange(e){
        //     console.log('picker发送选择改变，携带值为', e.target.value)
        //     this.index = e.target.value
 
        // },
        bindDateChange: function(e) {
            this.date = e.target.value
            
        },
        getDate(type) {
            
            const date = new Date();

            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;;
            day = day > 9 ? day : '0' + day;

            return `${year}-${month}-${day}`;
        },

        confirmEdit(){
            let data = {
                image:[this.userinfo.headimgurl],
                user_name: this.userinfo.user_name,
                sex: Number(this.index) + 1,
                birth: this.date,
                email:this.userinfo.email
            }
            if(!this.isShow) {
                data.image = []
            }
            
            this.$loading()
            this.$http.getupdate(data,'apicloud/MemberInfo/editprofile').then(res=>{
                console.log(res)
                if(res.status == 200) {
                    this.$toast(res.mess)
                    this.getreadprofile()
                    setTimeout(()=>{
                        this.getback()
                    },1000)
                }
                
            })
        },
        getreadprofile(){
            this.$http.getreadprofile().then(res=>{
                if(res.status == 200) {
                    uni.setStorageSync('userInfo', JSON.stringify(res.data));
                }
            })
        }
    },
}
</script>

<style scope>

.per-lists .items{
    flex: 1;
    justify-content: flex-end;
}
.per-lists .items input {
    flex: 1;
}
</style>
