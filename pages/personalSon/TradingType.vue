<template>
    <view class="index_class">
        <view class="trading">
            <radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
					<view style="width:10%">
						<radio :value="item.value" :checked="item.value === current" />
					</view>
					<image :src="item.img" />
                    <text >{{item.text}}</text>
				</label>
			</radio-group>

            <view class="person-button">
                <button type="warn" class="btn" @click="getnav('/pages/personalSon/information?typeshop='+radioindex)">确定</button>
                <view class="btn-text">选择认证类型后不可更改,请认真选择</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    onShow(){

    },
    data(){
        return {
            items: [{
                    value: 1,
                    text: '个人卖家,微商,实体店,网络红人,海外买',
                    img:'https://nycs.maitexun.cn/uploads/shop_goods/20190521/5d79cd4fd475e14858e3e26de2d6b985.png'
                },
                {
                    value: 2,
                    text: '厂家批发商请选择“我是供应商”用户需要',
                    img:'https://nycs.maitexun.cn/uploads/shop_goods/20190521/5d79cd4fd475e14858e3e26de2d6b985.png'

                }
                // ,
                // {
                //     value: 3,
                //     text: '网红卖家',
                //     img:'https://nycs.maitexun.cn/uploads/category/20190312/7f66713de828d2cfd3b1f0b0a5feb2f1.jpg'

                // }
                
            ],
            current: 1,
            radioindex:1
            
        }
    },
    methods: {
        radioChange(e){
            // console.log(e.detail.value)
            this.radioindex = e.detail.value
        },
        
    },
}
</script>

<style>

</style>
