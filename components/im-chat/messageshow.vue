<template>
	<view class="m-item" :id="'message' + num">
		<view class="m-left">
			<image class="head_icon" :src="message.to_headimgurl" v-if="message.userType === 'home'" />
		</view>
		<view class="m-content" :class="[ message.userType === 'customer' ? '' : 'm-content__left' ]">
			<view class="m-content-head" :class="{'m-content-head-left': message.userType === 'home'}" v-if="message.userType === 'home'">
				<view :class="'m-content-head-'+ message.userType" class="msg-img" v-if="message.message_type === 'img'">
					<image :src="message.message" :style="{width: message.width + 'px', height: message.height + 'px'}" @click="preview(message.message)" />
				</view>
				<view :class="'m-content-head-'+ message.userType" class="msg-img" v-if="message.message_type === 3">
					<image :src="message.message" style="width: 150px; height: 150px; margin-bottom: 6px;" @click="preview(message.message)" />
					<span class="gift-text">礼物</span>
				</view>
				<view :class="'m-content-head-'+ message.userType" v-if="message.message_type === 'text'">
					<block v-for="(item, index) in message.message" :key="index">
						<block>
							<image class="msg-emoji" v-if="item.type === 'emoji'" :src="item.content" />
							<text v-if="item.type === 'text'">{{ item.content }}</text>
						</block>
					</block>
				</view>
			</view>
			<view class="m-content-head" :class="{'m-content-head-right': message.userType === 'customer'}" v-if="message.userType === 'customer'">
				<view :class="'m-content-head-'+ message.userType" class="msg-img" v-if="message.message_type === 'img'">
					<image :src="message.message" :style="{width: message.width + 'px', height: message.height + 'px'}" @click="preview(message.message)" />
				</view>
				<view :class="'m-content-head-'+ message.userType" class="msg-img" v-if="message.message_type === 3">
					<image style="width: 150px; height: 150px; margin-bottom: 6px;" :src="message.message" @click="preview(message.message)" />
					<span class="gift-text">礼物</span>
				</view>
				<view :class="'m-content-head-'+ message.userType" v-if="message.message_type === 'text'">
					<block v-for="(item, index) in message.message" :key="index">
						<block>
							<image class="msg-emoji" v-if="item.type === 'emoji'" :src="item.content" />
							<text v-if="item.type === 'text'">{{ item.content }}</text>
						</block>
					</block>
				</view>
			</view>
		</view>
		<view class="m-right">
			<image class="head_icon" :src="avatar" v-if="message.userType == 'customer'" />
		</view>
	</view>
</template>

<script>
	export default {
		props: ['message', 'num', 'avatar'],

		data () {
			return {
				from_headimgurl: this.message.from_headimgurl
			}
		},

		methods: {
			preview (img) {
				uni.previewImage({
					urls: [img]
        })
			}
		}
	}
</script>

<style lang="less" scoped>
	.m-item {
		display: flex;
		flex-direction: row;
		padding-top: 40upx;
	}
	.m-left {
		display: flex;
		width: 120upx;
		justify-content: center;
		align-items: flex-start;
	}
	.m-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		font-size: 28upx;
		color: #333;
		word-break: break-all;
	}

	.m-content image {
		max-width: 400rpx;
	}
	.m-right {
		display: flex;
		width: 120upx;
		justify-content: center;
		align-items: flex-start;
	}
	.head_icon {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
	.m-content-head {
		position: relative;
	}
	.m-content-head-right {
		display: flex;
		justify-content: flex-end;
	}
	.m-content-head-home {
		position: relative;
		text-align: left;
		background: #fff;
		border-radius: 16upx;
		padding: 20upx;
		color: #333;
	}
	.m-content-head-home:before {
		position: absolute;
		left: -26upx;
		top: 26upx;
		width: 0;
		height: 0;
		border: 15upx solid transparent;
		border-right: 15upx solid #fff;
		content: ' ';
	}
	.m-content-head-customer {
		background: #fff;
		border-radius: 16upx;
		font-size: 28upx;
		color: #333;
		padding: 20upx;
		text-align: left;
	}

	.m-content__left {
		flex: inherit;
		max-width: 510upx;
	}

	.gift-text {
		display: block;
		margin-bottom: 20upx;
		text-align: center;
		font-size: 24upx;
		color:#F69A30;
	}
	
	.m-content-head-customer:after {
		position: absolute;
		top: 26upx;
		right: -26upx;
		width: 0;
		height: 0;
		border: 15upx solid transparent;
		border-left: 15upx solid #fff;
		content: ' ';
	}

	.msg-emoji {
		position: relative;
		top: -2upx;
		width: 50upx;
		height: 50upx;
		vertical-align: middle;
	}

	.msg-img {
		position: relative;
		padding: 0 0;
		background: transparent!important;
		border-radius: none;

		&::after, &::before {
			display: none;
		}

		image {
			display: block;
			position: relative;
			margin-bottom: 20upx;
			border-radius: 8upx;

			&:last-child {
				margin-bottom: 0!important;
			}
		}
	}
</style>
