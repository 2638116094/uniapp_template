export default {
	storeConversationList: (state) => state.conversation.conversationList,
	storeCurrentConversation: (state) => state.conversation.currentConversation,
	// storeUnReadCount: (state) => state.coversation.unReadCount,
	storeCurrentGroup: (state) => state.coversation.currentGroup.currentGroup,
	storeGroupList: (stete) => state.contact.groupList,
	storeFriendList: (state) => state.contact.friendList,
	storeSentFriendApplication:(state) => state.contact.sentFriendApplications,
	storeSentGroupApplication: (state) => state.contact.sentGroupApplications,
	storeRecvFriendApplications: (state) => state.contact.recvFriendApplications,
	storeRecvGroupApplications: (state) => state.contact.recvGroupApplications,
	storeUnHandleFriendApplicationNum: (state) => state.contact.unHandleFriendApplicationNum,
	storeUnHandleGroupApplicationNum: (state) => state.contact.unHandleGroupApplicationNum,
	storeAppConfig: (state) => state.user.appConfig,
	storeIsSyncing: (state) => state.user.isSyncing,
	storeSelfInfo: (state) => state.user.selfInfo,
	storeCurrentUserID: (state) => state.user.selfInfo.userID,
	storeRootFontSize: (state) => state.user.rootFontSize
}