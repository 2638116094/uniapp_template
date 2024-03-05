<template>
	<view class="conversation_container wx-top">
		<chat-header />
		<scroll-view class="scroll-view"
		scroll-y="true"
		refresher-enabled="true"
		:scroll-top="scrollTop"
		:scroll-with-animation="true"
		@scroll="scroll"
		@refresherrefresh="onRefresh"
		@scrolltolower="scrolltolower"
		:refresher-triggered="triggered">
			<u-swipe-action 
			ref="swipeWrapperRef" 
			class="swipe_wrapper" 
			v-show="!storeIsSyncing">
				<ConversationItem v-for="item in storeConversationList" 
				:key="item.conversationID" 
				:source="item"
				ref="conversationItem"
				@closeAllSwipe="closeAllSwipe"/>
			</u-swipe-action>
		</scroll-view>
		<view class="loading_wrap" v-if="storeIsSyncing">
			<u-loading-icon text="同步中"></u-loading-icon>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import ConversationItem from './components/ConversationItem.vue';
	import ChatHeader from './components/ChatHeader.vue';
	export default {
		components: {
			ChatHeader,
			ConversationItem
		},
		computed: {
			...mapGetters(['storeConversationList', "storeIsSyncing"])
		},
		data() {
			return {
				triggered: false,
				scrollTop: 0,
				old:{
					scrollTop: 0,
				},
				lastClickTime: 0,
				doubleClick:0,
				refreshing: false
			}
		},
		onReady() {
			
		},
		onShow() {
			this.$store.dispatch('conversation/getConversationList')
		},
		onLoad() {
			// console.log('storeConversationList',this.storeConversationList);
		},
		methods: {
			scroll(e) { },
			onRefresh(e) { },
			scrolltolower(e) { },
			closeAllSwipe() {},
			scrollToTop() {
				const conversationItem = this.$refs.conversationItem;
				if(conversationItem) {
					uni.createSelectorQuery().in(this).select('.conversation_item').boundingClientRect(async (rect) => {
						if(rect) {
							const itemHeight =rect.height;
							// const index = 
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.conversation_container {
	@include colBox(true);
	height: 100vh;
	overflow-y: hidden;
	.swipe_wrapper {
		@include colBox(false);
		flex: 1;
		width: 100%;
		overflow-y: auto;
	}
	.scroll-view {
		height: 0;
		flex: 1;
		width: 100%;
	}
}
</style>
