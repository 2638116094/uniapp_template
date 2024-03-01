export default {
	// storeCoversationList: (state) => state.coversation.conversationList,
	// storeCurrentConversation: (state) => state.coversation.currentConversation,
	// storeUnReadCount: (state) => state.coversation.unReadCount,
	// storeCurrentGroup: (state) => state.coversation.currentGroup.,
	storeGroupList: (stete) => state.contact.groupList,
	storeFriendList: (state) => state.contact.friendList,
	storeSentFriendApplication:(state) => state.contact.sentFriendApplications,
	storeSentGroupApplication: (state) => state.contact.sentGroupApplications,
	storeRecvFriendApplications: (state) => state.contact.recvFriendApplications,
	storeRecvGroupApplications: (state) => state.contact.recvGroupApplications,
	storeUnHandleFriendApplicationNum: (state) => state.contact.unHandleFriendApplicationNum,
	storeUnHandleGroupApplicationNum: (state) => state.contact.unHandleGroupApplicationNum,
	storeAppConfig: (state) => state.user.appConfig
}