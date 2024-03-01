import { v4 as uuidv4 } from 'uuid';
import IMSDK from 'openim-uniapp-polyfill';
const state = {
	friendList: [],
	blackList: [],
	groupList: [],
	recvFriendApplications: [
		{userID:1,nickname: '好友名称',reqMsg:'好友请求消息',handleResult:0},
		{userID:2,nickname: '好友名称',reqMsg:'好友请求消息',handleResult:1},
		{userID:3,nickname: '好友名称',reqMsg:'好友请求消息',handleResult:2},
		{userID:4,nickname: '好友名称',reqMsg:'好友请求消息',handleResult:-1}
	],
	recvGroupApplications:[
		{fromUserID:111,groupName: '群名称',reqMsg:'群组请求消息',groupID:90,groupFaceURL: ''}
	],
	sentFriendApplications: [],
	sentGroupApplications: [
		{groupName: '好友名称',reqMsg:'好友请求消息',handleResult:0}
	],
	unHandleFriendApplicationNum: 10,
	unHandleGroupApplicationNum: 12,
};

const mutations = {
	SET_FRIEND_LIST(state, list) {
		state.friendList = [...list];
	},
	SET_BLACK_LIST(state, list) {
		state.blackList = [...list];
	},
	SET_GROUP_LIST(state, list) {
		state.groupList = [...list];
	},
	SET_RECV_FRIEND_APPLICATIONS(state, list) {
		state.recvFriendApplications = [...list];
	},
	SET_SENT_FRIEND_APPLICATIONS(state, list) {
		state.sentFriendApplications = [...list];
	},
	SET_RECV_GROUP_APPLICARION(state, list) {
		state.recvGroupApplications = [...list];
	},
	SET_SENT_GROUP_APPLICATIONS(state, list) {
		state.sentGroupApplications = [...list];
	},
	SET_UNHANDLE_FRIEND_APPLICATION_NUM(state, num) {
		state.unHandleFriendApplicationNum = num;
	},
	SET_UNHANDLE_GROUP_APPLICATION_NUM(state, num) {
		state.unHandleGroupApplicationNum = num;
	},
};

const actions = {
	getFriendList({commit}) {
		IMSDK.asyncApi(IMSDK.IMMethods.GetFriendList, uuidv4()).then(({ data }) => {
			const friendInfoList = data.map((item) => item.friendInfo);
			commit('SET_FRIEND_LIST', friendInfoList);
		})
	},
	getGrouplist({ commit }) {
		IMSDK.asyncApi(IMSDK.IMMethods.GetJoinedGroupList, uuidv4()).then(({ data }) => {
			commit('SET_GROUP_LIST', data);
		})
	},
	getBlacklist({ commit }) {
		// IMSDK.asyncApi(IMSDK.IMMethods, uuidv4()).then(({ data }) => {
		// 	commit('SET_BLACK_LIST', data);
		// })
	},
	getRecvFriendApplications({ commit }) {
		IMSDK.asyncApi(IMSDK.IMMethods.GetFriendApplicationListAsRecipient,uuidv4()).then(({ data }) => {
			commit('SET_RECV_FRIEND_APPLICATIONS', data);
		});
	},
	getSentFriendApplicaations({ commit }) {
		IMSDK.asyncApi(IMSDK.IMMethods.GetFriendApplicationListAsApplicant, uuidv4()).then(({data}) => {
			commit('SET_SENT_FRIEND_APPLICATIONS', data);
		});
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}