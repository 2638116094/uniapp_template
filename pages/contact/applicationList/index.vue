<template>
	<view class="application_list_container">
		<CustomNavBar :title="isGroupApplication ? '新的群聊': '新的好友'" />
		<view class="menu_tab">
			<text :class="['tab_item', {'tab_item_active':tab_index==index}]" v-for="(item,index) in tabList" @click="changeTab(index)">{{item.name}}</text>
		</view>
		<view class="pane_row"
		:style="{transform: `translateX(${isRecv?'0':'-100%'})`}">
			
			<view class="pane_content">
				<u-list v-if="getRecvRenderData.length>0" class="application_list">
					<u-list-item v-for="application in  getRecvRenderData"
					:key="application[!isGroupApplication?'fromUserID':'userID']">
						<ApplicationItem  :isRecv="true" :application="application" />
					</u-list-item>
				</u-list>
				<u-list v-else-if="getSendRenderData.length>0" class="application_list">
					<u-list-item v-for="application in getSendRenderData"
					:key="application[!isGroupApplication?'toUserID':'groupID']">
						<ApplicationItem :application="application" />
					</u-list-item>
				</u-list>
				<view v-else class="empty">
					<image src="@/static/images/block_empty.png"></image>
					<text class="empty_text">暂无数据</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import CustomNavBar from '@/components/CustomNavBar/index.vue';
	import { ContactMenuTypes } from '../../../constant';
	import ApplicationItem from './ApplicationItem.vue';
	
	export default {
		components: {
			CustomNavBar,
			ApplicationItem
		},
		data() {
			return {
				keyword: null,
				isRecv: true,
				tab_index: 0,
				isGroupApplication: false
			}
		},
		computed: {
			...mapGetters([
				"storeRecvGroupApplications",
				"storeRecvFriendApplications",
				"storeSentGroupApplication",
				"storeSentFriendApplication"
			]),
			getRecvRenderData() {
				const tmpList = this.isGroupApplication?this.storeRecvGroupApplications:this.storeRecvFriendApplications;
				tmpList.sort((a,b) => (a.handleResult === 0 ? -1:1));
				return tmpList.slice(0,4);
			},
			getSendRenderData() {
				const tmpList = this.isGroupApplication?this.storeSentGroupApplication: this.storeSentFriendApplication;
				tmpList.sort((a,b) => (a.handleResult === 0 ? -1: 1));
				return tmpList.slice(0,4);
			},
			tabList() {
				return [
					{
						name: this.isGroupApplication? "入群申请":"好友申请"
					},
					{
						name:"我的请求"
					}
				]
			}
		},
		onLoad(params) {
			const { applicationType } = params;
			this.isGroupApplication = applicationType === ContactMenuTypes.NewGroup;
			console.log('【isGroupApplication】',this.isGroupApplication);
			// console.log('isGroupApplication',this.isGroupApplication,this.$store.state.contact.recvFriendApplications);
		},
		onUnload() {
			
		},
		methods: {
			changeTab(index) {
				this.tab_index = index;
				this.isRecv = index === 0;
			},
			previewAll() {
				uni.navigateTo({
					url:`/pages/contact/applicationListDetails/index?isGrouplication=${this.isGroupApplication}&isRecv=${this.isRecv}`
				});
			},
			toSearch() {
				uni.navigateTo({
					url:`/pages/common/searchUserOrGroup/index?isSearchGroup=${this.isGroupApplication}`
				});
			},
			updateUnhandleNum() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.empty {
	@include centerBox;
	flex-direction: column;
	margin-top: 25vh !important;
	&_text {
		margin-top: 26rpx;
		color: #8e9ab0;
	}
	image {
		width: 237rpx;
		height: 244rpx;
	}
}
.application_list_container {
	@include colBox(false);
	height: 100vh;
	overflow-x: hidden;
	background-color: #f8f9fa;
	.search_bar_wrap {
		height: 34rpx;
		padding: 12rpx 22rpx;
	}
	.u-tabs {
		background-color: #fff;
	}
	.pane_row {
		flex: 1;
		display: flex;
		margin-top: 20rpx;
		background-color: #fff;
		transition: all 0.3s ease 0s !important;
		.pane_content {
			@include colBox(false);
			height: 100%;
			flex: 0 0 100%;
			.pane_title {
				font-size: 28rpx;
				color: #999;
				padding: 12rpx 44rpx;
				background-color: #f8f8f8;
			}
			.application_list {
				flex:1;
				height: 100% !important;
			}
		}
	}
	.view_all {
		background-color: #fff;
		padding: 44rpx;
	}
	.menu_tab {
		
		@include centerBox;
		.tab_item {
			width: 50%;
			text-align: center;
			min-height: 100rpx;
			line-height: 100rpx;
			font-size: 30rpx;
			color: #999;
			&_active {
				color: #000;
				position: relative;
				&::after {
					content: '';
					background-color: #999;
					height: 8rpx;
					width: 100%;
					display: flex;
					left: 0;
					z-index: 9;
					position: absolute;
					
				}
			}
		}
	}
}

</style>
