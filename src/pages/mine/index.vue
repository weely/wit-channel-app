<template>
	<view class="content">
		<view>
			<image class="avatar"
				mode="scaleToFill"
				:src="userInfo.avatarUrl" @error="imageError"></image>
			<text>{{ userInfo.nickName || '-' }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的',
				userInfo: {}
			}
		},
		onLoad() {
			this.getUserInfo()
			uni.setNavigationBarColor({
				backgroundColor: '#ffffff',
			})
		},
		methods: {
			getUserInfo() {
				const params = {
					desc: 'to show',
					lang: 'zh_CN',
				}
				// uni.UserInfo(params).then(res => {
				// 	this.userInfo = {...res.userInfo}
				// 	console.log('---res', res)
				// })
			},
			imageError: function(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.avator {
		width: 200rpx;
		height: 200rpx;
		background-color: #eeeeee;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
