import { getConversationListData } from '@/api/conversation.js';
const state = {
	conversationList: []|| uni.getStorageSync('conversationList'),
	currentConversation: {
		showName: 'name'
	} || uni.getStorageInfoSync('currentConversation'),
	currentGroup: {}
}
const mutations = {
	SET_CONVERSATON_LIST(state, list) {
		state.conversationList = [...list];
		uni.setStorageSync('conversationList',[...list]);
	},
	SET_CURRENT_CONVERSATION(state, conversation) {
		state.currentConversation = {
			...conversation
		}
	}
}
const actions = {
	async getConversationList({state, commit}, isFirstPage = true) {
		try {
			const {data} = await getConversationListData();
			// console.log('data',data);
			commit('SET_CONVERSATON_LIST', [
				...(isFirstPage? []: state.conversationList),
				...data
			])
		} catch(e) {
			
		}
	},
	resetConversationState({ commit}) {
		// commit("SET_CURRENT_MEMBER_IN_GROUP", {});
		commit("SET_CURRENT_CONVERSATION", {});
	}
}

export  default {
	namespaced: true,
	state,
	mutations,
	actions
};