<template>
	<view class="switch_join_container">
		<CustomNavBar title="加入群聊"></CustomNavBar>
		<view class="action_row">
			<ActionItem v-for="item in joinGroupMenus"
			 @click="actionClick(item)" 
			 :action="item"
			 :key="item.idx">
				<view 
				:class="['custom_icon', {custom_icon_id: item.idx === 1}]"
				slot="icon">
					<image :src="item.icon" mode=""/>
				</view>
			 </ActionItem>
		</view>
	</view>
</template>

<script>
	import CustomNavBar from '@/components/CustomNavBar/index.vue';
	import ActionItem from '../contactAdd/ActionItem.vue';
	export default {
		components: {
			CustomNavBar,
			ActionItem
		},
		data() {
			return {
				joinGroupMenus: [
					{
						idx: 0,
						title: '扫码加入',
						desc: '扫描二维码',
						icon: require('static/images/switch_join_qr.png'),
					},
					{
						idx: 1,
						title: '群ID号加入',
						desc: '向管理员或团队成员询问ID',
						icon: require('static/images/switch_join_id.png')
					}
				]
			}
		},
		methods: {
			actionClick({idx}) {
				if(idx == 1) {
					uni.navigateTo({
						url:'/pages/common/searchUserOrGroup/index?isSearchGroup=true'
					})
				} else {
					uni.scanCode({
						scanType: ["qrCode"],
						success: ({result}) =>{
							
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.switch_join_container{
	height: 100vh;
	background-color: #f8f8f8;
	.desc_title {
		font-size: 24rpx;
		color: #999;
		padding: 24rpx 44rpx;
	}
	.action_row {
		background-color: #fff;
		.custom_icon {
			@include centerBox;
			width: 44rpx;
			min-width: 44rpx;
			height: 44rpx;
			border-radius: 50%;
			background-color: #5496eb;
			image {
				width: 20rpx;
				height: 20rpx;
			}
			&_id {
				background-color: #ffc563 !important;
			}
		}
	}
}
</style>
