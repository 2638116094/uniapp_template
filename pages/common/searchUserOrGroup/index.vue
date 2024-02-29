<template>
	<view class="search_container">
		<CustomNavtar :route="false">
			<view slot="left"></view>
			<view class="search_bar" slot="center">
				<u-search
				actionText="取消"
				@change="keywordChange"
				@search="startSearch"
				:placeholder="getPlaceholder"
				@custom="cancel"
				shape="square"
				v-model="keyword"
				></u-search>
			</view>
		</CustomNavtar>
		<view v-show="!empty && !searching" @click="startSearch" class="result_row">
			<image class="icon" :src="getIcon"/>
			<view class="">
				<text>查找：</text>
				<text>{{ keyword }}</text>
			</view>
		</view>
		
		<view class="result_row result_row_empty" v-show="searching && !empty">
			<u-loading-icon></u-loading-icon>
		</view>
		<view class="result_row result_row_empty" v-show="empty">
			<text>未搜索到相关结果</text>
		</view>
	</view>
</template>

<script>
	import CustomNavtar from '@/components/CustomNavBar/index.vue';
	import IMSDK from 'openim-uniapp-polyfill';
	import searchUser from 'static/images/contact_add_search_user_fill.png';
	export default {
		components: {
			CustomNavtar
		},
		data() {
			return {
				keyword: null,
				empty: false,
				isSearchGroup: false,
				searching: false,
			}
		},
		computed: {
			getIcon() {
				return this.isSearchGroup? searchGroup: searchUser;
			},
			getPlaceholder() {
				return this.isSearchGroup?'请输入群聊ID':'搜索ID或手机号添加好友'
			}
		},
		onLoad(options) {
			const { isSearchGroup } = options;
			// this.isSearchGroup = JSON.parse(isSearchGroup);
 		},
		methods: {
			cancel() {
				uni.navigateBack();
			},
			keywordChange() {
				if(this.empty) {
					this.empty = !this.empty;
				}
			},
			async startSearch() {
				if(!this.keyword) return;
				this.searching = true;
				try {
					if(this.isSearchGroup) {
						let info = this.$store.getters.storeGroupList.find((item) => item.groupID === this.keyword);
						if(!info) {
							const { data } = await IMSDK.asyncApi(
							IMSDK.IMMethods.GetSpecifiedGroupsInfo,
							IMSDK.uuid(),
							[this.keyword],
							);
							
							info=data[0];
						};
						if(info) {
							uni.navigateTo({
								url:`/pages/common/groupCard/index?sourceInfo=${JSON.stringify(info)}`
							});
						} else {
							this.empty = true;
						}
					} else {
						let info = this.$store.getters.storeFriendList.find((item) => item.userID === this.keyword);
						if(!info) {
							// const { data } = await 
						}
					}
				} catch (e) {
					
				}
				this.searching = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
.search_container {
	height: 100vh;
	background-color: #f8f8f8;
	.search_bar {
		width: 100%;
		padding: 0 44rpx;
	}
	.result_row {
		@include vCenterBox;
		padding: 24rpx 44rpx;
		font-size: 28rpx;
		color: $uni-text-color;
		background-color: #fff;
		.icon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 24rpx;
		}
		&_empty {
			display: flex;
			color: #999;
			justify-content: center;
		}
	}
}
</style>
