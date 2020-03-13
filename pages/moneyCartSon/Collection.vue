<template>
    <view class="index_class">
        <view class="header-filter"> 
            <view class="items " @click="clickactive(1)"  :class="{'filter-active' : coponIndex == 1}" >宝贝</view>
            <view class="items"  @click="clickactive(2)" :class="{'filter-active' : coponIndex == 2}">店铺</view>
            <view class="items"  @click="clickactive(3)" :class="{'filter-active' : coponIndex == 3}">内容</view>

        </view>
        <view class="coupon-silder" :class="isCheck? 'isdelect' : ''">
            <view v-if="coponIndex == 1" >
                <view class="coll-list" v-for="(item,index) in counpList" :key="index" @click="getkeysCheck(item.id)">
                    <!-- :class="itemList.icon ? 'icon_e632' :'icon_e741'" -->
                    <i class="iconfont" :class="item.icon ? 'icon_e632' :'icon_e741'" v-if="isCheck"></i>
                    <image :src="item.thumb_url"  />
                    <view class="coll-shop-name" >
                        <text>{{item.goods_name}}</text>

                        <view class="color">
                            ¥{{item.zs_price}} 
                            <text class="youxiao" v-if="item.youxiao == 2">已失效</text>
                        </view>
                    </view>
                </view>
               
            </view>

            <view v-if="coponIndex == 2" >
                <view class="coll-shop-list" v-for="(itemShop,index) in counpList" :key="index"  @click="getkeysCheck(itemShop.id)">
                    <i class="iconfont" :class="itemShop.icon ? 'icon_e632' :'icon_e741'" v-if="isCheck"></i>
                    <image :src="itemShop.logo" />
                    <view style="flex:1">{{itemShop.shop_name}}</view>
                    <!-- v-if="itemShop.youxiao == 2" -->
                    <text class="youxiao" v-if="itemShop.youxiao == 2">已失效</text>
                </view>
              
            </view>
            <view v-if="coponIndex == 3" >
                <view style="text-align:center;">
                    <!-- <image  /> -->
                    <!-- <view style="padding: 30upx 0;">暂无更多内容</view> -->
                </view>
              
            </view>

            <view class="grace-footer" style="justify-content: flex-end;" v-if="isCheck">
                <view style="width:40%;border:0" >
                    <button type="warn" style="border:0" class="clickBgc" @click="delect" >取消收藏</button>
                </view>
            </view>
            <loadMore :loadingType="loadingType"></loadMore> 
        </view>
    </view>
</template>

<script>
let page = 1
let str = ''
export default {
    onLoad(){
        console.log('123+++')
        page = 1
        this.getshoucanglst()
    },
    data(){
        return {
            coponIndex:1 ,
            counpList:[],
            loadingType:0,
            isCheck:false, // 复选框是否显示
        }
    },
    onReachBottom:function(){
        // 上拉加载更多
        if(this.loadingType == 1 || this.loadingType == 2) { return false }
        this.loadingType = 1

        page++
        this.getshoucanglst()
    },
    onNavigationBarButtonTap(e) {
        console.log(999)
        let pages = getCurrentPages();
		let page = pages[pages.length - 1];
        // #ifdef APP-PLUS
        let currentWebview = page.$getAppWebview();
        let titleNView = currentWebview.getStyle().titleNView;
        // 添加文字过长截取为3个字符，请根据自己业务需求更改
        str = titleNView.buttons[0].text == "管理"?'取消' :'管理'
        this.isCheck = !this.isCheck
        titleNView.buttons[0].text = str;
        currentWebview.setStyle({
            titleNView:titleNView
        });
        // #endif
    },
    methods: {
        /**
         * 批量删除 取消收藏
         */
        delect(){
            this.$showModal({content:'确认取消收藏吗？'}).then(res=>{
                if(res.confirm) {
                    let collArr = []
                    this.counpList.forEach((el,index)=>{
                        if(el.icon ) {
                           collArr.push(el.id)
                        } 
                    })
                    this.$http.getcancelShowcang({
                        filter:this.coponIndex,
                        coll_id:collArr.join(',')
                    }).then(result =>{
                        if(result.status == 200) {
                            this.$toast(result.mess)
                            page = 1
                            this.loadingType = 0
                            this.counpList = []
                            this.getshoucanglst()
                        }
                    })
                }
            })
        },
        /**
         * 复选框
         */
        getkeysCheck(id){
            if(!this.isCheck && this.coponIndex == 1) {
                this.getnav(`/pages/homeSon/shop_details?id=`+id)
                return false
            }
            if(!this.isCheck && this.coponIndex == 2) {
                this.getnav(`/pages/homeSon/storeDetails?shop_id=`+id)
                return false
            }
            this.counpList.forEach((el,index)=>{
                if(el.id == id) {
                    el.icon = !el.icon
                } 
            })
        },
        clickactive(i) {
            if(this.coponIndex == i) { return}
            this.coponIndex = i
            page = 1
            this.loadingType = 0
            this.counpList = []
            this.getshoucanglst()
            
        },
        getshoucanglst(){
            if(page == 1) {
                this.$loading()
            }
            this.$http.getshoucanglst({filter:this.coponIndex,page:page}).then(res=>{
                if(res.status == 200) {
                    res.data.forEach(element => {
                        element.icon = false
                    });
                    if(res.data.length == 0) {
                        this.loadingType = 2
                        return false
                    }
                    this.counpList = [...this.counpList,...res.data]
                    this.loadingType = 0
                }
            })
        },

    },

}
</script>

<style scope>
.header-filter {
    width: 100%;
    position: fixed!important;
    padding: 0 170upx!important;
    
}
.isdelect {
    padding-bottom: 90upx;
}
</style>
