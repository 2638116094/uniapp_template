<template>
	<view class="application_list_container">
		<CustomNavBar :title="isGroupApplication ? '新的群聊': '新的好友'" />
		<view class="pane_row"
		:style="{transform: `translateX(${isRecv?'0':'-100%'})`}">
			<view class="pane_content">
				<u-list v-if="getRecvRenderData.length>0" class="application_list">
					<u-list-item v-for="application in  getRecvRenderData"
					:key="application[!isGroupApplication?'fromUserID':'userID'] + application.groupID">
						<ApplicationItem  :isRecv="true"/>
					</u-list-item>
				</u-list>
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
				return tmpList.splice(0,4);
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
			this.isGroupApplication = applicationType=== ContactMenuTypes.NewGroup;
		},
		onUnload() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>
