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
		<view class="test_btn">
			<u-button text="按钮" @click="btnEvent" type="primary"></u-button>
		</view>
	</view>
</template>

<script>
	import CustomNavBar from '@/components/CustomNavBar/index.vue';
	import ContactMenus from './components/ContactMenus.vue';
	import NotificationUtil from '@/common/notification';
	import IMSDK from 'openim-uniapp-polyfill';
	let count = 1;
	let notificationIntance = null;
	
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
			},
			btnEvent() {
				IMSDK.asyncApi(IMSDK.IMMethods.Login, IMSDK.uuid(),null, null).then(res => {
					console.log('res',res);
				}).catch(e => {console.log('err',e)});
				// notificationIntance = new NotificationUtil();
				// count++;
				// const config = {
				// 	title: 'nitcice',
				// 	content: '通知内容',
				// 	tickerTip: '提示',
				// 	notifyId: count
				// };
				// console.log('notice');
				// notificationIntance.createNotification(config);
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
	.test_btn{
		width: 300rpx;
		margin: 0 auto;
	}
}
</style>
