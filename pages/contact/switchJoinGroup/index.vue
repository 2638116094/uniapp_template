<template>
	<view class="switch_join_container">
		<CustomNavBar title="加入群聊"></CustomNavBar>
		<view class="action_row">
			<!-- <ActionItem /> -->
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
		onLoad() {
			// console.log('onload',uni.$t.toat(1,2));
		},
		methods: {
			actionClick({idx}) {
				if(idx) {
					uni.navigateTo({
						url:'/pages/common/searchUserOrGroup/index'
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

<style>

</style>
