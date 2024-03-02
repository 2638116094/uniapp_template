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
		onLoad() {
			console.log(this.storeIsSyncing);
		},
		methods: {
			scroll(e) { },
			onRefresh(e) { },
			scrolltolower(e) { },
			closeAllSwipe() {}
		}
	}
</script>

<style lang="scss" scoped>
.conversation_container {
	
}
</style>
