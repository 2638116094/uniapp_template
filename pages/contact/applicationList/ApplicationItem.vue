<template>
	<view class="application_item" @click="clickItem">
		<Avatar :src="getAvatarUrl" />
		<view class="application_item_details">
			<view class="content">
				<text class="user_name">name{{getShowName}}</text>
				<view class="title" v-if="isGroupApplication">
					申请加入
					<text class="group_name">{{application.groupName}}</text>
				</view>
				<text class="req_message">{{application.reqMsg}}</text>
			</view>
			
			<view class="application_action">
				<text v-if="showStateStr" class="status_tip">{{getStateStr}}</text>
				<text v-if="showGreet" @click.stop="greetToUser" class="status_tip greet">
					打招呼
				</text>
				<button 
				class="access_btn"
				@click.stop="accpetApplication"
				type="primary"
				:plain="true"
				size="mini"
				:loading="accessLoading" 
				v-if="showAccept">{{isGroupApplication? "同意": "接收"}}</button>
			</view>
			<view class="bottom_line"></view>
		</view>
	</view>
</template>

<script>
	import Avatar from '@/components/Avatar/index.vue';
	import IMSDK, { SessionType } from 'openim-uniapp-polyfill';
	export default {
		name: 'ApplicationItem',
		components: {
			Avatar
		},
		data() {
			return {
				accessLoading: false
			}
		},
		computed: {
			isGroupApplication() {
				return this.application.groupID !== undefined;
			},
			getAvatarUrl() {
				if(this.isGroupApplication) {
					return this.application.groupFaceURL;
				}
				return this.application[this.isRecv ? 'fromFaceURL':"toFaceURL"];
			},
			showAccept() {
				return this.application.handleResult === 0 && this.isRecv;
			},
			getStateStr() {
				if(this.application.handleResult === -1) {
					return "已拒绝";
				}
				if(this.application.handleResult === 0) {
					return "等待验证";
				}
				return "已同意";
			},
			getShowName() {
				if(this.isRecv) {
					return this.application[
						this.isGroupApplication?'nickname':'fromNickname'
					];
				}
				return this.application[
					this.isGroupApplication? 'groupName': "toNickname"
				];
			},
			showGreet() {
				return !this.isGroupApplication && this.application.handleResult === 1;
			},
			showStateStr() {
				if((this.isRecv && this.application.handleResult ===0) || this.showGreet) {
					return false;
				}
				return true;
			}
		},
		props: {
			isRecv: {
				type: Boolean
			},
			application: {
				type:Object
			}
		},
		created() {
			// console.log('application',this.isRecv,this.application);
			// console.log(this.isGroupApplication);
		},
		methods: {
			clickItem() {
				return console.log('showAccept',this.showAccept, this.isRecv, this.application);
				
				if(this.showAccept) {
					uni.navigateTo({
						url:`/pages/contact/applicationDetails/index?application=${JSON.stringify(this.application)}`
					});
				} else {
					let sourceID = this.application.groupID ?? (this.isRecv ? this.application.fromUserID : this.application.toUserID);
					let cardType = this.isGroupApplication? "groupCard":"userCard";
					const url = `/pages/common/${cardType}/index?sourceID=${sourceID}`;
					uni.navigateTo({
						url
					});
				}
			},
			accpetApplication() {
				this.accessLoading = true;
				let func;
				if(this.isGroupApplication) {
					func = IMSDK.asyncApi(IMSDK.IMMethods.AcceptGroupApplication,
					IMSDK.uuid(),
					{
						groupID: this.application.groupID,
						fromUserID: this.application.userID,
						handleMsg: null
					})
				} else {
					func = IMSDK.asyncApi(IMSDK.IMMethods.AcceptFriendApplication,
					IMSDK.uuid(),
					{
						toUserID: this.application.fromUserID,
						handleMsg: null,
					})
				}
				func.then(() => uni.$u.toast("操作系统")).catch(() => uni.$u.toast("操作失败")).finally(() => (this.accessLoading =false));
			},
			greetToUser() {
				// IMSDK.asyncApi(IMSDK.IMMethods)
				uni.$u.toast('打招呼');
			}
		}
	}
</script>

<style lang="scss" scoped>
.application_item {
	display: flex;
	padding: 24rpx 44rpx;
	color: $uni-text-color;
	justify-content: flex-start;
	background-color: #fff;
	&_details {
		@include vCenterBox;
		margin-left: 24rpx;
		width: 100%;
		position: relative;
	}
	.content {
		@include colBox(false);
		font-size: 26rpx;
		width: 100%;
		.user_name {
			@include nomalEllipsis;
			max-width: 400rpx;
			font-size: 28rpx;
			color: $uni-text-color;
			margin-bottom: 10rpx;
		}
		.req_message {
			@include ellipsisWithLine(2);
			max-width: 80%;
			color: #999;
			
		}
		.title {
			margin-bottom: 20rpx;
			.group_name {
				margin-left: 12rpx;
				color: $uni-color-primary;
			}
		}
	}
	.application_action {
		position: absolute;
		right: 0;
		.status_tip {
			font-size: 28rpx;
			color: #666;
		}
		.access_btn {
			padding: 0 12rpx;
			height: 48rpx;
			line-height: 48rpx;
		}
		.greet {
			color: #418ae5;
		}
	}
}
</style>