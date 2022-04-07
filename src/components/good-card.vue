<template>
	<view class="good-card__content">
		<image :src="options.goodIcon" class="good-icon" :lazy-load="true" mode="aspectFill"></image>
		<view class="good-intro">
			<text class="title">{{options.title}}</text>
			<text class="intro">{{options.intro}}</text>
			<text class="prop-item">{{options.props[0]}}</text>
			<text class="price">{{options.price}} 元</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'goodCard',
		props: {
			// {
			// 	title: String,
			// 	intro: String,
			// 	props: Array,
			// 	price: Number,
			// 	goodIcon: String
			// }
			options: {
				type: Object,
				required: true,
			},
			default: () => ( {
				title: 'title',
				intro: '',
				props: [],
				price: '',
				goodIcon: ''
			})
		},
		data() {
			return {

			}
		},
		mounted() {
			console.log('load', this.options.goodIcon)
		},
		methods: {

		}
	}
</script>

<style scoped>
.good-card__content {
	display: flex;
	flex-direction:row;
	align-items: center;
	justify-content: center;
	border: solid 1px #eee;
	box-shadow: 12rpx 12rpx 8rpx 0 rgba(10,16,20,.24);
}

.good-icon {
	width: 180rpx;
	height: 180rpx;
}

.good-intro {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: 8rpx;
	height: 180rpx;
}

.title {
	font-size: 28rpx;
	color: #333333;
}
.intro, .prop-item {
	font-size: 24rpx;
	color: #8f8f94;
}
.price {
	font-size: 28rpx;
	color: #333333;
}
</style>
