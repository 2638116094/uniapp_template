<template>
	<view class="user_card_container">
		<u-loading-page :loading="isLoading" loading-text="loading..."></u-loading-page>
		<CustomNavBar title=""/>
		<view v-if="!isLoading" class="">
			<view class="base_info">
				<Avatar :desc="sourceUserInfo.remark" />
				<view class="user_name">
					<text class="text">{{getShowName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CustomNavBar from '@/components/CustomNavBar/index.vue';
	import Avatar from '@/components/Avatar/index.vue';
	import { newFriends } from '@/api/friends.js';
	export default {
		components: {
			CustomNavBar,
			Avatar
		},
		data() {
			return {
				isLoading:true,
				sourceUserInfo: {},
			}
		},
		onLoad(options) {
			setTimeout(()=> {
				this.isLoading=false;
			},200)
			const { sourceID, sourceInfo, memberInfo, disableAdd } = options;
			// if(sourceID) {}
			this.init();
		},
		computed: {
			getShowName() {
				let suffix = "";
				if(this.sourceUserInfo.remark) {
					suffix = `(${this.sourceUserInfo.remark})`;
				}
				return this.sourceUserInfo.nickname + suffix;
			}
		},
		methods: {
			init() {
				const data = {}
				newFriends().then(res => {
					console.log('请求',res);
				}).catch(err => {
					console.log('请求err',err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.user_card_container {
	@include colBox(false);
	height: 100vh;
	background-color: #f6f6f6;
	overflow-y: auto;
	position: relative;
	/deep/.u-loading-page__warpper {
		margin: 0 !important;
	}
}
</style>
