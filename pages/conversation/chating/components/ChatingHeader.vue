<template>
	<u-navbar @click="click" placeholder class="chating_header">
		<view @click="routeBack" class="u-nav-slot" slot="left">
			<image class="back_icon" style="width: 24rpx; height: 40rpx;" src="@/static/images/common_left_arrow.png" />
		</view>
		<view class="u-nav-slot" slot="center">
			<view class="chating_info" :class="{chating_info_single: isSingle}">
				<view class="conversation_info">
					<view class="title">{{ storeCurrentConversation.showName }}</view>
					<view v-if="!isSingle && !isNotify" class="sub_title">{{ groupMemberCount}}</view>
					<image style="width: 32rpx;height: 32rpx;"></image>
				</view>
				<view class="online_state" v-if="isSingle">
					<view v-if="isSingle" class="dot" :style="{backgroundColor: isOnline? '#10CC64':'#999' }" />
					<view class="online_str" v-if="isSingle">{{onlineStr}}</view>
				</view>
			</view>
		</view>
		<view class="u-nav-slot" slot="right">
			<view class="right_action">
				<u-icon @click="goSetting" class="action_item" name="more-dot-fill" size="23" color="#0c1c33"></u-icon>
			</view>
		</view>
	</u-navbar>
</template>

<script>
	import { MessageReceiveOptType } from 'openim-uniapp-polyfill';
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				isOnline: false,
				isTyping: false,
				onlineStr: "离线",
				callingData: null,
				showMoreMember: false,
				joinLock: false
			}
		},
		computed: {
			...mapGetters(["storeCurrentConversation", "storeCurrentGroup"]),
			isSingle() {
				return false;
				// return this.storeCurrentConversation.recvMsgOpt !== MessageReceiveOptType.Nomal
			},
			isNotify() {
				return false;
			},
			groupMemberCount() {
				// console.log(this.storeCurrentGroup?.memberCount ?? 0);
				// return `(${this.storeCurrentGroup?.memberCount ?? 0})`
			}
		},
		onLoad() {
		},
		onReady() {
			// console.log(this.storeCurrentConversation);
		},
		methods: {
			routeBack() {
				uni.switchTab({
					url:'/pages/conversation/conversationList/index'
				})
			},
			goSetting() {
				const url = this.isSingle ? '/pages/conversation/singleSettings/index'
				: '/pages/conversation/groupSettings/index';
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style>

</style>
