<template>
	<view class="contact_add_container">
		<CustomNavBar title="添加" />
		<view class="action_row">
			<ActionItem
			 @click="groupAction(item)"
			  v-for="item in ActionMenus"
			  :action="item" 
			  :key="item.idx" />
		</view>
	</view>
</template>

<script>
	import CustomNavBar from '@/components/CustomNavBar/index.vue';
	import ActionItem  from './ActionItem.vue'
	export default {
		components: {
			CustomNavBar,
			ActionItem
		},
		data() {
			return {
				ActionMenus: [
					{
						idx: 0,
						title: '创建群聊',
						desc: '创建群聊,全面使用OpenIM',
						icon: require('static/images/contact_add_create_group.png')
					},
					{
						idx: 1,
						title: '添加群聊',
						desc: '向管理员或团队成员询问ID',
						icon: require('static/images/contact_add_join_group.png')
					},
					{
						idx: 2,
						title: "扫一扫",
						desc: "扫描二维码名片",
						icon: require('static/images/contact_add_qr_user.png')
					},
					{
						idx: 3,
						title: "添加好友",
						desc: "通过手机号/ID号/搜索添加",
						icon: require('static/images/contact_add_search_user.png')
					}
				]
			}
		},
		methods: {
			groupAction({ idx }) {
				console.log('idx',idx)
				if(idx === 0) {
					uni.navigateTo({
						url:`/pages/common/createGroup/index`
					})
				} else if(idx === 1) {
					uni.navigateTo({
						url:`/pages/common/createGroup/index`
					})
				} else if(idx === 2) {
					uni.navigateTo({
						url:`/pages/common/createGroup/index`
					})
				} else if(idx === 3) {
					uni.navigateTo({
						url:`/pages/common/createGroup/index`
					})
				}
			}
		}
	}
</script>

<style>

</style>
