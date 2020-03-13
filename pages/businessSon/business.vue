<template>
    <view class="index_class">
        <view class="bus-top">
			<!-- <view class="status"></view> -->
			<view class="to-tltle">
                <i class="iconfont icon_e675 back" @click="getback()"></i>
				<view class="class_type">
					<text>商品</text>
					<text>评价</text>
					<text>详情</text>
				</view>

				<view class="delete">
					<i class="iconfont icon_e6e6"></i>
					<i class="iconfont icon_e633"></i>
				</view>
			</view>
			<!-- <view class="bus-title-search">
				<view class="bus-search">
					<i class="icon iconfont icon_e819"></i>
					<input placeholder="请输入关键词搜索" />
					<view class="bus-tap">搜索</view>
				</view>
			</view> -->
	
		</view>
			<view class="busin_content">
				<swiper class="swiper" :indicator-dots="true">
					<swiper-item>
						<image src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvop/00107361/10014936/445125832-361209099665956878-361209099665960968-1_720x909_70.jpg" />
					</swiper-item>
					<swiper-item>
						<image src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvop/00107361/10014936/445125832-361209099665956878-361209099665960968-1_720x909_70.jpg" />
					</swiper-item>
					<swiper-item>
						<image src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvop/00107361/10014936/445125832-361209099665956878-361209099665960968-1_720x909_70.jpg" />
					</swiper-item>
					<swiper-item>
						<image src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvop/00107361/10014936/445125832-361209099665956878-361209099665960968-1_720x909_70.jpg" />
					</swiper-item>
				</swiper>
				<view class="header-bottom">
					<view class="header-bottom__item">
						<text class="goods-name">2018年秋季新款2018年秋季新款2018年秋 季新款2018年秋季新款2018年秋季新款</text>
						<view>
							<i class="iconfont">&#xe646;</i>
							<view class="collection">收藏</view>
						</view>
					</view>
					<view class="header-bottom__item">
						<view class="price">¥435.3<text>¥534.1</text></view>
						<view class="num">27人已团</view>
					</view>
				</view>
			</view>
			<view class="favorable">
				
			</view>
	</view>
</template>

<script>
export default {

}
</script>

<style scope lang="less">
	page {
		background: #f4f4f4;
	}

	.to-tltle {
		background-color: #fff!important;
	}
	.class_type text ,.iconfont{
		color: #333;
	}
	.class_type {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 168upx;
	}
	.class_type text {
		display: block;
		/* border-bottom: 1upx solid red; */
	}

	.swiper {
		width: 100%;
		height: 792upx;

		image {
			width: 100%;
			height: 792upx;
		}
	}

	.header-bottom {
		padding: 16upx 24upx 16upx 24upx;
		background: #fff;

		.header-bottom__item {
			display: flex;
			justify-content: space-between;
			align-items: center;

			i {
				font-size: 46rpx;
			}

			&:first-child {
				margin-bottom: 40upx;

				view {
					text-align: center;
				}
				.collection {
					font-size: 24upx;
				}
			}

			.price {
				color: #FA3F3F;
				font-size: 30upx;

				text {
					color: #999;
					font-size: 24upx;
					padding-left: 8upx;
					text-decoration: line-through;
				}
			}

			.num {
				font-size: 24upx;
				color: #999;
			}
		}

		.goods-name {
			width: 560upx;
			color: #333;
			font-size: 30upx;
		}
	}
</style>
