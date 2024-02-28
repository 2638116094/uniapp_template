<template>
	<view class="contact_container">
		<!-- <text>adsd</text> -->
		<CustomNavBar :route="false" @leftClick="leftClick" @rightClick="rightClick">
			<view slot="center">openim即时通讯</view>
			<view class="contact_action" slot="right">
				<view class="search_icon">
					<image src="@/static/images/common_add.png" alt=""></image>
				</view>
			</view>
		</CustomNavBar>
		<ContactMenus />
	</view>
</template>

<script>
	import CustomNavBar from '@/components/CustomNavBar/index.vue';
	import ContactMenus from './components/ContactMenus.vue';
	export default {
		components: {
			CustomNavBar,
			ContactMenus
		},
		data() {
			return {
				
			}
		},
		methods: {
			rightClick() {
				uni.navigateTo({
					url:'/pages/contact/contactAdd/index'
				})
			},
			leftClick() {
				console.log('leftClick111');
			}
		}
	}
</script>

<style lang="scss">
.contact_container{
	width: 100%;
	height: 100%;
	// background-color: red;
	.title {
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 30rpx;
	}
	.contact_action {
		display: flex;
		.search_icon {
			image {
				width: 56rpx;
				height: 56rpx;
			}
		}
	}
}
</style>
