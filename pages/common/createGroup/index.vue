<template>
 	<view class="create_group_container">
		<CustomNavBar title="发起群聊" />
		<view class="main">
			<view class="group_base_info">
				<Avatar @detail="chooseImage" 
				:isGroup="true"
				:src="groupFaceUrl"
				@longpress="longpress"/>
				<u--input 
					border="none"
					maxlength="16"
					placeholder="起个群名方便搜索"
					v-model="groupName"></u--input>
			</view>
			<view class="member_row" @click="toChooseMember">
				<view class="desc_title">
					<text>群成员</text>
					<text>{{ `${checkedMemberList.length}` }}</text>
				</view>
				<view class="member_list">
					<view v-for="member in checkedMemberList.slice(0,5)"
					:key="member.userID"
					 class="member_item">
						<Avatar :src="member.userID" :desc="member.nickname" size="42" />
					</view>
				</view>
			</view>
		</view>
		<view class="action_bar">
			<u-button 
			:loading="createLoading"
			:disabled="disabledCreate"
			@click="complateCreate"
			text="完成创建"
			type="primary"/>
		</view>
	</view>
</template>

<script>
	import { ContactChooseTypes } from '@/constant';
	import CustomNavBar from '@/components/CustomNavBar/index.vue';
	import Avatar from '@/components/Avatar/index.vue';
	import { toastWithCallback } from '@/common/index.js';
	import IMSDK, {
		GroupType,
		IMMethods,
		SessionType,
	} from 'openim-uniapp-polyfill';
	export default {
		name: "createGroup",
		components: {
			CustomNavBar,
			Avatar
		},
		data() {
			return {
				groupName: null,
				groupFaceUrl: null,
				checkedMemberList: [],
				fileList: [],
				createLoading: false,
			}
		},
		computed: {
			disabledCreate() {
				return !this.groupName || this.checkedMemberList.length === 0;
			},
		},
		onLoad(options) {
			const { checkedMemberList } = options;
			this.checkedMemberList = checkedMemberList? JSON.parse(checkedMemberList) : [];
		},
		methods: {
			chooseImage() {
				console.log('avatarDetail');
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					success: async ({ tempFilePaths, tempFiles }) => {
						const path = tempFilePaths[0];
						const nameIdx = path.lastIndexOf("/") + 1;
						const typeIndex = path.lastIndexOf(".") + 1;
						let fileName = path.slice(nameIdx);
						let fileType = path.slice(typeIndex);
						if(uni.getSystemInfoSync().uniPlatform !== 'app') {
							fileType= tempFiles[0].type;
							fileName = tempFiles[0].name;
						}
						
						try {
							// #ifdef MP-WEIXIN
							
							// #endif
							
							// #ifdef APP-PLUS || H5
							
							// #endif
						} catch(error) {}
					}
				})
			},
			longpress() {
				console.log('长按');
			},
			toChooseMember() {
				const checkedIDList = this.checkedMemberList.map((member) => member.userID);
				uni.navigateTo({
					url:`/pages/common/contactChoose/index?type=${ContactChooseTypes.GetList}&checkedUserIDList=${JSON.stringify(checkedIDList)}`
				});
			},
			complateCreate() {
				this.createLoading=true;
				const options = { 
					adminUserIDs: [],
					memberUserIDs: this.checkedMemberList.map((member) => member.userID),
					groupInfo: {
						groupType: GroupType.WorkingGroup,
						groupName: this.groupName,
						faceUrl: this.groupFaceUrl,
					},
				};
				IMSDK.asyncApi(IMSDK.IMMethods.CreateGroup, IMSDK.uuid(), 
				options).then(({data}) => {
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.create_group_container {
	@include colBox(false);
	height: 100vh;
	background-color: #f6f6f6;
	.main {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.group_base_info {
		@include vCenterBox;
		padding: 44rpx;
		background-color: #fff;
		margin: 36rpx 0;
		.u-input {
			margin-left: 48rpx;
		}
	}
	.member_row {
		padding: 44rpx;
		background-color: #fff;
		color: #999;
		.desc_title {
			@include vCenterBox;
			justify-content: space-between;
		}
		.member_list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 24rpx;
			.member_item {
				@include colBox(false);
				align-items: center;
				margin-right: 12rpx;
				.member_name {
					@include nomalEllipsis;
					max-width: 42rpx;
					margin-top: 12rpx;
				}
			}
		}
	}
	.action_bar {
		background-color: #fff;
		padding: 44rpx;
	}
	
	
}
</style>
