<template>
	<view class="content">
		<view class="banner-container">
			<image @error="imageError" :src="imgSrc" class="image"></image>
		</view>
		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y scroll-view-container" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
				<view  class="scroll-view-item-container" v-for="(item, index) in goodCardList" :key="index">
					<good-card :options="item" class="scroll-view-item"></good-card>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import goodCard from '../../components/good-card.vue'

const demoItem = {
	title: '服务',
	intro: '简介',
	props: ['属性', '属性2'],
	price: 100,
	goodIcon: 'https://s3.bmp.ovh/imgs/2022/04/08/d31e121520054dda.jpg'
}


export default {
	components: {
		goodCard
	},
	data() {
		return {
			imgSrc: 'https://s3.bmp.ovh/imgs/2022/04/08/d31e121520054dda.jpg',
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			goodCardList: Array.from(Array(10)).map(_=>({...demoItem}))
		}
	},
	onLoad() {

	},
	methods: {
		upper: function(e) {
			console.log(e)
		},
		lower: function(e) {
			console.log(e)
		},
		scroll: function(e) {
			console.log(e)
			this.old.scrollTop = e.detail.scrollTop
		},
		goTop: function(e) {
			this.scrollTop = this.old.scrollTop
			this.$nextTick(() => {
				this.scrollTop = 0
			});
			uni.showToast({
				icon:"none",
				title:"纵向滚动 scrollTop 值已被修改为 0"
			})
		},
		imageError: function(e) {
			console.error('image发生error事件，携带值为' + e.detail.errMsg)
		}
	}
}
</script>

<style scoped>
/* .content {
	height: 100%;
} */

.banner-container {
	height: 450rpx;
	width: 100%;
	font-size: 0;
}

.banner-container .image {
	width: 100%;
	height: 100%;
}

.scroll-view-container {
	width: 100vw;
	margin: 0;
	box-sizing: border-box;
	padding: 12rpx 16rpx;
}

.scroll-view-item-container {
	padding: 8rpx 8rpx 24rpx;
}

</style>
