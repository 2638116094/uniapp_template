<template>
	<u-swipe-action-item
		:key="source.conversationID"
		@click="clickConversationMenu($event, source)"
		:name="source.conversationID"
		:options="getSwipeActions"
		>
		<view class="conversation_item" @tap.prevent="clickConversationItem">
			<!-- <view class="pinned" v-if="source.isPinned"></view> -->
			<view class="left_info">
				<Avatar :isGroup="isGroup"
				:isNotify="isNotify"
				:desc="source.showName"
				size="46"
				:src="source.faceUrl" />
				<view class="details">
					<text class="conversation_name">{{ source.showName }}</text>
					<view class="lastest_msg_wrap">
						<text v-if="messagePrefix" class="lastest_msg_prefix" :class="{lastest_msg_active: needActivePerfix}">
							{{messagePrefix}}
						</text>
						<text class="lastest_msg_content">{{ lastestMessage }}</text>
					</view>
				</view>
			</view>
			<view class="right_desc">
				<text class="send_time">{{ latestMessageTime }}</text>
			</view>
		</view>
	</u-swipe-action-item>
</template>

<script>
	import { GroupAtType, MessageReceiveOptType, SessionType } from 'open-im-sdk';
	import Avatar from '@/components/Avatar/index.vue';
	import { parseMessageByType } from '@/common/index.js';
	export default {
		components: {
			Avatar
		},
		computed: {
			needActivePerfix() {
				
			},
			latestMessageTime() {
				return this.source.lastestMessageTime ? formatConversionTime(this.source.latestMsgSendTime): "";
			},
			lastestMessage() {
				if(this.source.latesMsg === "") return "";
				let parsedMessage;
				try {
					parsedMessage = JSON.parse(this.source.latesMsg);
				} catch(e) {
					if(!parsedMessage) return "";
					return parseMessageByType();
				}
				
			},
			messagePrefix() {
				if(this.source.draftText !== "") {
					let text = this.source.draftText;
					return "[草稿]";
				}
				let prefix = "";
				if( this.source?.recvMsgOpt !== MessageReceiveOptType.Nomal && this.source.unreadCount > 0){
					prefix = `[${this.source.unreadCount}条]`;
				}
				if(this.source.groupAtType !== GroupAtType.AtNormal) {
					switch(this.source.groupAtType) {
						case GroupAtType.AtAll:
							prefix="[所有人]";
							break;
						case GroupAtType.AtMe:
							prefix="[有人@你]"
							break;
						case GroupAtType.AtAllAtMe:
							prefix="[有人@你]";
							break;
						case GroupAtType.AtGroupNotice:
							prefix="[群公告]";
							break;
					}
				}
				return prefix;
			},
			isGroup() {
				return this.source.conversationType === SessionType.WorkingGroup;
			},
			isNotify() {
				return this.source.conversationType === SessionType.Notification;
			},
			getSwipeActions() {
				let actions = [
					{
						text: `${this.source.isPinned? '取消':''}置顶`,
						style: {
							backgroundColor: '#3c9cff'
						}
					},
					{
						text: '移除',
						style: {
							backgroundColor: '#FF381F'
						}
					}
				];
				
				if(this.source.unreadCount > 0) {
					actions = [
						{
							text: '标为已读',
							style: {
								backgroundColor: '#8E9AB0'
							}
						},
						...actions
					]
				}
				return actions;
			}
		},
		props: {
			source: {
				type:Object,
				default: () => {}
			}
		},
		data() {
			return {};
		},
		created() {
			console.log('source',this.getSwipeActions)
		},
		methods: {
			clickConversationMenu({name, index}, item) {
				const noUnRead = this.getSwipeActions.length === 2;
				if(index === 0&& ! noUnRead) {
					
				}
				this.$emit("closeAllSwipe")
			},
			clickConversationItem() {
				console.log('clickConversationItem');
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.conversation_item {
	@include btwBox;
	flex-direction: row;
	padding: 12rpx 44rpx 20rpx;
	position: relative;
	&_active {
		background-color: #f3f3f3;
	}
	.left_info {
		@include btwBox;
		.details {
			@include colBox(true);
			margin-left: 24rpx;
			height: 46rpx;
			color: $uni-text-color;
			.conversation_name {
				@include nomalEllipsis;
				max-width: 40vw;
				font-size: 28rpx;
			}
			.lastest_msg_wrap {
				display: flex;
				font-size: 24rpx;
				margin-top: 10rpx;
				color: #666;
				.lastest_msg_prefix {
					margin-right: 6rpx;
					&_active {
						color: $u-primary;
					}
				}
				.lastest_msg_content {
					flex:1;
					margin-right: 160rpx;
					@include ellipsisWithLine(1);
				}
			}
		}
	}
	.right_desc {
		@include colBox(true);
		align-items: flex-end;
		width: max-content;
		height: 46rpx;
		justify-content: space-between;
		.send_time {
			width: max-content;
			font-size: 24rpx;
			color: #999;
		}
		.u-badge {
			width: fit-content;
		}
	}
	.pinned {
		top: 0;
		right: 24rpx;
		width: 17rpx;
		height: 17rpx;
		position: absolute;
		background-image: linear-gradient(to bottom left, #314ffe 50% #fff 50%);
	}
}
</style>