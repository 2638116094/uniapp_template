<template>
	<view class="menu_wrap">
		<view class="menu_list">
			<view @click="menuClick(item)" 
				class="menu_list_item"
				:key="item.idx"
				v-for="item in getMenus">
				<image  class="menu_icon" :src="item.icon" mode=""></image>
				<view class="item_content">
					<text class="title">
						{{ item.title}}
					</text>
					<view class="icon">
						<u-badge max="99" :value="item.badge"></u-badge>
						<u-icon name="arrow-right" color="#999" size="18"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="menu_list">
			<view 
				@click="menuClick(item)"
				class="menu_list_item"
				:key="item.idx"
				v-for="item in getFriendsMenus">
					<image class="menu_icon" :src="item.icon"></image>
					<view class="item_content">
						<text class="title">{{item.title}}</text>
						<view class="icon">
							<u-badge max="99" :value="item.badge"></u-badge>
							<u-icon name="arrow-right" color="#999" size="18"></u-icon>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { ContactMenuTypes } from '@/constant/index.js'
	export default {
		data() {
			return {};
		},
		computed: {
			...mapGetters([
				'storeUnHandleFriendApplicationNum',
				'storeUnHandleGroupApplicationNum',
			]),
			getMenus() {
				return [
					{
						idx: 0,
						type: ContactMenuTypes.NewFriend,
						title: '新好友',
						icon: require('static/images/contact_new_friend.png'),
						badge: this.storeUnHandleFriendApplicationNum,
					},
					{
						idx: 1,
						type: ContactMenuTypes.NewGroup,
						title: '创建群组',
						icon: require('static/images/contact_new_group.png'),
						badge: this.storeUnHandleGroupApplicationNum,
					}
				]
			},
			getFriendsMenus() {
				return [
					{
						idx: 2,
						type: ContactMenuTypes.MyFriend,
						title: '我的好友',
						icon: require('static/images/contact_my_friend.png'),
						badge: 0
					},
					{
						idx: 3,
						type: ContactMenuTypes.MyGroup,
						title: '我的群组',
						icon: require('static/images/contact_my_group.png'),
						badge: 0
					}
				]
			}
		},
		created() {
			// console.log('create', this.storeUnHandleFriendApplicationNum ,this.storeUnHandleGroupApplicationNum);
		},
		methods: {
			menuClick({type}) {
				// console.log('type', type);
				this.$emit('menuClick')
				switch(type) {
					case ContactMenuTypes.NewFriend:
					case ContactMenuTypes.NewGroup:
						uni.navigateTo({
							url:`/pages/contact/applicationList/index?applicationType=${type}`
						});
						break;
					case ContactMenuTypes.MyFriend:
						uni.navigateTo({
							url:`/pages/contact/friendList/index`
						})
						break;
					case ContactMenuTypes.MyGroup:
						uni.navigateTo({
							url:`/pages/contact/groupList/index`
						})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu_wrap {
		.menu_list{
			margin-bottom: 24rpx;
			background-color: #fff;
			&_item {
				@include vCenterBox;
				margin: 0 25rpx;
				padding: 24rpx 0;
				color: #0c1c33;
				.menu_icon {
					width: 42rpx;
					min-width: 42rpx;
					height: 42rpx;
					min-height: 42rpx;
				}
				.item_content {
					width: 100%;
					@include btwBox;
					.title {
						font-size: 25rpx;
						line-height: 42rpx;
						margin-left: 10rpx;
					}
					.icon {
						display: flex;
					}
					.u-badge {
						width: fit-content;
						padding: 8rpx 12rpx;
						line-height: 18rpx;
						margin-right: 15rpx;
					}
				}
			}
		}
	}
</style>