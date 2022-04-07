<template>
	<view class="content">
		<image @error="imageError" :src="imgSrc" style="width:100%;"></image>

		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y scroll-view-container" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
				<good-card v-for="(item, index) in goodCardList" :options="item" :key="index" class="scroll-view-item uni-bg-red"></good-card>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import goodCard from '../../components/good-card.vue'

const demoItem = {
	title: '服务1',
	intro: '简介',
	props: ['属性', '属性2'],
	price: 100,
	goodIcon: 'http://tupian.qqjay.com/u/2017/0628/1_223343_4.jpg'
}


export default {
	components: {
		goodCard
	},
	data() {
		return {
			imgSrc: 'http://tupian.qqjay.com/u/2017/0628/1_223343_4.jpg',
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
.scroll-view-container {
	width: 100vw;
	margin: 0;
	box-sizing: border-box;
}

::v-deep .uni-scroll-view, .uni-scroll-view-content {
	box-sizing: border-box;
	padding: 0 12rpx;
}
.scroll-view-item {
	margin-bottom: 32rpx;
}
</style>
