import { getConversationListData } from '@/api/conversation.js';
const state = {
	conversationList: []
}
const mutations = {
	SET_CONVERSATON_LIST(state, list) {
		state.conversationList = [...list];
	},
}
const actions = {
	async getConversationList({state, commit}, isFirstPage = true) {
		try {
			const {data} = await getConversationListData();
			// console.log('data',data)-;
			commit('SET_CONVERSATON_LIST', [
				...(isFirstPage? []: state.conversationList),
				...data
			])
		} catch(e) {
			
		}
	}
}

export  default {
	namespaced: true,
	state,
	mutations,
	actions
};